const { exec } = require('child_process');
const fs = require('fs');

const main = async () => {
  const folders = await fs.readdirSync('.');
  console.log(folders);
  for (const folder of folders) {
    console.log('folder', folder);
    const commands = [`cd ./${folder}`, `yarn upgrade --latest`, `cd ..`].join('; ');
    const response = await execute(commands);
    console.log(response);
  }
};

const execute = async command => {
  return new Promise(resolve => {
    exec(command, (error, stdout, stderr) => {
      if (error) return resolve(error);
      if (stderr) return resolve(stderr);
      resolve(stdout);
    });
  });
};

main().catch(error => console.error(error));
