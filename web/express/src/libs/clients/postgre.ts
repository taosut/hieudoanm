'use strict';

import pg from 'pg';
import { v4 as uuidv4 } from 'uuid';

import { IPostgreConfigs, IPostgreResult } from '../../models/interfaces';

export default class PostgreClient {
  private client: any;

  constructor(configs: IPostgreConfigs) {
    const postgreConfigs = Object.assign(configs, { ssl: { rejectUnauthorized: false } });
    const client = new pg.Client(postgreConfigs);
    this.client = client;
  }

  public async connect(): Promise<void> {
    return new Promise(resolve => {
      this.client
        .connect()
        .then(() => {
          console.info('POSTGRE SUCCESS');
          resolve();
        })
        .catch((error: any) => {
          console.error(`POSTGRE ERROR ${error.stack}`);
          resolve();
        });
    });
  }

  public async query(text: string, values: Array<string> = []): Promise<string | Array<any>> {
    const self = this;
    const name: string = uuidv4();
    const query = { name, text, values, rowMode: 'array' };
    return new Promise(resolve => {
      this.client
        .query(query)
        .then((result: IPostgreResult) => {
          const response = self.processQueryResult(result);
          resolve(response);
        })
        .catch(e => {
          console.error(e.stack);
          resolve([]);
        });
    });
  }

  private processQueryResult(result: IPostgreResult): string | Array<any> {
    const self = this;
    const { command = '', rowCount = 0, rows = [], fields = [] } = result;
    switch (command) {
      case 'INSERT':
      case 'DELETE':
      case 'UPDATE':
        return rowCount ? `${command} SUCCESS` : `${command} ERROR`;
      case 'SELECT':
        return self.processRows(fields, rows);
      case 'CREATE':
      case 'DROP':
        return `${command} SUCCESS`;
      default:
        console.info(`result ${JSON.stringify(result)}`);
        return 'OK';
    }
  }

  private processRows(fields: Array<any>, rows: Array<any>): Array<any> {
    const keys: Array<string> = fields.map(field => field.name);
    return rows.map(columns => {
      const row = {};
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        const key = keys[i] || '';
        if (!key) continue;
        row[key] = column;
      }
      return row;
    });
  }

  public async getTables(): Promise<string | Array<any>> {
    const text = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`;
    return await this.query(text);
  }

  public async createTable(name: string, schema: any): Promise<string | Array<any>> {
    const tableName: string = name.toUpperCase();
    const columns: string = Object.keys(schema)
      .map(key => {
        const columnName = key.toUpperCase();
        const configs = schema[key] || {};
        const { type, primary = false, required = false } = configs;
        const dataType = type.toUpperCase();
        const primaryKey = primary ? 'PRIMARY KEY' : '';
        const notNull = required ? 'NOT NULL' : '';
        return `${columnName} ${dataType} ${primaryKey} ${notNull}`.trim();
      })
      .join(',');
    const text = `CREATE TABLE ${tableName}(${columns})`;
    return await this.query(text);
  }

  public async dropTable(table: string): Promise<string | Array<any>> {
    const text = `DROP TABLE ${table}`;
    return await this.query(text);
  }

  public async dropTables(tables: Array<string>): Promise<string | Array<any>> {
    const text = `DROP TABLE ${tables.join(',')}`;
    return await this.query(text);
  }

  public async dropAll(): Promise<string | Array<any>> {
    const drop = `DROP SCHEMA public CASCADE;`;
    await this.query(drop);
    const create = `CREATE SCHEMA public;`;
    return await this.query(create);
  }

  public async find(
    table: string,
    filter: any = {},
    fields: Array<string> = []
  ): Promise<string | Array<any>> {
    const whereClause = this.buildWhereClause(filter);
    const tableName: string = table.toUpperCase();
    const columns: string = fields.length ? fields.join(',') : '*';
    const text = whereClause
      ? `SELECT ${columns} FROM ${tableName} WHERE ${whereClause}`
      : `SELECT ${columns} FROM ${tableName}`;
    return await this.query(text);
  }

  private buildWhereClause(filter: any = {}): string {
    const keys: Array<string> = Object.keys(filter);
    return keys
      .map(key => {
        const value = filter[key];
        if (!value) return '';
        if (typeof value === 'string') {
          const rightSide = value.includes("'") ? `'${value.replace(/'/g, "''")}'` : `'${value}'`;
          return `${key} = ${rightSide}`;
        }
        return `${key} = ${value}`;
      })
      .filter(string => string)
      .join(' AND ')
      .trim();
  }

  public async insert(table: string, row): Promise<string | Array<any>> {
    const tableName: string = table.toUpperCase();
    const keys = Object.keys(row)
      .map(key => key.toUpperCase())
      .join(',');
    const values = Object.keys(row)
      .map(key => {
        const value = row[key];
        const type = typeof value;
        const cell =
          type === 'string'
            ? value.includes("'")
              ? `'${value.replace(/'/g, "''")}'`
              : `'${value}'`
            : value;
        return cell;
      })
      .join(',');

    const text = `INSERT INTO ${tableName} (ID,${keys}) VALUES (1,${values})`;
    return await this.query(text);
  }

  public async insertMany(table: string, rows): Promise<string | Array<any>> {
    const tableName: string = table.toUpperCase();
    const [firstRow] = rows;
    const keys = Object.keys(firstRow)
      .map(key => key.toUpperCase())
      .join(',');
    const values = rows
      .map((row: any, index: number) => {
        const rowValues = Object.keys(row).map(key => {
          const value = row[key];
          const type = typeof value;
          const cell =
            type === 'string'
              ? value.includes("'")
                ? `'${value.replace(/'/g, "''")}'`
                : `'${value}'`
              : value;
          return cell;
        });
        const rowValuesString: string = rowValues.join(',');
        console.info(`${index} ${rowValues.length} ${rowValuesString}`);
        return `(${index + 1},${rowValuesString})`;
      })
      .join(',');

    const text = `INSERT INTO ${tableName} (ID,${keys}) VALUES ${values}`;
    return await this.query(text);
  }

  public async update(table: string, update: Object): Promise<string | Array<any>> {
    const tableName: string = table.toUpperCase();
    const setQuery = Object.keys(update)
      .map(key => {
        const value = update[key];
        const type = typeof value;
        return type === 'string' ? `${key}='${value}'` : `${key}=${value}`;
      })
      .join(',');
    const text = `UPDATE ${tableName} SET ${setQuery}`;
    return await this.query(text);
  }

  public async delete(table: string): Promise<string | Array<any>> {
    const tableName: string = table.toUpperCase();
    const text = `DELETE FROM ${tableName}`;
    return await this.query(text);
  }
}
