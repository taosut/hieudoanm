/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Text,
  ScrollView,
} from 'react-native';

import { colors } from '../../constant';
import { api } from '../../services';

type Props = {};

type State = {
  loading: boolean;
  companies: Array<any>;
  filterCompanies: Array<any>;
};

export default class Stock extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, companies: [], filterCompanies: [] };

    this.getStockCompanies = this.getStockCompanies.bind(this);
    this.filter = this.filter.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.getStockCompanies();
  }

  filter(query: string) {
    const { companies = [] } = this.state;
    const filterCompanies = companies.filter((company: any) => {
      const { symbol = '' } = company;
      const symbolFlag: boolean = query
        ? symbol.toString().toLowerCase().includes(query.toLowerCase())
        : true;
      return symbolFlag;
    });
    this.setState({ filterCompanies });
  }

  async getStockCompanies() {
    this.setState({ loading: true });
    const companies: Array<Record<string, any>> = await api.getStockCompanies();
    this.setState({ loading: false, companies, filterCompanies: companies });
  }

  render() {
    const { loading = false, filterCompanies = [] } = this.state;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            maxLength={3}
            placeholder="Symbol"
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
              {filterCompanies.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO COMPANIES</Text>
                </View>
              )}
              {filterCompanies.length > 0 && (
                <ScrollView>
                  {filterCompanies.map((company: Record<string, any>, index: number) => {
                    const { symbol, name, group, market, industry, subsector } = company;
                    return (
                      <View key={index} style={styles.item}>
                        <Text>
                          {symbol} - {market} - {group}
                        </Text>
                        <Text>{name}</Text>
                        <Text>
                          {industry} - {subsector}
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
