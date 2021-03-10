'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: './src/environments/dev.env' });

import fs from 'fs';

import { ghn, logger } from '../../libs';

const main = async () => {
  const provinces = await ghn.address.getProvinces();

  const allWards = [];

  for (const province of provinces) {
    const { province_id, name: province_name } = province;
    const districts = await ghn.address.getDistricts(province_id);
    for (const district of districts) {
      const { district_id, name: district_name } = district;
      const wards = await ghn.address.getWards(district_id);
      logger.info(`${province_name} ${district_name} ${wards}`);
      if (!wards) continue;
      for (const ward of wards) {
        const { name: ward_name } = ward;
        allWards.push({ province: province_name, district: district_name, ward: ward_name });
      }
    }
  }

  const path: string = './wards.json';
  const data: string = JSON.stringify(allWards, null, 2);
  await fs.writeFileSync(path, data);
};

main().catch(error => logger.error(error));
