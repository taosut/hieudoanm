# FPT

[FPT](https://www.fpt.com.vn/vi)
[FPT Software](https://www.fpt-software.com/)
[FPT Documents](https://docs.fpt.ai/en)

```ts
import FPT from 'fpt';

const fpt: FPT = new FPT('apikey')
```

## CV (Computer Vision)

```ts
// Driving Licence Recognition
const result = fpt.cv.drivingLicenceRecognition(image);

// ID Card Recognition
const result = fpt.cv.idCardRecognition(image);

// Passport Recognition
const result = fpt.cv.drivingLicenceRecognition(image);
```

## NLP (Natural Language Processing)

```ts
// Text to Speech
const result = fpt.nlp.textToSpeech('việt nam', {
  gender: 'male', // female - male
  region: 'northern', // northern - middle - southern
  speed: 0, // -3, -2, -1, 0, 1, 2, 3
  format: 'mp3', // 'mp3', 'wav', 'g711a', 'g711u'
  callback_url: '', // optional but recommended
});

// Speech to Text
const result = fpt.nlp.speechToText(fileContent);
```
