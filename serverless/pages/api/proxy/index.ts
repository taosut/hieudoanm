import _ from 'lodash';
import url from 'url';
import request from 'request';

export default async (req, res) => {
  try {
    const requestPath = _.get(req, 'query.url', '');
    console.log(`requestUrl ${requestPath}`);
    const headers = getHeaders(req);
    console.log(`headers ${JSON.stringify(headers)}`);
    const { Host } = headers;
    console.log(`Host ${Host}`);
    if (!requestPath || !Host) return res.end('no url found');
    const options = { url: requestPath, method: 'GET', headers };
    request(options)
      .on('error', (error: any) => {
        res.json(error.stack);
      })
      .pipe(res);
  } catch (error: any) {
    const message: string = error.stack;
    res.json({ message });
  }
};

const getHeaders = (req: any): any => {
  const { headers = {} } = req;
  const requestURL: string = _.get(req, 'query.url', '');
  const requestedHost = url.parse(requestURL).hostname;
  headers['Host'] = requestedHost;
  return headers;
};
