/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';

import { colors } from '../constant';
import { api } from '../services';

type Props = {};

type State = {
  loading: boolean;
  companies: Array<any>;
};

export default class Stock extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, companies: [] };

    this.getStockCompanies = this.getStockCompanies.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.getStockCompanies();
  }

  async getStockCompanies() {
    this.setState({ loading: true });
    const companies: Array<Record<string, any>> = await api.getStockCompanies();
    this.setState({ loading: false, companies });
  }

  render() {
    const { loading = false, companies = [] } = this.state;

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
              {companies.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO LICENSE PLATES</Text>
                </View>
              )}
              {companies.length > 0 && (
                <ScrollView>
                  {companies.map((company: Record<string, any>, index: number) => {
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
