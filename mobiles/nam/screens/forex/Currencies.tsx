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
  TouchableWithoutFeedback,
} from 'react-native';

import { colors } from '../../constant';
import { api } from '../../services';

type Props = { navigation: any };

type State = {
  loading: boolean;
  currencies: Array<string>;
  filterCurrencies: Array<string>;
};

export default class Forex extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, currencies: [], filterCurrencies: [] };

    this.getBanksForexRates = this.getBanksForexRates.bind(this);
    this.filter = this.filter.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.getBanksForexRates();
  }

  filter(query: string) {
    const { currencies = [] } = this.state;
    const filterCurrencies = currencies.filter((currency: any) => {
      const currencyFlag: boolean = query
        ? currency.toString().toLowerCase().includes(query.toLowerCase())
        : true;
      return currencyFlag;
    });
    this.setState({ filterCurrencies });
  }

  async getBanksForexRates() {
    this.setState({ loading: true });
    const rates: Array<Record<string, any>> = await api.getBanksForexRates();
    const currencies: Array<string> = rates
      .map(rate => rate.code || '')
      .filter(code => code)
      .filter((code: string, index: number, array: Array<string>) => array.indexOf(code) === index)
      .sort();
    this.setState({ loading: false, currencies, filterCurrencies: currencies });
  }

  render() {
    const { loading = false, filterCurrencies = [] } = this.state;
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            maxLength={3}
            placeholder="Currency"
            onChangeText={this.filter}
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
              {filterCurrencies.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO CURRENCIES</Text>
                </View>
              )}
              {filterCurrencies.length > 0 && (
                <ScrollView>
                  {filterCurrencies.map((currency: string, index: number) => {
                    return (
                      <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('forexrates', { currency })}>
                        <View key={index} style={styles.item}>
                          <Text>{currency}</Text>
                        </View>
                      </TouchableWithoutFeedback>
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
