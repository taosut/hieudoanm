'use strict';

import CafeBiz from './cafebiz';
import LaoDong from './laodong';
import NhanDan from './nhandan';
import Soha from './soha';
import ThanhNien from './thanhnien';
import TinhTe from './tinhte';
import TuoiTre from './tuoitre';
import VietNamNet from './vietnamnet';
import VNExpress from './vnexpress';
import VTV from './vtv';

export default class News {
  public cafebiz: CafeBiz = new CafeBiz();
  public laodong: LaoDong = new LaoDong();
  public nhandan: NhanDan = new NhanDan();
  public soha: Soha = new Soha();
  public thanhnien: ThanhNien = new ThanhNien();
  public tinhte: TinhTe = new TinhTe();
  public tuoitre: TuoiTre = new TuoiTre();
  public vietnamnet: VietNamNet = new VietNamNet();
  public vnexpress: VNExpress = new VNExpress();
  public vtv: VTV = new VTV();

  public sources: Array<string> = [
    'cafebiz',
    'laodong',
    'nhandan',
    'soha',
    'thanhnien',
    'tinhte',
    'tuoitre',
    'vietnamnet',
    'vnexpress',
    'vtv'
  ];

  public async getArticles(
    source: string,
    category: string = ''
  ): Promise<Array<Record<string, any>>> {
    const { sources = [] } = this;
    if (!sources.includes(source)) source = 'vnexpress';
    return await this[source].getArticles(category);
  }

  public getCategories(source: string = 'vnexpress'): Array<string> {
    const { sources = [] } = this;
    if (!sources.includes(source)) source = 'vnexpress';
    return this[source].getCategories();
  }

  public getSources(): Array<string> {
    return this.sources.sort();
  }
}
