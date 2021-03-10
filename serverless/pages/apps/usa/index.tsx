import React from 'react';
import { connect } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Head from 'next/head';
import _ from 'lodash';

import { api } from '../../../constant';

interface Props {}

interface State {
  members: Array<any>;
}

class USA extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { members: [] };

    this.getMembers = this.getMembers.bind(this);
  }

  async componentDidMount() {
    await this.getMembers();
  }

  public async getMembers(chamber: string = 'house') {
    const res = await fetch(`${api}/usa/congress/members?chamber=${chamber}`);
    const members = await res.json();
    const inOffice = members.filter(member => member.in_office);
    this.setState({ members: inOffice });
  }

  render() {
    const { members = [] } = this.state;
    const states: Array<string> = _.uniq(members.map(member => member.state));
    const parties: Array<string> = _.uniq(members.map(member => member.party));
    const congresses: Array<number> = _.range(80, 118).reverse();
    members.sort((a, b) => {
      const { state: aState, district: aDistrict } = a;
      const { state: bState, district: bDistrict } = b;
      if (aState === bState) {
        const aDistrictNo = isNaN(aDistrict) ? aDistrict : parseInt(aDistrict, 10);
        const bDistrictNo = isNaN(bDistrict) ? aDistrict : parseInt(bDistrict, 10);
        return aDistrictNo > bDistrictNo ? 1 : -1;
      }
      return aState > bState ? 1 : -1;
    });
    return (
      <>
        <Head>
          <title>HIEU - USA</title>
        </Head>
        <Container className="pt-3 pb-3">
          <Card>
            <Card.Body>
              <Form>
                <div className="row">
                  <div className="col-sm-6">
                    <Form.Group>
                      <Form.Label>Chamber</Form.Label>
                      <Form.Control as="select" name="chamber">
                        <option value="house">House</option>
                        <option value="senate">Senate</option>
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className="col-sm-6">
                    <Form.Group>
                      <Form.Label>Congress</Form.Label>
                      <Form.Control as="select" name="congress">
                        <option value="">Congresses ({congresses.length})</option>
                        {congresses.map((congress: number, index: number) => {
                          return (
                            <option key={index} value={congress}>
                              {congress}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className="col-sm-6">
                    <Form.Group>
                      <Form.Label>Party</Form.Label>
                      <Form.Control as="select" name="state">
                        <option value="">Parties ({parties.length})</option>
                        {parties.map((party: string, index: number) => {
                          return (
                            <option key={index} value={party}>
                              {party}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </div>
                  <div className="col-sm-6">
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Control as="select" name="state">
                        <option value="">States ({states.length})</option>
                        {states.map((state: string, index: number) => {
                          return (
                            <option key={index} value={state}>
                              {state}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Form.Group>
                  </div>
                </div>
              </Form>
              <div className="table-container table-responsive">
                <Table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Name</th>
                      <th>State</th>
                      <th>District</th>
                      <th>Party</th>
                      <th>Leadership Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member, index) => {
                      const {
                        title = '',
                        short_title = '',
                        first_name = '',
                        last_name = '',
                        party = '',
                        leadership_role = '',
                        state = '',
                        district = ''
                      } = member;
                      const name: string = `${first_name} ${last_name}`;
                      return (
                        <tr key={`member-${index}`}>
                          <td>{short_title}</td>
                          <td>{name}</td>
                          <td>{state}</td>
                          <td>{district}</td>
                          <td>{party}</td>
                          <td>{leadership_role}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </>
    );
  }
}

export async function getStaticProps(context) {
  const res = await fetch(`${api}/usa/congress/members`);
  const members = await res.json();
  const inOffice = members.filter(member => member.in_office);
  return { props: { members: inOffice } };
}

const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(USA);
