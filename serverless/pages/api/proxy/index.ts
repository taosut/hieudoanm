import url from 'url';
import request from 'request';

export default async (req, res) => {
  try {
    const requestPath = getRequestedUrl(req);
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

const getRequestedUrl = (req): string => {
  const requestUrl: string = req.url.split('?url=')[1];
  return requestUrl || url.parse(req.url, true).query.url || req.url;
};

const getHeaders = (req: any): any => {
  const { headers = {} } = req;
  const requestedHost = url.parse(getRequestedUrl(req)).hostname;
  headers['Host'] = requestedHost;
  return headers;
};
