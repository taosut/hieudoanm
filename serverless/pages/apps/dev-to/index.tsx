import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Head from 'next/head';

import { api } from '../../../constant';

export default function DevTo({ tags = [] }) {
  const [filteredTags = tags, setfilteredTags] = useState();

  const filter = async (event: any) => {
    const query: string = event.target.value;
    const filteredTags: any = tags.filter(tag => {
      const { name } = tag;
      return query ? name.toLowerCase().includes(query.toLowerCase()) : true;
    });
    setfilteredTags(filteredTags);
  };

  return (
    <>
      <Head>
        <title>HIEU - dev.to</title>
      </Head>
      <Container className="pt-3 pb-3">
        <Card>
          <Card.Body>
            <div className="mb-3">
              <Form>
                <Form.Group>
                  <Form.Label>Query</Form.Label>
                  <Form.Control type="text" placeholder="Query" onChange={filter} />
                </Form.Group>
              </Form>
            </div>
            {filteredTags
              .filter((tag: Record<string, any>) => {
                const { bg_color_hex = '', text_color_hex = '' } = tag;
                return bg_color_hex && text_color_hex;
              })
              .sort((a, b) => {
                return a.name > b.name ? 1 : -1;
              })
              .map((tag, index) => {
                const { name = '', bg_color_hex = '', text_color_hex = '' } = tag;
                const style = { backgroundColor: bg_color_hex, color: text_color_hex };
                const url: string = `https://dev.to/t/${name}`;
                return (
                  <Badge className="mr-1 mb-1" key={index} style={style}>
                    <a href={url} target="_blank" style={{ color: text_color_hex }}>
                      {name}
                    </a>
                  </Badge>
                );
              })}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${api}/dev-to/tags`);
  const tags = await res.json();
  return { props: { tags } };
}
