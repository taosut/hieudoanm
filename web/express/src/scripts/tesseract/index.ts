import Tesseract from 'tesseract.js';

const main = async () => {
  // const url: string = 'https://tesseract.projectnaptha.com/img/eng_bw.png';
  const url: string = './src/scripts/tesseract/test.png';

  Tesseract.recognize(url, 'eng', {
    logger: (message: string) => console.log(message)
  }).then(({ data: { text } }) => {
    console.log(text);
    const lines = text
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line);
    console.log(lines);
  });
};

main().catch(error => console.error(error));
