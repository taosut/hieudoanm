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
  ScrollView,
  Text,
  TextInput,
} from 'react-native';

import { colors } from '../../constant';
import { api, utils } from '../../services';

type Props = { route: any };

type State = {
  loading: boolean;
  rates: Array<any>;
  filterRates: Array<any>;
};

export default class Forex extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, rates: [], filterRates: [] };

    this.getBanksForexRates = this.getBanksForexRates.bind(this);
    this.filter = this.filter.bind(this);
  }

  async componentDidMount(): Promise<void> {
    const { route = {} } = this.props;
    const { params = {} } = route;
    const { currency = '' } = params;
    await this.getBanksForexRates(currency);
  }

  filter(query: string) {
    const { rates = [] } = this.state;
    const filterRates = rates.filter((rate: any) => {
      const { bank = '' } = rate;
      const bankFlag: boolean = query
        ? bank.toString().toLowerCase().includes(query.toLowerCase())
        : true;
      return bankFlag;
    });
    this.setState({ filterRates });
  }

  async getBanksForexRates(currency: string) {
    this.setState({ loading: true });
    const rates: Array<Record<string, any>> = await api.getBanksForexRates(currency);
    this.setState({ loading: false, rates, filterRates: rates });
  }

  render() {
    const { loading = false, filterRates = [] } = this.state;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Bank"
            onChangeText={this.filter}
            placeholderTextColor={colors.gray}
            editable
          />
        </View>
        <View style={styles.container}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
          {!loading && (
            <View>
              {filterRates.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO FOREX RATES</Text>
                </View>
              )}
              {filterRates.length > 0 && (
                <ScrollView>
                  {filterRates.map((rate: Record<string, any>, index: number) => {
                    const { bank, code, buyCash, buyTransfer, sellCash, sellTransfer } = rate;
                    return (
                      <View key={index} style={styles.item}>
                        <Text>
                          {utils.addZero(index + 1)} - {bank} - {code}
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
  inputContainer: {
    borderBottomColor: colors.border,
    borderBottomWidth: 0.5,
    backgroundColor: colors.white,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: colors.white,
    width: '100%',
    height: 32,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    paddingLeft: 8,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  selectContainer: {
    padding: 16,
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
