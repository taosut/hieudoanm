/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';

import City from './City';

type Props = {
  navigation: any;
};

type State = {};

export default class Weather extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    const cities: Array<string> = ['Hanoi', 'Ho Chi Minh City'];
    const { props } = this;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <ScrollView>
            {cities.map((city: string, index: number) => (
              <City {...props} key={index} city={city} />
            ))}
          </ScrollView>
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
});
