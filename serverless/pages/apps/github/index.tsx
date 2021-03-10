import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import fetch from 'node-fetch';
import Head from 'next/head';
import { createUseStyles } from 'react-jss';

import { api } from '../../../constant';

const useStyles = createUseStyles({
  caption: {
    captionSide: 'top',
    backgroundColor: '#343a40',
    color: '#ffffff',
    textAlign: 'center'
  },
  cell: {
    maxWidth: '150px',
    wordWrap: 'break-word !important',
    verticalAlign: 'middle !important'
  }
});

export default function Languages({ languages = [] }) {
  const [filteredLanguages = languages, setFilteredLanguages] = useState();
  const styles = useStyles();

  const filter = async (event: any) => {
    const query = event.target.value;
    const filteredLanguages: any = languages.filter(item => {
      const { language } = item;
      return query ? language.toLowerCase().includes(query.toLowerCase()) : true;
    });
    setFilteredLanguages(filteredLanguages);
  };

  return (
    <>
      <Head>
        <title>HIEU - GitHub Languages</title>
      </Head>
      <Container className="pt-3 pb-3">
        <div className="mb-3">
          <Form>
            <Form.Group>
              <Form.Label>Query</Form.Label>
              <Form.Control type="text" placeholder="Query" onChange={filter} />
            </Form.Group>
          </Form>
        </div>
        <div className="table-container table-responsive">
          <Table>
            <caption className={styles.caption}>
              GitHub Languages ({filteredLanguages.length})
            </caption>
            <tbody>
              {filteredLanguages.map((item, index) => {
                const { language, extensions } = item;
                return (
                  <tr key={`language-${index}`}>
                    <td className={styles.cell}>{language}</td>
                    <td className={styles.cell}>{extensions}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${api}/github/languages`);
  const languages = await res.json();
  return { props: { languages } };
}
