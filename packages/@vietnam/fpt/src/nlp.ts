'use strict';

export default class NLP {
  private api_key: string = '';
  private base: string = '';

  private voices: Array<any> = [
    { gender: 'female', region: 'northern', value: 'banmai' },
    { gender: 'female', region: 'northern', value: 'thuminh' },
    { gender: 'female', region: 'middle', value: 'myan' },
    { gender: 'female', region: 'southern', value: 'lannhi' },
    { gender: 'female', region: 'southern', value: 'linhsan' },
    { gender: 'male', region: 'northern', value: 'leminh' },
    { gender: 'male', region: 'middle', value: 'giahuy' }
  ];

  private formats: Array<string> = ['mp3', 'wav', 'g711a', 'g711u'];

  constructor(api_key: string, base: string) {
    this.api_key = api_key;
    this.base = `${base}/hmi`;
  }
  /**
   * Text to Speech
   */
  public async textToSpeech(text: string, options: any = {}): Promise<any> {
    const self = this;
    const { api_key = '', base = '', formats = '' } = self;
    let { gender = '', region = '', speed = 0, format = formats[0], callback_url = '' } = options;
    const voice = self.getVoice(gender, region);
    if (speed > 3) speed = 3;
    if (speed < -3) speed = -3;
    if (!formats.includes(format)) format = formats[0];

    const url = `${base}/tts/v5`;
    const headers = { api_key, voice, speed, format, callback_url, 'Content-Type': 'text/plain' };
    let init: RequestInit = { method: 'POST', headers, body: text };

    return new Promise(resolve => {
      fetch(url, init)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          resolve(error);
        });
    });
  }

  private getVoice(gender: string, region: string) {
    const self = this;
    const { voices = [] } = self;
    const voice = voices.filter(v => v.gender === gender && v.region === region);
    if (!voice.length) return voices[0].value;
    return voice[0].value;
  }
  /**
   * Speech to Text
   */
  public async speechToText(fileContent: any): Promise<any> {
    const self = this;
    const { api_key = '', base = '' } = self;

    const url = `${base}/asr/general`;
    const headers = { api_key };
    let init: RequestInit = { method: 'POST', headers, body: fileContent };

    return new Promise(resolve => {
      fetch(url, init)
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          resolve(error);
        });
    });
  }
}
