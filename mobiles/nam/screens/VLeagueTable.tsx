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
  table: Array<any>;
};

export default class VLeagueTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, table: [] };

    this.getVLeagueTable = this.getVLeagueTable.bind(this);
  }

  async componentDidMount() {
    await this.getVLeagueTable();
  }

  async getVLeagueTable() {
    this.setState({ loading: true });
    const table = await api.getVLeagueTable();
    this.setState({ loading: false, table });
  }

  render() {
    const { loading = false, table = [] } = this.state;

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
              {table.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO LICENSE PLATES</Text>
                </View>
              )}
              {table.length > 0 && (
                <ScrollView>
                  {table.map((item: Record<string, any>, index: number) => {
                    const { name, rank, point, played, win, draw, lost } = item;
                    return (
                      <View key={index} style={styles.item}>
                        <Text>
                          {rank} - {name} - Point: {point}
                        </Text>
                        <Text>
                          Played: {played} (W{win} - D{draw} - L{lost})
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
