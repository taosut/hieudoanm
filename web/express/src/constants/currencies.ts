'use strict';

interface ICurrency {
  code: string;
  name: string;
  symbol: string;
}

const currencies: Array<ICurrency> = [
  { code: '(none)', name: 'Faroese króna', symbol: 'kr' },
  { code: 'AED', name: 'United Arab Emirates dirham', symbol: 'د.إ' },
  { code: 'AFN', name: 'Afghan afghani', symbol: '؋' },
  { code: 'ALL', name: 'Albanian lek', symbol: 'L' },
  { code: 'AMD', name: 'Armenian dram', symbol: null },
  { code: 'ANG', name: 'Netherlands Antillean guilder', symbol: 'ƒ' },
  {
    code: 'AOA',
    name: 'Angolan kwanza',
    symbol: 'Kz'
  },
  {
    code: 'ARS',
    name: 'Argentine peso',
    symbol: '$'
  },
  {
    code: 'AUD',
    name: 'Australian dollar',
    symbol: '$'
  },
  {
    code: 'AWG',
    name: 'Aruban florin',
    symbol: 'ƒ'
  },
  {
    code: 'AZN',
    name: 'Azerbaijani manat',
    symbol: null
  },
  {
    code: 'BAM',
    name: 'Bosnia and Herzegovina convertible mark',
    symbol: null
  },
  {
    code: 'BBD',
    name: 'Barbadian dollar',
    symbol: '$'
  },
  {
    code: 'BDT',
    name: 'Bangladeshi taka',
    symbol: '৳'
  },
  {
    code: 'BGN',
    name: 'Bulgarian lev',
    symbol: 'лв'
  },
  {
    code: 'BHD',
    name: 'Bahraini dinar',
    symbol: '.د.ب'
  },
  {
    code: 'BIF',
    name: 'Burundian franc',
    symbol: 'Fr'
  },
  {
    code: 'BMD',
    name: 'Bermudian dollar',
    symbol: '$'
  },
  {
    code: 'BND',
    name: 'Brunei dollar',
    symbol: '$'
  },
  {
    code: 'BOB',
    name: 'Bolivian boliviano',
    symbol: 'Bs.'
  },
  {
    code: 'BRL',
    name: 'Brazilian real',
    symbol: 'R$'
  },
  {
    code: 'BSD',
    name: 'Bahamian dollar',
    symbol: '$'
  },
  {
    code: 'BTN',
    name: 'Bhutanese ngultrum',
    symbol: 'Nu.'
  },
  {
    code: 'BWP',
    name: 'Botswana pula',
    symbol: 'P'
  },
  {
    code: 'BYN',
    name: 'New Belarusian ruble',
    symbol: 'Br'
  },
  {
    code: 'BYR',
    name: 'Old Belarusian ruble',
    symbol: 'Br'
  },
  {
    code: 'BZD',
    name: 'Belize dollar',
    symbol: '$'
  },
  {
    code: 'CAD',
    name: 'Canadian dollar',
    symbol: '$'
  },
  {
    code: 'CDF',
    name: 'Congolese franc',
    symbol: 'Fr'
  },
  {
    code: 'CHF',
    name: 'Swiss franc',
    symbol: 'Fr'
  },
  {
    code: 'CKD',
    name: 'Cook Islands dollar',
    symbol: '$'
  },
  {
    code: 'CLP',
    name: 'Chilean peso',
    symbol: '$'
  },
  {
    code: 'CNY',
    name: 'Chinese yuan',
    symbol: '¥'
  },
  {
    code: 'COP',
    name: 'Colombian peso',
    symbol: '$'
  },
  {
    code: 'CRC',
    name: 'Costa Rican colón',
    symbol: '₡'
  },
  {
    code: 'CUC',
    name: 'Cuban convertible peso',
    symbol: '$'
  },
  {
    code: 'CUP',
    name: 'Cuban peso',
    symbol: '$'
  },
  {
    code: 'CVE',
    name: 'Cape Verdean escudo',
    symbol: 'Esc'
  },
  {
    code: 'CZK',
    name: 'Czech koruna',
    symbol: 'Kč'
  },
  {
    code: 'DJF',
    name: 'Djiboutian franc',
    symbol: 'Fr'
  },
  {
    code: 'DKK',
    name: 'Danish krone',
    symbol: 'kr'
  },
  {
    code: 'DOP',
    name: 'Dominican peso',
    symbol: '$'
  },
  {
    code: 'DZD',
    name: 'Algerian dinar',
    symbol: 'د.ج'
  },
  {
    code: 'EGP',
    name: 'Egyptian pound',
    symbol: '£'
  },
  {
    code: 'ERN',
    name: 'Eritrean nakfa',
    symbol: 'Nfk'
  },
  {
    code: 'ETB',
    name: 'Ethiopian birr',
    symbol: 'Br'
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€'
  },
  {
    code: 'FJD',
    name: 'Fijian dollar',
    symbol: '$'
  },
  {
    code: 'FKP',
    name: 'Falkland Islands pound',
    symbol: '£'
  },
  {
    code: 'GBP',
    name: 'British pound',
    symbol: '£'
  },
  {
    code: 'GEL',
    name: 'Georgian Lari',
    symbol: 'ლ'
  },
  {
    code: 'GHS',
    name: 'Ghanaian cedi',
    symbol: '₵'
  },
  {
    code: 'GIP',
    name: 'Gibraltar pound',
    symbol: '£'
  },
  {
    code: 'GMD',
    name: 'Gambian dalasi',
    symbol: 'D'
  },
  {
    code: 'GNF',
    name: 'Guinean franc',
    symbol: 'Fr'
  },
  {
    code: 'GTQ',
    name: 'Guatemalan quetzal',
    symbol: 'Q'
  },
  {
    code: 'GYD',
    name: 'Guyanese dollar',
    symbol: '$'
  },
  {
    code: 'HKD',
    name: 'Hong Kong dollar',
    symbol: '$'
  },
  {
    code: 'HNL',
    name: 'Honduran lempira',
    symbol: 'L'
  },
  {
    code: 'HRK',
    name: 'Croatian kuna',
    symbol: 'kn'
  },
  {
    code: 'HTG',
    name: 'Haitian gourde',
    symbol: 'G'
  },
  {
    code: 'HUF',
    name: 'Hungarian forint',
    symbol: 'Ft'
  },
  {
    code: 'IDR',
    name: 'Indonesian rupiah',
    symbol: 'Rp'
  },
  {
    code: 'ILS',
    name: 'Israeli new shekel',
    symbol: '₪'
  },
  {
    code: 'IMP[G]',
    name: 'Manx pound',
    symbol: '£'
  },
  {
    code: 'INR',
    name: 'Indian rupee',
    symbol: '₹'
  },
  {
    code: 'IQD',
    name: 'Iraqi dinar',
    symbol: 'ع.د'
  },
  {
    code: 'IRR',
    name: 'Iranian rial',
    symbol: '﷼'
  },
  {
    code: 'ISK',
    name: 'Icelandic króna',
    symbol: 'kr'
  },
  {
    code: 'JEP[G]',
    name: 'Jersey pound',
    symbol: '£'
  },
  {
    code: 'JMD',
    name: 'Jamaican dollar',
    symbol: '$'
  },
  {
    code: 'JOD',
    name: 'Jordanian dinar',
    symbol: 'د.ا'
  },
  {
    code: 'JPY',
    name: 'Japanese yen',
    symbol: '¥'
  },
  {
    code: 'KES',
    name: 'Kenyan shilling',
    symbol: 'Sh'
  },
  {
    code: 'KGS',
    name: 'Kyrgyzstani som',
    symbol: 'с'
  },
  {
    code: 'KHR',
    name: 'Cambodian riel',
    symbol: '៛'
  },
  {
    code: 'KMF',
    name: 'Comorian franc',
    symbol: 'Fr'
  },
  {
    code: 'KPW',
    name: 'North Korean won',
    symbol: '₩'
  },
  {
    code: 'KRW',
    name: 'South Korean won',
    symbol: '₩'
  },
  {
    code: 'KWD',
    name: 'Kuwaiti dinar',
    symbol: 'د.ك'
  },
  {
    code: 'KYD',
    name: 'Cayman Islands dollar',
    symbol: '$'
  },
  {
    code: 'KZT',
    name: 'Kazakhstani tenge',
    symbol: null
  },
  {
    code: 'LAK',
    name: 'Lao kip',
    symbol: '₭'
  },
  {
    code: 'LBP',
    name: 'Lebanese pound',
    symbol: 'ل.ل'
  },
  {
    code: 'LKR',
    name: 'Sri Lankan rupee',
    symbol: 'Rs'
  },
  {
    code: 'LRD',
    name: 'Liberian dollar',
    symbol: '$'
  },
  {
    code: 'LSL',
    name: 'Lesotho loti',
    symbol: 'L'
  },
  {
    code: 'LYD',
    name: 'Libyan dinar',
    symbol: 'ل.د'
  },
  {
    code: 'MAD',
    name: 'Moroccan dirham',
    symbol: 'د.م.'
  },
  {
    code: 'MDL',
    name: 'Moldovan leu',
    symbol: 'L'
  },
  {
    code: 'MGA',
    name: 'Malagasy ariary',
    symbol: 'Ar'
  },
  {
    code: 'MKD',
    name: 'Macedonian denar',
    symbol: 'ден'
  },
  {
    code: 'MMK',
    name: 'Burmese kyat',
    symbol: 'Ks'
  },
  {
    code: 'MNT',
    name: 'Mongolian tögrög',
    symbol: '₮'
  },
  {
    code: 'MOP',
    name: 'Macanese pataca',
    symbol: 'P'
  },
  {
    code: 'MRO',
    name: 'Mauritanian ouguiya',
    symbol: 'UM'
  },
  {
    code: 'MUR',
    name: 'Mauritian rupee',
    symbol: '₨'
  },
  {
    code: 'MVR',
    name: 'Maldivian rufiyaa',
    symbol: '.ރ'
  },
  {
    code: 'MWK',
    name: 'Malawian kwacha',
    symbol: 'MK'
  },
  {
    code: 'MXN',
    name: 'Mexican peso',
    symbol: '$'
  },
  {
    code: 'MYR',
    name: 'Malaysian ringgit',
    symbol: 'RM'
  },
  {
    code: 'MZN',
    name: 'Mozambican metical',
    symbol: 'MT'
  },
  {
    code: 'NAD',
    name: 'Namibian dollar',
    symbol: '$'
  },
  {
    code: 'NGN',
    name: 'Nigerian naira',
    symbol: '₦'
  },
  {
    code: 'NIO',
    name: 'Nicaraguan córdoba',
    symbol: 'C$'
  },
  {
    code: 'NOK',
    name: 'Norwegian krone',
    symbol: 'kr'
  },
  {
    code: 'NPR',
    name: 'Nepalese rupee',
    symbol: '₨'
  },
  {
    code: 'NZD',
    name: 'New Zealand dollar',
    symbol: '$'
  },
  {
    code: 'OMR',
    name: 'Omani rial',
    symbol: 'ر.ع.'
  },
  {
    code: 'PAB',
    name: 'Panamanian balboa',
    symbol: 'B/.'
  },
  {
    code: 'PEN',
    name: 'Peruvian sol',
    symbol: 'S/.'
  },
  {
    code: 'PGK',
    name: 'Papua New Guinean kina',
    symbol: 'K'
  },
  {
    code: 'PHP',
    name: 'Philippine peso',
    symbol: '₱'
  },
  {
    code: 'PKR',
    name: 'Pakistani rupee',
    symbol: '₨'
  },
  {
    code: 'PLN',
    name: 'Polish złoty',
    symbol: 'zł'
  },
  {
    code: 'PYG',
    name: 'Paraguayan guaraní',
    symbol: '₲'
  },
  {
    code: 'QAR',
    name: 'Qatari riyal',
    symbol: 'ر.ق'
  },
  {
    code: 'RON',
    name: 'Romanian leu',
    symbol: 'lei'
  },
  {
    code: 'RSD',
    name: 'Serbian dinar',
    symbol: 'дин.'
  },
  {
    code: 'RUB',
    name: 'Russian ruble',
    symbol: '₽'
  },
  {
    code: 'RWF',
    name: 'Rwandan franc',
    symbol: 'Fr'
  },
  {
    code: 'SAR',
    name: 'Saudi riyal',
    symbol: 'ر.س'
  },
  {
    code: 'SBD',
    name: 'Solomon Islands dollar',
    symbol: '$'
  },
  {
    code: 'SCR',
    name: 'Seychellois rupee',
    symbol: '₨'
  },
  {
    code: 'SDG',
    name: 'Sudanese pound',
    symbol: 'ج.س.'
  },
  {
    code: 'SEK',
    name: 'Swedish krona',
    symbol: 'kr'
  },
  {
    code: 'SGD',
    name: 'Singapore dollar',
    symbol: '$'
  },
  {
    code: 'SHP',
    name: 'Saint Helena pound',
    symbol: '£'
  },
  {
    code: 'SLL',
    name: 'Sierra Leonean leone',
    symbol: 'Le'
  },
  {
    code: 'SOS',
    name: 'Somali shilling',
    symbol: 'Sh'
  },
  {
    code: 'SRD',
    name: 'Surinamese dollar',
    symbol: '$'
  },
  {
    code: 'SSP',
    name: 'South Sudanese pound',
    symbol: '£'
  },
  {
    code: 'STD',
    name: 'São Tomé and Príncipe dobra',
    symbol: 'Db'
  },
  {
    code: 'SYP',
    name: 'Syrian pound',
    symbol: '£'
  },
  {
    code: 'SZL',
    name: 'Swazi lilangeni',
    symbol: 'L'
  },
  {
    code: 'THB',
    name: 'Thai baht',
    symbol: '฿'
  },
  {
    code: 'TJS',
    name: 'Tajikistani somoni',
    symbol: 'ЅМ'
  },
  {
    code: 'TMT',
    name: 'Turkmenistan manat',
    symbol: 'm'
  },
  {
    code: 'TND',
    name: 'Tunisian dinar',
    symbol: 'د.ت'
  },
  {
    code: 'TOP',
    name: 'Tongan paʻanga',
    symbol: 'T$'
  },
  {
    code: 'TRY',
    name: 'Turkish lira',
    symbol: null
  },
  {
    code: 'TTD',
    name: 'Trinidad and Tobago dollar',
    symbol: '$'
  },
  {
    code: 'TVD[G]',
    name: 'Tuvaluan dollar',
    symbol: '$'
  },
  {
    code: 'TWD',
    name: 'New Taiwan dollar',
    symbol: '$'
  },
  {
    code: 'TZS',
    name: 'Tanzanian shilling',
    symbol: 'Sh'
  },
  {
    code: 'UAH',
    name: 'Ukrainian hryvnia',
    symbol: '₴'
  },
  {
    code: 'UGX',
    name: 'Ugandan shilling',
    symbol: 'Sh'
  },
  {
    code: 'USD',
    name: 'United State Dollar',
    symbol: '$'
  },
  {
    code: 'UYU',
    name: 'Uruguayan peso',
    symbol: '$'
  },
  {
    code: 'UZS',
    name: "Uzbekistani so'm",
    symbol: null
  },
  {
    code: 'VEF',
    name: 'Venezuelan bolívar',
    symbol: 'Bs F'
  },
  {
    code: 'VND',
    name: 'Vietnamese đồng',
    symbol: '₫'
  },
  {
    code: 'VUV',
    name: 'Vanuatu vatu',
    symbol: 'Vt'
  },
  {
    code: 'WST',
    name: 'Samoan tālā',
    symbol: 'T'
  },
  {
    code: 'XAF',
    name: 'Central African CFA franc',
    symbol: 'Fr'
  },
  {
    code: 'XCD',
    name: 'East Caribbean dollar',
    symbol: '$'
  },
  {
    code: 'XOF',
    name: 'West African CFA franc',
    symbol: 'Fr'
  },
  {
    code: 'XPF',
    name: 'CFP franc',
    symbol: 'Fr'
  },
  {
    code: 'YER',
    name: 'Yemeni rial',
    symbol: '﷼'
  },
  { code: 'ZAR', name: 'South African rand', symbol: 'R' },
  { code: 'ZMW', name: 'Zambian kwacha', symbol: 'ZK' }
];

export default currencies;
