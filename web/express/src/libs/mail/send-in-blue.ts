'use strict';

import fetch from 'node-fetch';

export default class SendInBlue {
  private fromEmail: string = '';
  private apiKey: string = '';

  constructor(fromEmail: string, apiKey: string) {
    this.fromEmail = fromEmail;
    this.apiKey = apiKey;
  }

  sendEmail(toContacts: Array<any>, subject: string, htmlContent: string) {
    const { fromEmail, apiKey } = this;
    const url = 'https://api.sendinblue.com/v3/smtp/email';
    const body = {
      sender: { name: 'VIET NAM', email: fromEmail },
      to: toContacts,
      subject,
      htmlContent
    };
    return new Promise(resolve => {
      fetch(url, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          console.error(error);
          resolve({});
        });
    });
  }
}
