/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import { colors } from '../../constant';
import { api } from '../../services';

type Props = {
  navigation: any;
  city: string;
};

type State = {
  loading: boolean;
  weather: Record<string, any>;
};

export default class Weather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, weather: {} };

    this.getWeather = this.getWeather.bind(this);
  }

  async componentDidMount() {
    await this.getWeather();
  }

  async getWeather() {
    const { city = '' } = this.props;
    this.setState({ loading: true });
    const res = await api.getWeather(city);
    const airVisual: number = await api.getAirVisual(city);
    const { name: _city = '', main: temperature = {}, weather = [] } = res;
    const { temp = 0, feels_like = 0 } = temperature;
    const [first = {}] = weather;
    const { main = '', description = '' } = first;
    this.setState({
      loading: false,
      weather: { city: _city, temp, feels_like, main, description, airVisual },
    });
  }

  render() {
    const { loading = false, weather = {} } = this.state;
    const { navigation } = this.props;
    const { city, temp, feels_like, main, description, airVisual } = weather;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
          {!loading && (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('weatherforecast', { city })}>
              <View style={styles.item}>
                <Text>
                  {city} - {temp}°C ({feels_like}°C)
                </Text>
                <Text>
                  {main} ({description}) - {airVisual}
                </Text>
              </View>
            </TouchableWithoutFeedback>
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
  item: {
    color: colors.dark,
    backgroundColor: colors.white,
    padding: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
});
