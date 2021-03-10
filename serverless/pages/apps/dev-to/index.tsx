import React from 'react';
import { connect } from 'react-redux';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Head from 'next/head';

import { api } from '../../../constant';

interface Props {}

interface State {
  tags: Array<any>;
  filteredTags: Array<any>;
}

class DevTo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { tags: [], filteredTags: [] };

    this.getTags = this.getTags.bind(this);
    this.filter = this.filter.bind(this);
  }

  async componentDidMount() {
    await this.getTags();
  }

  async filter(event: any) {
    const query: string = event.target.value;
    const { tags = [] } = this.state;
    const filteredTags: any = tags.filter(tag => {
      const { name } = tag;
      return query ? name.toLowerCase().includes(query.toLowerCase()) : true;
    });
    this.setState({ filteredTags });
  }

  async getTags() {
    const res = await fetch(`${api}/dev-to/tags`);
    const tags = await res.json();
    this.setState({ tags, filteredTags: tags });
  }

  render() {
    const { filteredTags = [] } = this.state;

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
                    <Form.Control type="text" placeholder="Query" onChange={this.filter} />
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
}

const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(DevTo);
