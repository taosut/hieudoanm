'use strict';

import nodemailer from 'nodemailer';

export default class Mailer {
  private fromEmail: string = '';
  private transporter: any;

  constructor(fromEmail: string, password: string) {
    this.fromEmail = fromEmail;
    const auth = { user: fromEmail, pass: password };
    console.log('auth', auth);
    const service: string = 'smtp-relay.sendinblue.com';
    const port: number = 587;
    this.transporter = nodemailer.createTransport({ service, port, auth });
  }

  public async sendMail(toEmails: Array<string>, subject: string, text: string): Promise<any> {
    const { fromEmail } = this;
    const to: string = toEmails.join(', ');
    const mailOptions = { from: fromEmail, to, subject, text, html: text };
    return new Promise(resolve => {
      this.transporter.sendMail(mailOptions, (error, info: any) => {
        if (error) return resolve(error);
        console.log('info', info);
        return resolve(info.response);
      });
    });
  }
}
