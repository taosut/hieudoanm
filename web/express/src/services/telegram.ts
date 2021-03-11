'use strict';

import _ from 'lodash';

import { utils, dateTime, vietcetera, calendar, telegramClient } from '../libs';

import BanksService from './banks';
import CultureService from './culture';
import InformationService from './information';
import LicensePlatesService from './license-plates';
import NewsService from './news';
import WeatherService from './weather';
import YouTubeService from './youtube';

export default class TelegramService {
  private commands: Array<string> = [
    'help',
    'get_status',
    'get_movies',
    'get_phones_prefixes',
    'get_vietcetera',
    'get_license_plate',
    'get_vleague_table',
    'get_lunar_date',
    'get_trending_news',
    'get_music_trending',
    'get_youtube_trending',
    'sync_forex',
    'get_air_visual',
    'get_weather'
  ];
  private banksService: BanksService = new BanksService();
  private cultureService: CultureService = new CultureService();
  private informationService: InformationService = new InformationService();
  private licensePlatesService: LicensePlatesService = new LicensePlatesService();
  private newsService: NewsService = new NewsService();
  private weatherService: WeatherService = new WeatherService();
  private youTubeService: YouTubeService = new YouTubeService();

  public async processWebhook(body): Promise<void> {
    const text: string = _.get(body, 'message.text', '');
    const chatId: number = _.get(body, 'message.chat.id', 0);
    const command = this.processCommand(text);
    switch (command) {
      case 'help':
        await this.getHelp(chatId);
        break;
      case 'get_movies':
        await this.getMovies(chatId);
        break;
      case 'get_phones_prefixes':
        await this.getPhonesPrefixes(chatId);
        break;
      case 'get_vietcetera':
        await this.getVietcetera(chatId);
        break;
      case 'get_license_plate':
        await this.getLicensePlate(chatId, text);
        break;
      case 'get_vleague_table':
        await this.getVLeagueTable(chatId);
        break;
      case 'get_lunar_date':
        await this.getLunarDate(chatId);
        break;
      case 'get_trending_news':
        await this.getTrendingNews(chatId);
        break;
      case 'get_music_trending':
        await this.getYouTubeTrending(chatId, 10);
        break;
      case 'get_youtube_trending':
        await this.getYouTubeTrending(chatId);
        break;
      case 'sync_forex':
        await this.syncForexRates(chatId);
        break;
      case 'get_air_visual':
        await this.getAirVisual(chatId);
        break;
      case 'get_weather':
        await this.getWeather(chatId);
        break;
      default:
        await telegramClient.sendMarkdownMessage(chatId, text);
    }
  }

  private processCommand(text: string): string {
    const { commands } = this;
    const processText: string = text.toLowerCase().split(' ').join('_');
    const command: string = commands.find(cmd => processText.includes(cmd));
    return command;
  }

  private async getHelp(chatId: number): Promise<void> {
    const { commands } = this;
    const message = commands
      .map(cmd => `/${cmd}`)
      .sort()
      .join('\n');
    await telegramClient.sendMessage(chatId, message);
  }

  private async getMovies(chatId: number): Promise<void> {
    const movies: Array<Record<string, any>> = await this.cultureService.getMovies();
    const message: string = movies
      .map((movie: Record<string, any>) => {
        const { url, name } = movie;
        return `- [${name}](${url})`;
      })
      .join('\n');
    await telegramClient.sendMarkdownMessage(chatId, message);
  }

  private async getPhonesPrefixes(chatId: number): Promise<void> {
    const prefixes: Array<any> = await this.informationService.getPrefixes();
    const message: string = prefixes
      .map(item => {
        const { prefix, provider } = item;
        return `${prefix} - ${provider}`;
      })
      .join('\n');
    await telegramClient.sendMarkdownMessage(chatId, message);
  }

  private async getVietcetera(chatId: number): Promise<void> {
    const articles: Array<any> = await vietcetera.getArticles({ type: 'latest' });
    const message: string = articles
      .map((article: Record<string, any>, index: number) => {
        const { title = '', slug = '', language = '' } = article;
        const url: string =
          language && slug ? `https://vietcetera.com/${language.toLowerCase()}/${slug}` : '';
        return `[${index + 1} - ${title}](${url})`;
      })
      .join('\n');
    await telegramClient.sendMarkdownMessage(chatId, message);
  }

  private async getLicensePlate(chatId: number, text: string) {
    const license: string = text.replace(/^\D+/g, '');
    const [plate = { definition: '' }] = await this.licensePlatesService.getLicensePlates(license);
    const { definition = '' } = plate;
    await telegramClient.sendMarkdownMessage(chatId, definition);
  }

  private async getVLeagueTable(chatId: number) {
    const vleague = await this.cultureService.getVLeague();
    const { leagueTable = [] } = vleague;
    const message: string = leagueTable
      .map(item => {
        const { rank, name, played, point } = item;
        return `${utils.addZero(rank)} - ${name} - ${utils.addZero(played)} - ${utils.addZero(
          point
        )}`;
      })
      .join('\n');
    await telegramClient.sendMarkdownMessage(chatId, message);
  }

  private async getLunarDate(chatId: number) {
    const d: Date = new Date();
    const yyyy: number = d.getFullYear();
    const mm: number = d.getMonth() + 1;
    const dd: number = d.getDate();
    const { date, month, year } = calendar.convertSolarToLunar(dd, mm, yyyy);
    const message = `${year}/${utils.addZero(month)}/${utils.addZero(date)}`;
    await telegramClient.sendMarkdownMessage(chatId, message);
  }

  private async getTrendingNews(chatId: number) {
    const trends = await this.newsService.getGoogleTrends('vietnam');
    const message: string = trends
      .map((trend: string, index: number) => {
        const url: string = `https://www.google.com/search?q=${encodeURI(trend)}`;
        return `[${index + 1} - ${trend}](${url})`;
      })
      .join('\n');
    await telegramClient.sendMarkdownMessage(chatId, message);
  }

  private async getYouTubeTrending(chatId: number, categoryId: number = 0) {
    const trending: Array<any> = await this.youTubeService.getTrending(categoryId);
    const message: string = trending
      .map((video, index: number) => {
        let { id, title } = video;
        title = title.replace(/\[/g, '(').replace(/\]/g, ')');
        const url: string = `https://youtu.be/${id}`;
        return `[${index + 1} - ${title}](${url})`;
      })
      .splice(0, 10)
      .join('\n');
    await telegramClient.sendMarkdownMessage(chatId, message);
  }

  private async syncForexRates(chatId: number) {
    const { year, month, date, hours, minutes, timestamp } = dateTime.getTime();
    const time = { year, month, date, hour: minutes, minute: minutes, timestamp };
    await this.banksService.syncForexRates(time);
    await telegramClient.sendMarkdownMessage(chatId, `SYNC - DONE`);
  }

  private async getAirVisual(chatId: number): Promise<void> {
    const airVisual = await this.weatherService.getAirVisual('hanoi');
    const city: string = _.get(airVisual, 'city', '');
    const aqius: number = _.get(airVisual, 'current.pollution.aqius', 0);
    const level = this.weatherService.getAirVisualLevel(aqius);
    const description: string = _.get(level, 'description', '');
    await telegramClient.sendMarkdownMessage(chatId, `${city} - ${aqius}\n${description}`);
  }

  private async getWeather(chatId: number): Promise<void> {
    const current = await this.weatherService.getCurrentWeather('hanoi');
    const name: string = _.get(current, 'name', '');
    const temp: number = _.get(current, 'main.temp', 0);
    const main: string = _.get(current, 'weather.0.main');
    const description: string = _.get(current, 'weather.0.description');
    const message: string = `${name} - ${temp}\n${main} (${description})`;
    await telegramClient.sendMarkdownMessage(chatId, message);
  }
}
