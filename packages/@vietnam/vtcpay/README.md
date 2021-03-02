# VTCPay

A Node.js API Wrapper Library for [VTCPay](https://vtcpay.vn/)

If you've found an bug/issue, please [send me an email](mailto:hieumdoan@gmail.com).

- [VTCPay](#vtcpay)
  - [Installation](#installation)
  - [Usage](#usage)
    - [APIs](#apis)
    - [Banks](#banks)
    - [Countries](#countries)

## Installation

```sh
npm install vtcpay
# OR
yarn add vtcpay
```

## Usage

### APIs

```ts
import VTCPay from 'vtcpay';

const vtcpay = new VTCPay({
  website_id: '', // string
  secret_key: '', // string
  url_return: '', // string
  security_code: '', // string
  test: false // boolean (optional) - default false
});

// Get Banks
const banks = vtcpay.getBanks();

// Get Countries
const countries = vtcpay.getCountries();

// Create Payment URL
const url: string = vtcpay.createPaymentUrl({
  amount: 1000,
  address: 'test_address',
  city: 'test_city',
  email: 'test@gmail.com',
  first_name: 'test_first_name',
  phone: '0123456789',
  family_name: 'test_family_name',
  country: 'VN', // Use Country Code (See table below)
  payment_type: 'VTCPay', // options: ['VTCPay', 'DomesticBank', 'InternationalCard'] - default 'VTCPay'
  postcode: 100000
});

// Verify Return URL
const response = vnpay.verifyReturnUrl(query); // { code: '', message: '' }
```

### Banks

| code             | name                                                                    |
| ---------------- | ----------------------------------------------------------------------- |
| Vietcombank      | JSC Bank for Foreign Trade of Vietnam - Vietcombank                     |
| Techcombank      | Vietnam Technological and Commercial Joint- stock Bank - Techcombank    |
| MB               | Military Commercial Joint Stock Bank - MBBank                           |
| Vietinbank       | Vietnam Joint Stock Commercial Bank for Industry and Trade - Vietinbank |
| Agribank         | Vietnam Bank for Agriculture and Rural Development - Agribank           |
| DongABank        | DongA Joint Stock Commercial Bank - DongABank                           |
| Oceanbank        | Ocean Commercial One Member Limited Liability Bank - Oceanbank          |
| BIDV             | Bank for Investment and Development of Vietnam - BIDV                   |
| SHB              | Saigon – Hanoi Commercial Joint Stock Bank - SHB                        |
| VIB              | Vietnam International Commercial Joint Stock Bank - VIB                 |
| MaritimeBank     | Vietnam Maritime Commercial Joint Stock Bank - MaritimeBank             |
| Eximbank         | Vietnam Export Import Commercial Joint Stock Bank - Eximbank            |
| Master           | Master                                                                  |
| Visa             | Visa                                                                    |
| Jcb              | Jcb                                                                     |
| ACB              | Asia Commercial Joint Stock Bank - ACB                                  |
| HDBank           | Ho Chi Minh City Development Joint Stock Commercial Bank - HDBank       |
| NamABank         | Nam A Commercial Joint Stock Bank - NamABank                            |
| SaigonBank       | Saigon Bank for Industry and Trade - SaigonBank                         |
| Sacombank        | Saigon Thuong Tin Commercial Joint Stock Bank - Sacombank               |
| VietABank        | VietNam Asia Commercial Joint Stock Bank - VietABank                    |
| VPBank           | Vietnam Prosperity Joint-Stock Commercial Bank - VPBank                 |
| TienPhongBank    | Tien Phong Commercial Joint Stock Bank - TienPhongBank                  |
| SeaABank         | Southeast Asia Commercial Joint Stock Bank - SeABank                    |
| PGBank           | Petrolimex Group Commercial Joint Stock Bank - PGBank                   |
| NCB              | National Citizen Bank - NCB                                             |
| GPBank           | Global Petro Commercial Joint Stock Bank - GPBank                       |
| BACABANK         | Bac A Commercial Joint Stock Bank - BacABank                            |
| OCB              | Orient Commercial Joint Stock Bank - OCB                                |
| LienVietPostBank | Lien Viet Post Joint Stock Commercial Bank - LienVietPostBank           |
| ABBANK           | An Binh Commercial Join Stock Bank - ABBank                             |
| PVcomBank        | Vietnam Public Joint Stock Commercial Bank - PVcomBank                  |
| BVB              | Bao Viet Joint Stock Commercial Bank - BaoVietBank                      |
| SCBBank          | Sai Gon Joint Stock Commercial Bank - SCB                               |
| KienLongBank     | Kien Long Commercial Joint Stock Bank - Kienlongbank                    |
| VRB              | Vietnam - Russia Joint Venture Bank - VRB                               |
| PublicBank       | Public Bank                                                             |

### Countries

| code | name                                        |
| ---- | ------------------------------------------- |
| AF   | Afghanistan                                 |
| AX   | Aland Islands                               |
| AL   | Albania                                     |
| DZ   | Algeria                                     |
| AS   | American Samoa (US)                         |
| AD   | Andorra                                     |
| AO   | Angola                                      |
| AI   | Anguilla (UK)                               |
| AQ   | Antarctica                                  |
| AG   | Antigua and Barbuda                         |
| AR   | Argentina                                   |
| AM   | Armenia                                     |
| AW   | Aruba                                       |
| AU   | Australia                                   |
| AT   | Austria                                     |
| AZ   | Azerbaijan                                  |
| BS   | Bahamas                                     |
| BH   | Bahrain                                     |
| BD   | Bangladesh                                  |
| BB   | Barbados                                    |
| BY   | Belarus                                     |
| BE   | Belgium                                     |
| BZ   | Belize                                      |
| BJ   | Benin                                       |
| BM   | Bermuda (UK)                                |
| BT   | Bhutan                                      |
| BO   | Bolivia                                     |
| BQ   | Bonaire, Sint Eustatius and Saba            |
| BA   | Bosnia and Herzegovina                      |
| BW   | Botswana                                    |
| BV   | Bouvet Island                               |
| BR   | Brazil                                      |
| IO   | British Indian Ocean Territory              |
| VG   | British Virgin Islands (UK)                 |
| BN   | Brunei Darussalam                           |
| BG   | Bulgaria                                    |
| BF   | Burkina Faso                                |
| BI   | Burundi                                     |
| KH   | Cambodia                                    |
| CM   | Cameroon                                    |
| CA   | Canada                                      |
| CV   | Cape Verde                                  |
| KY   | Cayman Islands (UK)                         |
| CF   | Central African Republic                    |
| TD   | Chad                                        |
| CL   | Chile                                       |
| CN   | China                                       |
| CX   | Christmas Island (AU)                       |
| CC   | Cocos (Keeling) Islands (AU)                |
| CO   | Colombia                                    |
| KM   | Comoros                                     |
| CD   | Congo, Democratic Republic of the -         |
| CG   | Congo, Republic of the                      |
| CK   | Cook Islands (NZ)                           |
| CR   | Costa Rica                                  |
| CI   | Côte D'Ivoire                               |
| HR   | Croatia                                     |
| CU   | Cuba                                        |
| CW   | Curaçao                                     |
| CY   | Cyprus                                      |
| CZ   | Czech Republic                              |
| DK   | Denmark                                     |
| DJ   | Djibouti                                    |
| DM   | Dominica                                    |
| DO   | Dominican Republic                          |
| EC   | Ecuador                                     |
| EG   | Egypt                                       |
| SV   | El Salvador                                 |
| GQ   | Equatorial Guinea                           |
| ER   | Eritrea                                     |
| EE   | Estonia                                     |
| ET   | Ethiopia                                    |
| FK   | Falkland Islands (UK)                       |
| FO   | Faroe Islands (DK)                          |
| FJ   | Fiji                                        |
| FI   | Finland                                     |
| FR   | France                                      |
| GF   | French Guiana (FR)                          |
| PF   | French Polynesia (FR)                       |
| TF   | French Southern Territories                 |
| GA   | Gabon                                       |
| GM   | Gambia                                      |
| GE   | Georgia                                     |
| DE   | Germany                                     |
| GH   | Ghana                                       |
| GI   | Gibraltar (UK)                              |
| GR   | Greece                                      |
| GL   | Greenland (DK)                              |
| GD   | Grenada                                     |
| GP   | Guadeloupe (FR)                             |
| GU   | Guam (US)                                   |
| GT   | Guatemala                                   |
| GG   | Guernsey                                    |
| GN   | Guinea                                      |
| GW   | Guinea-Bissau                               |
| GY   | Guyana                                      |
| HT   | Haiti                                       |
| HM   | Heard Island and McDonald Islands           |
| VA   | Holy See (Vatican City)                     |
| HN   | Honduras                                    |
| HK   | Hong Kong (CN)                              |
| HU   | Hungary                                     |
| IS   | Iceland                                     |
| IN   | India                                       |
| ID   | Indonesia                                   |
| IR   | Iran                                        |
| IQ   | Iraq                                        |
| IE   | Ireland                                     |
| IM   | Isle of Man                                 |
| IL   | Israel                                      |
| IT   | Italy                                       |
| JM   | Jamaica                                     |
| JP   | Japan                                       |
| JE   | Jersey                                      |
| JO   | Jordan                                      |
| KZ   | Kazakhstan                                  |
| KE   | Kenya                                       |
| KI   | Kiribati                                    |
| KP   | Korea, Democratic People's Republic (North) |
| KR   | Korea, Republic of (South)                  |
| KW   | Kuwait                                      |
| KG   | Kyrgyzstan                                  |
| LA   | Laos                                        |
| LV   | Latvia                                      |
| LB   | Lebanon                                     |
| LS   | Lesotho                                     |
| LR   | Liberia                                     |
| LY   | Libya                                       |
| LI   | Liechtenstein                               |
| LT   | Lithuania                                   |
| LU   | Luxembourg                                  |
| MO   | Macau (CN)                                  |
| MK   | Macedonia                                   |
| MG   | Madagascar                                  |
| MW   | Malawi                                      |
| MY   | Malaysia                                    |
| MV   | Maldives                                    |
| ML   | Mali                                        |
| MT   | Malta                                       |
| MH   | Marshall Islands                            |
| MQ   | Martinique (FR)                             |
| MR   | Mauritania                                  |
| MU   | Mauritius                                   |
| YT   | Mayotte (FR)                                |
| MX   | Mexico                                      |
| FM   | Micronesia, Federated States of             |
| MD   | Moldova Republic of                         |
| MC   | Monaco                                      |
| MN   | Mongolia                                    |
| ME   | Montenegro                                  |
| MS   | Montserrat (UK)                             |
| MA   | Morocco                                     |
| MZ   | Mozambique                                  |
| MM   | Myanmar                                     |
| NA   | Namibia                                     |
| NR   | Nauru                                       |
| NP   | Nepal                                       |
| NL   | Netherlands                                 |
| AN   | Netherlands Antilles (NL)                   |
| NC   | New Caledonia (FR)                          |
| NZ   | New Zealand                                 |
| NI   | Nicaragua                                   |
| NE   | Niger                                       |
| NG   | Nigeria                                     |
| NU   | Niue                                        |
| NF   | Norfolk Island (AU)                         |
| MP   | Northern Mariana Islands (US)               |
| NO   | Norway                                      |
| OM   | Oman                                        |
| PK   | Pakistan                                    |
| PW   | Palau                                       |
| PS   | Palestinian Territories                     |
| PA   | Panama                                      |
| PG   | Papua New Guinea                            |
| PY   | Paraguay                                    |
| PE   | Peru                                        |
| PH   | Philippines                                 |
| PN   | Pitcairn Islands (UK)                       |
| PL   | Poland                                      |
| PT   | Portugal                                    |
| PR   | Puerto Rico (US)                            |
| QA   | Qatar                                       |
| RE   | Reunion (FR)                                |
| RO   | Romania                                     |
| RU   | Russia                                      |
| RW   | Rwanda                                      |
| BL   | Saint Barthelemy                            |
| SH   | Saint Helena (UK)                           |
| KN   | Saint Kitts and Nevis                       |
| LC   | Saint Lucia                                 |
| MF   | Saint Martin (French Part)                  |
| PM   | Saint Pierre & Miquelon (FR)                |
| VC   | Saint Vincent and the Grenadines            |
| WS   | Samoa                                       |
| SM   | San Marino                                  |
| ST   | Sao Tome and Principe                       |
| SA   | Saudi Arabia                                |
| SN   | Senegal                                     |
| RS   | Serbia                                      |
| SC   | Seychelles                                  |
| SL   | Sierra Leone                                |
| SG   | Singapore                                   |
| SX   | Sint Maarten (Dutch Part)                   |
| SK   | Slovakia                                    |
| SI   | Slovenia                                    |
| SB   | Solomon Islands                             |
| SO   | Somalia                                     |
| ZA   | South Africa                                |
| GS   | South Georgia & South Sandwich Islands (UK) |
| SS   | South Sudan                                 |
| ES   | Spain                                       |
| LK   | Sri Lanka                                   |
| SD   | Sudan                                       |
| SR   | Suriname                                    |
| SJ   | Svalbard and Jan Mayen                      |
| SZ   | Swaziland                                   |
| SE   | Sweden                                      |
| CH   | Switzerland                                 |
| SY   | Syria                                       |
| TW   | Taiwan                                      |
| TJ   | Taj ikistan                                 |
| TZ   | Tanzania                                    |
| TH   | Thailand                                    |
| TL   | Timor-Leste                                 |
| TG   | Togo                                        |
| TK   | Tokelau                                     |
| TO   | Tonga                                       |
| TT   | Trinidad and Tobago                         |
| TN   | Tunisia                                     |
| TR   | Turkey                                      |
| TM   | Turkmenistan                                |
| TC   | Turks and Caicos Islands (UK)               |
| TV   | Tuvalu                                      |
| UG   | Uganda                                      |
| UA   | Ukraine                                     |
| AE   | United Arab Emirates                        |
| GB   | United Kingdom                              |
| US   | United States                               |
| UM   | United States Minor Outlying Islands        |
| UY   | Uruguay                                     |
| UZ   | Uzbekistan                                  |
| VU   | Vanuatu                                     |
| VE   | Venezuela                                   |
| VN   | Vietnam                                     |
| VI   | Virgin Islands (US)                         |
| WF   | Wallis and Futuna (FR)                      |
| EH   | Western Sahara                              |
| YE   | Yemen                                       |
| ZM   | Zambia                                      |
| ZW   | Zimbabwe                                    |
