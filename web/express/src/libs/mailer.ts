'use strict';

import nodemailer from 'nodemailer';

export default class Mailer {
  private fromEmail: string = '';
  private transporter: any;

  constructor(service: string, fromEmail: string, password: string) {
    this.transporter = nodemailer.createTransport({
      service: service,
      auth: { user: fromEmail, pass: password }
    });

    this.fromEmail = fromEmail;
  }

  public async sendMail(toEmails: Array<string>, subject: string, text: string): Promise<any> {
    const { fromEmail } = this;
    const to: string = toEmails.join(', ');
    const mailOptions = { from: fromEmail, to, subject, text };
    return new Promise(resolve => {
      this.transporter.sendMail(mailOptions, (error, info) => {
        if (error) return resolve(error);
        return resolve(info.response);
      });
    });
  }
}
