import swagger from './swagger';

import routes from '../routes';
import { IRoute } from '../models/interfaces';

const paths = {};

routes.forEach((route: IRoute) => {
  const {
    public: _public = false,
    path = '',
    method = '',
    tags = [],
    summary = '',
    description = '',
    request = { query: [], body: [] },
    responses = {}
  } = route;
  if (!_public) return;
  const { query = [], body = [] } = request;
  const _path: string = `/${path}`;
  const _method: string = method.toLowerCase();
  const produces: Array<string> = ['application/json'];
  const _query = query.map((item: Record<string, any>) => {
    return Object.assign(item, { in: 'path' });
  });
  const _body = body.map((item: Record<string, any>) => {
    return Object.assign(item, { in: 'body' });
  });
  const parameters = [].concat(_query, _body);

  paths[_path] = {
    [_method]: { tags, summary, description, produces, parameters, responses }
  };
});

const definitions = [];

export default Object.assign(swagger, { paths, definitions });
