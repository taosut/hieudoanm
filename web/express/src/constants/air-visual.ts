'use strict';

interface ICity {
  city: string;
  state: string;
  country: string;
}

export const cities: Array<ICity> = [
  { city: 'Cau Dien', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Cau Giay', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Chuc Son', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Dai Nghia', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Dong Anh', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Dong Da', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Ha Dong', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Hai BaTrung', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Hanoi', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Hoan Kiem', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Kim Bai', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Lien Quan', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Quoc Oai', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Soc Son', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Tay Ho', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Thach That', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Thanh Xuan', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Van Dien', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Van Dinh', state: 'Hanoi', country: 'Vietnam' },
  { city: 'Ho Chi Minh City', state: 'Ho Chi Minh City', country: 'Vietnam' }
];

interface ILevel {
  min: number;
  max: number;
  icon: string;
  colorCode: string;
  description: string;
}

export const levels: Array<ILevel> = [
  {
    min: 0,
    max: 50,
    icon: 'ic-face-green',
    colorCode: '#a8e05f',
    description: 'Good'
  },
  {
    min: 51,
    max: 100,
    icon: 'ic-face-yellow',
    colorCode: '#fdd64b',
    description: 'Moderate'
  },
  {
    min: 101,
    max: 150,
    icon: 'ic-face-orange',
    colorCode: '#ff9b57',
    description: 'Unhealthy For Sensitive Groups'
  },
  {
    min: 151,
    max: 200,
    icon: 'ic-face-red',
    colorCode: '#fe6a69',
    description: 'Unhealthy'
  },
  {
    min: 201,
    max: 250,
    icon: 'ic-face-purple',
    colorCode: '#a97abc',
    description: 'Very Unhealthy'
  }
];
