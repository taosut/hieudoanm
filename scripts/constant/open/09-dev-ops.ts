'use strict';

export default [
  { step: 9, group: 'devops', personal: true, name: 'docker', repo: 'jenkinsci/docker' },
  { step: 9, group: 'devops', personal: true, name: 'git', repo: 'git/git' },
  {
    step: 9,
    group: 'devops',
    personal: true,
    name: 'visual-studio-code',
    repo: 'microsoft/vscode'
  },
  { step: 9, group: 'devops', personal: true, name: 'docker-compose', repo: 'docker/compose' },
  { step: 9, group: 'devops', personal: false, name: 'apache kafka', repo: 'apache/kafka' },
  { step: 9, group: 'devops', personal: false, name: 'terraform', repo: 'hashicorp/terraform' },
  { step: 9, group: 'devops', personal: false, name: 'vagrant', repo: 'hashicorp/vagrant' }
];
