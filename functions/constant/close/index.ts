'use strict';

import cicd from './ci-cd';
import cloudProviders from './cloud-providers';
import operatingSystems from './operating-systems';

const close = [].concat(cicd, operatingSystems, cloudProviders);
const closePersonal = close.filter(item => item.personal);

export { cloudProviders, operatingSystems, cicd, close, closePersonal };
