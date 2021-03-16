import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Tesseract from 'tesseract.js';
import _ from 'lodash';
import axios from 'axios';

interface Props {}

interface State {
  filename: string;
  banks: Array<any>;
  loading: boolean;
  banksInfos: Array<any>;
  isMobile: boolean;
}

const banks: Array<any> = [
  { names: ['abbank'] },
  { names: ['acb'], prefixes: ['20', '24'] },
  { names: ['agribank', 'agri'], prefixes: ['130', '490', '318'], length: 13 },
  { names: ['baovietbank', 'bvb'] },
  { names: ['bidv'], prefixes: ['581', '125', '601', '213'], length: 14 },
  { names: ['cbbank'] },
  { names: ['dongabank'] },
  { names: ['eximbank'] },
  { names: ['gpbank', 'gpb'] },
  { names: ['hdbank', 'hdb'] },
  { names: ['kienlongbank'] },
  { names: ['lienvietpostbank', 'lpb'] },
  { names: ['mbbank'], prefixes: ['068', '0801', '0050'], length: 13 },
  { names: ['msb'] },
  { names: ['namabank'] },
  { names: ['ncb'] },
  { names: ['ocb'] },
  { names: ['oceanbank'] },
  { names: ['pgbank'] },
  { names: ['pvcombank'] },
  {
    names: ['sacombank'],
    prefixes: ['020', '5611', '0400', '1234'],
    length: 12
  },
  { names: ['saigonbank'] },
  { names: ['scb'] },
  { names: ['seabank'] },
  { names: ['shb'] },
  {
    names: ['techcombank'],
    prefixes: ['102', '196', '140', '191', '1903'],
    length: 14
  },
  { names: ['tpbank'], prefixes: ['020'] },
  { names: ['uob'] },
  { names: ['vib'], prefixes: ['601', '025'], length: 15 },
  { names: ['vietabank'] },
  { names: ['vietbank'] },
  { names: ['vietcapitalbank'] },
  {
    names: ['vietcombank', 'vcb'],
    prefixes: ['007', '004', '0491', '001'],
    length: 13
  },
  { names: ['vietinbank'], prefixes: ['10'], length: 12 },
  { names: ['vpbank'], prefixes: ['15'] }
];

class Banks extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      banks,
      filename: 'Choose File',
      loading: false,
      banksInfos: [],
      isMobile: false
    };

    this.uploadBankImage = this.uploadBankImage.bind(this);
    this.processFiles = this.processFiles.bind(this);
    this.getTextFromImage = this.getTextFromImage.bind(this);
    this.getBanksInfos = this.getBanksInfos.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.detectMobileAndTablet = this.detectMobileAndTablet.bind(this);
  }

  componentDidMount() {
    const isMobile: boolean = this.detectMobileAndTablet();
    this.setState({ isMobile });
  }

  public detectMobileAndTablet(): boolean {
    const isMobile: boolean = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return isMobile;
  }

  public async processFiles(event: any): Promise<void> {
    const files = event.target.files;

    console.log('files', files);

    const [file = {}] = files;
    console.log('file', file);
    if (!file) {
      return alert('NO FILE');
    }

    this.setState({ loading: true });
    const text: string = await this.getTextFromImage(file);
    const banksInfos = await this.getBanksInfos(text);
    this.setState({ banksInfos, loading: false });
  }

  private async getTextFromImage(file: File): Promise<string> {
    return new Promise(resolve => {
      Tesseract.recognize(file, 'eng', {})
        .then(({ data: { text } }) => {
          return resolve(text);
        })
        .catch((error: any) => {
          console.error(error);
          return resolve('');
        });
    });
  }

  private getBanksInfos(text: string): Array<Record<string, any>> {
    console.log('text', text);
    const lines: Array<string> = text
      .split('\n')
      .map((line: string) => line.trim().toLowerCase())
      .filter((line: string) => line);
    console.log('lines', lines);
    const allNumbers: Array<Array<string>> = lines.map((line: string) => {
      const numbers = line
        .replace(/\D/g, ' ')
        .split('  ')
        .map((number: string) => number.trim());
      return numbers;
    });
    const bankNumbers = _.flattenDeep(allNumbers)
      .filter((line: string) => !isNaN(parseInt(line, 10)))
      .filter((line: string) => line.length > 8);
    const bankNames: Array<string> = lines
      .map((line: string) => {
        const filterBanks = banks.filter((bank: any) => {
          const { names = [] } = bank;
          return names.some((name: string) => line.includes(name));
        });
        const [first = { names: [] }] = filterBanks;
        const { names = [] } = first;
        const [name = ''] = names;
        return name.toLowerCase();
      })
      .filter((name: string) => name);
    console.log('bankNumbers', bankNumbers);
    console.log('bankNames', bankNames);
    const length: number = bankNumbers.length;
    const banksInfos = [];
    for (let i = 0; i < length; i++) {
      const name: string = bankNames[i] || '';
      const number: string = bankNumbers[i] || '';
      if (!name || !number) continue;
      banksInfos.push({ name, number });
    }
    console.log('banksInfos', banksInfos);
    return banksInfos;
  }

  public copyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'Successful' : 'Unsuccessful';
      alert(`Copy ${text} to Clipboard: ${msg}`);
    } catch (error) {
      alert(`Oops, unable to copy: ${error.stack}`);
    }

    document.body.removeChild(textArea);
  }

  public async uploadBankImage(event: any): Promise<void> {
    const file = event.target.files.item(0);
    const { name = '' } = file;
    this.setState({ filename: name });
    console.log(file);
    this.setState({ loading: true, banksInfos: [] });
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: event => {
        console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
      }
    };
    const response = await axios.post('/api/banks', formData, config);
    const { data = {} } = response;
    const { banksInfos = [] } = data;

    this.setState({ loading: false, banksInfos });
  }

  render() {
    const { filename = '', loading = false, banksInfos = [], isMobile = false } = this.state;

    return (
      <>
        <Head>
          <title>HIEU - Banks</title>
        </Head>
        <Container>
          <div className="pt-3 pb-3">
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                accept="image/*"
                capture="capture"
                onChange={this.uploadBankImage}
              />
              <label className="custom-file-label" htmlFor="customFile">
                {filename}
              </label>
            </div>
          </div>
          {loading && (
            <div className="d-flex justify-content-center text-primary">
              <div className="spinner-border" role="status" aria-hidden="true"></div>
            </div>
          )}
          {banksInfos.length > 0 && (
            <div className="card">
              <div className="card-body">
                <ul className="list-group">
                  {banksInfos.map((bankInfo: any, index: number) => {
                    const { name = '', number = '' } = bankInfo;
                    return (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                          <div className="text-uppercase">{name}</div>
                          <div>{number}</div>
                        </span>
                        {isMobile && (
                          <button
                            className="btn btn-primary text-uppercase"
                            onClick={() => {
                              this.copyToClipboard(number);
                            }}>
                            OPEN
                          </button>
                        )}
                        {!isMobile && (
                          <button
                            className="btn btn-primary text-uppercase"
                            onClick={() => {
                              this.copyToClipboard(number);
                            }}>
                            COPY
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme
});

export default connect(mapStateToProps)(Banks);
