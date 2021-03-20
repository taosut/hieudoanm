/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  Calendar,
  Eye,
  ForexCurrencies,
  ForexRates,
  Home,
  License,
  NewsArticles,
  NewsTrends,
  StockCompanies,
  Visas,
  VLeagueMatches,
  VLeagueTable,
  WeatherAll,
  WeatherForecast,
} from './screens';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen name="home" options={{ title: 'NAM' }}>
            {props => <Home {...props} />}
          </Stack.Screen>
          <Stack.Screen name="calendar" options={{ title: 'CALENDAR' }}>
            {props => <Calendar {...props} />}
          </Stack.Screen>
          <Stack.Screen name="eye" options={{ title: 'EYE' }}>
            {props => <Eye {...props} />}
          </Stack.Screen>
          <Stack.Screen name="forexcurrencies" options={{ title: 'FOREX - CURRENCIES' }}>
            {props => <ForexCurrencies {...props} />}
          </Stack.Screen>
          <Stack.Screen name="forexrates" options={{ title: 'FOREX - RATES' }}>
            {props => <ForexRates {...props} />}
          </Stack.Screen>
          <Stack.Screen name="license" options={{ title: 'LICENSE' }}>
            {props => <License {...props} />}
          </Stack.Screen>
          <Stack.Screen name="newsarticles" options={{ title: 'NEWS - ARTICLES' }}>
            {props => <NewsArticles {...props} />}
          </Stack.Screen>
          <Stack.Screen name="newstrends" options={{ title: 'NEWS - TRENDS' }}>
            {props => <NewsTrends {...props} />}
          </Stack.Screen>
          <Stack.Screen name="stockcompanies" options={{ title: 'STOCK - COMPANIES' }}>
            {props => <StockCompanies {...props} />}
          </Stack.Screen>
          <Stack.Screen name="visas" options={{ title: 'VISAS' }}>
            {props => <Visas {...props} />}
          </Stack.Screen>
          <Stack.Screen name="vleaguematches" options={{ title: 'VLEAGUE - MATCHES' }}>
            {props => <VLeagueMatches {...props} />}
          </Stack.Screen>
          <Stack.Screen name="vleaguetable" options={{ title: 'VLEAGUE - TABLE' }}>
            {props => <VLeagueTable {...props} />}
          </Stack.Screen>
          <Stack.Screen name="weather" options={{ title: 'WEATHER' }}>
            {props => <WeatherAll {...props} />}
          </Stack.Screen>
          <Stack.Screen name="weatherforecast" options={{ title: 'WEATHER - FORECAST' }}>
            {props => <WeatherForecast {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
