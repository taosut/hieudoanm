# Vietcetera

An **Unofficial** Node.js API Wrapper Library for [Vietcetera](https://vietcetera.com/)

If you've found an bug/issue, please [send me an email](mailto:hieumdoan@gmail.com).

- [Vietcetera](#vietcetera)
  - [Installation](#installation)
  - [API Usage](#api-usage)
    - [Get Favorist Topics](#get-favorist-topics)
    - [Get Articles](#get-articles)

## Installation

```sh
npm install vietcetera
# OR
yarn add vietcetera
```

## API Usage

```ts
const vietcetera: Vietcetera = new Vietcetera();
```

### Get Favorist Topics

```ts
const language: string = 'VN'; // OPTIONAL - default to VN - enumeration: 'VN' or 'EN'
const topics = await vietcetera.getFavoristTopics(language);
```

### Get Articles

- Basic

```ts
const type: string = 'recommend-popular'; // OPTIONAL - default to 'latest' - enumeration: 'latest' OR 'popular' OR 'editor-pick' OR 'recommend-popular'
const language: string = 'VN'; // OPTIONAL - default to 'VN' - enumeration: 'VN' or 'EN'
const page: number = 1 // OPTIONAL - only for 'latest' AND 'popular'
const limit: number = 10 // OPTIONAL - only for 'latest' AND 'popular'
const options: Object = { type, language, page, limit };
const articles = await vietcetera.getArticles(options);
```

- Latest (Shortcut)

```ts
const language: string = 'VN'; // OPTIONAL - default to 'VN' - enumeration: 'VN' or 'EN'
const page: number = 1 // OPTIONAL - only for 'latest' AND 'popular'
const limit: number = 10 // OPTIONAL - only for 'latest' AND 'popular'
const options: Object = { language, page, limit };
const articles = await vietcetera.getLatestArticles(options);
```

- Popular (Shortcut)

```ts
const language: string = 'VN'; // OPTIONAL - default to 'VN' - enumeration: 'VN' or 'EN'
const page: number = 1 // OPTIONAL - only for 'latest' AND 'popular'
const limit: number = 10 // OPTIONAL - only for 'latest' AND 'popular'
const options: Object = { language, page, limit };
const articles = await vietcetera.getPopularArticles(options);
```

- Editor Pick (Shortcut)

```ts
const language: string = 'VN'; // OPTIONAL - default to 'VN' - enumeration: 'VN' or 'EN'
const articles = await vietcetera.getEditorPickArticles(language);
```
