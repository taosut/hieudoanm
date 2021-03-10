'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import { dsFinanceStockListedCompany } from '../../data';
import { utils, ssi, logger, mongooseClient } from '../../libs';

const saveToMongoDB = async (profile, lastSyncedAt) => {
  const { symbol = '' } = profile;
  if (!symbol) return '';
  profile = Object.assign(profile, { lastSyncedAt });
  return await dsFinanceStockListedCompany.updateOne({ symbol }, profile);
};

const getTop30s = async () => {
  const groups = ['VN30', 'HNX30'];
  const data = [];
  for (const group of groups) {
    const _data: Array<any> = await ssi.getRealTimeStockByGroup(group);
    const symbols = _data.map(item => item.symbol).sort();
    data.push({ group, symbols });
  }
  return data;
};

const getGroup = (top30s: Array<Record<string, any>>, symbol: string, market: string): string => {
  market = market.toUpperCase();
  let group = '';
  if (market === 'HNX') group = 'HNX30';
  if (market === 'HOSE') group = 'VN30';
  if (!group) return market;
  const { symbols = [] } = top30s.find(item => item.group === group) || {};
  if (!symbols.length) return market;
  if (!symbols.includes(symbol)) return market;
  return group;
};

const getProfiles = async (
  companies: Array<Record<string, any>> = [],
  top30s: Array<Record<string, any>> = []
): Promise<Array<Record<string, any>>> => {
  const profiles = [];
  for (const company of companies) {
    const { id = '', symbol = '', market = '', ceiling = 0, floor = 0 } = company;
    logger.info(`symbol ${symbol}`);
    if (!symbol) continue;
    let profile = {};
    while (utils.isObjectEmpty(profile)) {
      profile = await ssi.getStockProfile(symbol);
    }
    const group = getGroup(top30s, symbol, market);
    profile = Object.assign(profile, { id, group, ceiling, floor });
    profiles.push(profile);
  }
  return profiles;
};

const syncCompanies = (profiles: Array<Record<string, any>>, lastSyncedAt: number) => {
  return new Promise(resolve => {
    Promise.all(
      profiles.map(async profile => {
        return await saveToMongoDB(profile, lastSyncedAt);
      })
    )
      .then(res => {
        logger.info(`res ${JSON.stringify(res)}`);
        resolve(res);
      })
      .catch(error => {
        logger.error(error);
        resolve({});
      });
  });
};

const main = async () => {
  await mongooseClient.connect();
  const lastSyncedAt = Date.now();
  const markets = ['hnx', 'hose'];
  let companies = await ssi.getListedCompanies();
  companies = companies.filter(
    (company: any) => markets.includes(company.market.toLowerCase()) && company.type === 's'
  );
  logger.info(`${companies.length}`);

  const top30s = await getTop30s();

  const profiles = await getProfiles(companies, top30s);

  await syncCompanies(profiles, lastSyncedAt);

  const deleteResponse = await dsFinanceStockListedCompany.delete({
    lastSyncedAt: { $lt: lastSyncedAt }
  });
  logger.info(`deleteResponse ${deleteResponse}`);

  process.exit(0);
};

main().catch(error => logger.error(error));
