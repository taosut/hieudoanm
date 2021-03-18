/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

import { api, utils } from '../services';

type Props = {};

type State = {
  solarDate: number;
  solarMonth: number;
  solarYear: number;
  lunarDate: number;
  lunarMonth: number;
  lunarYear: number;
};

export default class LunarCalendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      solarDate: 0,
      solarMonth: 0,
      solarYear: 0,
      lunarDate: 0,
      lunarMonth: 0,
      lunarYear: 0,
    };

    this.convertSolarToLunar = this.convertSolarToLunar.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const d = new Date();
    const year: number = d.getFullYear();
    const month: number = d.getMonth() + 1;
    const date: number = d.getDate();
    await this.convertSolarToLunar({ year, month, date });
  }

  async convertSolarToLunar(date: any): Promise<void> {
    const { date: solarDate = 0, month: solarMonth = 0, year: solarYear = 0 } = date;
    const {
      date: lunarDate = 0,
      month: lunarMonth = 0,
      year: lunarYear = 0,
    } = await api.convertSolarToLunar(solarDate, solarMonth, solarYear);
    this.setState({ solarDate, solarMonth, solarYear, lunarDate, lunarMonth, lunarYear });
  }

  render() {
    const {
      lunarDate = 0,
      lunarMonth = 0,
      lunarYear = 0,
      solarDate = 0,
      solarMonth = 0,
      solarYear = 0,
    } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.date}>
            <Text style={styles.text}>
              SOLAR: {utils.addZero(solarYear)}-{utils.addZero(solarMonth)}-
              {utils.addZero(solarDate)}
            </Text>
            <Text style={styles.text}>
              LUNAR: {utils.addZero(lunarYear)}-{utils.addZero(lunarMonth)}-
              {utils.addZero(lunarDate)}
            </Text>
          </View>
          <Calendar />
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
  date: {
    padding: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
});
