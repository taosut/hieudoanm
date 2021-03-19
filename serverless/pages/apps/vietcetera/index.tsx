import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Head from 'next/head';

import { api } from '../../../constant';

interface Props {}

interface State {
  articles: Array<any>;
}

class Vietcetera extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { articles: [] };

    this.getArticles = this.getArticles.bind(this);
  }

  async componentDidMount() {
    await this.getArticles();
  }

  public async getArticles() {
    const res = await fetch(`${api}/vietcetera?type=latest`);
    const articles = await res.json();
    this.setState({ articles });
  }

  render() {
    const { articles = [] } = this.state;

    return (
      <>
        <Head>
          <title>HIEU - Vietcetera</title>
        </Head>
        <Container className="pt-3 pb-3">
          <Card>
            <ListGroup variant="flush">
              {articles.map(article => {
                const { title = '', slug = '', language = '', excerpt } = article;
                const url =
                  language && slug
                    ? `https://vietcetera.com/${language.toLowerCase()}/${slug}`
                    : '';
                return (
                  <ListGroup.Item className="pb-0 pt-3">
                    <h6>
                      <a href={url}>{title}</a>
                    </h6>
                    <div dangerouslySetInnerHTML={{ __html: excerpt }}></div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Card>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(Vietcetera);
