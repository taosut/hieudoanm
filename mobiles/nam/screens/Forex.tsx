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
  rates: Array<any>;
  currencies: Array<string>;
};

export default class Forex extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, rates: [], currencies: [] };

    this.getBanksForexRates = this.getBanksForexRates.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.getBanksForexRates();
  }

  async getBanksForexRates() {
    this.setState({ loading: true });
    const rates: Array<Record<string, any>> = await api.getBanksForexRates();
    const currencies: Array<string> = rates
      .map(rate => rate.code || '')
      .filter(code => code)
      .filter((code: string, index: number, array: Array<string>) => array.indexOf(code) === index)
      .sort();
    this.setState({ loading: false, rates, currencies });
  }

  render() {
    const { loading = false, rates = [] } = this.state;

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
              {rates.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO LICENSE PLATES</Text>
                </View>
              )}
              {rates.length > 0 && (
                <ScrollView>
                  {rates.map((rate: Record<string, any>, index: number) => {
                    const { bank, code, buyCash, buyTransfer, sellCash, sellTransfer } = rate;
                    return (
                      <View key={index} style={styles.item}>
                        <Text>
                          {bank} - {code}
                        </Text>
                        <Text>
                          Buy: {buyCash}đ (Cash) - {buyTransfer}đ (Transfer)
                        </Text>
                        <Text>
                          Sell: {sellCash}đ (Cash) - {sellTransfer}đ (Transfer)
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
    padding: 8,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
});
