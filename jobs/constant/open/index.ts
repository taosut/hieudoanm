'use strict';

interface IRepo {
  step: number;
  group: string;
  personal: boolean;
  name: string;
  repo: string;
}

import languages from './00-languages';
import packageManagers from './01-package-managers';
import runtime from './02-runtime';
import cssPreprocessors from './03-css-preprocessors';
import cssFrameworks from './04-css-frameworks';
import frontEndFrameworks from './05-front-end-frameworks';
import mobileFrameworks from './06-mobile-frameworks';
import backEndFrameworks from './07-back-end-frameworks';
import databases from './08-databases';
import devOps from './09-dev-ops';
import servers from './10-servers';
import machineLearning from './11-machine-learning';
import javascript from './12-javascript';

export {
  languages,
  packageManagers,
  runtime,
  cssPreprocessors,
  cssFrameworks,
  frontEndFrameworks,
  mobileFrameworks,
  backEndFrameworks,
  databases,
  devOps,
  servers,
  machineLearning,
  javascript
};

export const open: Array<IRepo> = [].concat(
  languages,
  packageManagers,
  runtime,
  cssPreprocessors,
  cssFrameworks,
  frontEndFrameworks,
  mobileFrameworks,
  backEndFrameworks,
  databases,
  devOps,
  servers,
  machineLearning,
  javascript
);

export const openPersonal: Array<IRepo> = open.filter(repository => repository.personal);
