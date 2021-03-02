'use strict';

import Base from '../helper/base';
import {
  apis,
  IEndpoint,
  IResponse,
  ITicketRequest,
  ITicketResponse,
  IFeedbackRequest,
  IFeedbackResponse
} from '../helper/constants';

export default class Ticket extends Base {
  constructor(token: string, test: boolean) {
    super(token, test);
  }

  public async getTicket(ticket_id: number): Promise<ITicketResponse> {
    const endpoint: IEndpoint = apis.ticket.getTicket;
    const response: IResponse = await this.fetch(endpoint, { query: { ticket_id } });
    const { code = 0, message = '', data = {} } = response;
    if (code !== 200) return { message };
    return data;
  }

  public async createTicket(ticket: ITicketRequest): Promise<ITicketResponse> {
    const endpoint: IEndpoint = apis.ticket.createTicket;
    const response: IResponse = await this.fetch(endpoint, { query: ticket });
    const { code = 0, message = '', data = {} } = response;
    if (code !== 200) return { message };
    return data;
  }

  public async addFeedbackToTicket(
    ticket_id: number,
    feedback: IFeedbackRequest
  ): Promise<IFeedbackResponse> {
    const endpoint: IEndpoint = apis.ticket.addFeedback;
    const query = Object.assign({ ticket_id }, feedback);
    const response: IResponse = await this.fetch(endpoint, { query });
    const { code = 0, message = '', data = {} } = response;
    if (code !== 200) return { message };
    return data;
  }
}
