'use strict';

import nodemailer from 'nodemailer';

export default class NodeMailer {
  private fromEmail: string = '';
  private transporter: any;

  constructor(fromEmail: string, password: string) {
    this.fromEmail = fromEmail;
    const auth = { user: fromEmail, pass: password };
    const host: string = 'smtp.ethereal.email';
    const port: number = 587;
    this.transporter = nodemailer.createTransport({ host, port, auth });
    this.transporter.verify((err, success) => {
      if (err) return console.error(err);
      console.log('NodeMailer verify', success);
    });
    console.log(this.transporter.options.host);
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
