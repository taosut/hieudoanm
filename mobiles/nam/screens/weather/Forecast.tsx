/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';

import { colors } from '../../constant';
import { api, utils } from '../../services';

type Props = {
  route: any;
};

type State = {
  loading: boolean;
  list: Array<any>;
  name: string;
};

export default class Forecast extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { name: '', list: [], loading: false };
  }

  async componentDidMount() {
    const { route = {} } = this.props;
    const { params = {} } = route;
    const { city = '' } = params;
    await this.getWeatherForecast(city);
  }

  async getWeatherForecast(city: string) {
    this.setState({ loading: true });
    const forecast = await api.getWeatherForecast(city);
    const { list = [], city: _city = {} } = forecast;
    const { name = '' } = _city;
    this.setState({ loading: false, list, name });
  }

  render() {
    const { loading = false, list = [], name = '' } = this.state;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          {name.length > 0 && (
            <View style={styles.city}>
              <Text style={styles.title}>{name}</Text>
            </View>
          )}
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
          {!loading && (
            <View>
              {list.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO MATCHES</Text>
                </View>
              )}
              {list.length > 0 && (
                <ScrollView>
                  {list.map((item: Record<string, any>, index: number) => {
                    const { dt = 0, main: temperature = {}, weather = [] } = item;
                    const { temp = 0, feels_like = 0 } = temperature;
                    const [first = {}] = weather;
                    const { main = '', description = '' } = first;
                    const timestamp = dt * 1000 + 7 * 60 * 60 * 1000;
                    const d = new Date(timestamp);
                    const year = utils.addZero(d.getFullYear());
                    const month = utils.addZero(d.getMonth() + 1);
                    const date = utils.addZero(d.getDate());
                    const hours = utils.addZero(d.getHours());
                    const minutes = utils.addZero(d.getMinutes());
                    const dt_txt = `${year}-${month}-${date} ${hours}:${minutes}`;
                    return (
                      <View key={index} style={styles.item}>
                        <Text>{dt_txt}</Text>
                        <Text>
                          {temp}°C ({feels_like}°C)
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
  city: {
    padding: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
  title: {
    textAlign: 'center',
    textTransform: 'uppercase',
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
