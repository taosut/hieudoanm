/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet, ActivityIndicator, ScrollView, Text } from 'react-native';

import { colors } from '../constant';
import { api } from '../services';

type Props = {};

type State = {
  loading: boolean;
  weatherByCities: Array<any>;
};

export default class Weather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, weatherByCities: [] };

    this.getWeather = this.getWeather.bind(this);
  }

  async componentDidMount() {
    await this.getWeather();
  }

  async getWeather() {
    const cities: Array<string> = ['Hanoi', 'Ho Chi Minh City'];
    const weatherByCities: Array<any> = [];
    this.setState({ loading: true });
    for (const city of cities) {
      const res = await api.getWeather(city);
      const { name: _city = '', main: temperature = {}, weather = [] } = res;
      const { temp = 0, feels_like = 0 } = temperature;
      const [first = {}] = weather;
      const { main = '', description = '' } = first;
      weatherByCities.push({ city: _city, temp, feels_like, main, description });
    }
    this.setState({ loading: false, weatherByCities });
  }

  render() {
    const { loading = false, weatherByCities = [] } = this.state;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
          {!loading && (
            <View>
              {weatherByCities.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO LICENSE PLATES</Text>
                </View>
              )}
              {weatherByCities.length > 0 && (
                <ScrollView>
                  {weatherByCities.map((item: Record<string, any>, index: number) => {
                    const { city, temp, feels_like, main, description } = item;
                    return (
                      <View key={index} style={styles.item}>
                        <Text>
                          {city} - {temp}°C ({feels_like}°C)
                        </Text>
                        <Text>
                          {main} ({description})
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  loadingContainer: {
    padding: 16,
  },
  noResults: {
    padding: 16,
  },
  noResultsText: {
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  item: {
    color: colors.dark,
    backgroundColor: colors.white,
    padding: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
});
