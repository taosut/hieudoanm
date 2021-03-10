import { tables } from '../../models/postgre';

const {
  nationalAssemblyMembers: { name: table, schema }
} = tables;

export { table, schema };

export const rows: Array<any> = [];
