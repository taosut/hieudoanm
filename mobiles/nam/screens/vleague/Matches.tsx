/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';

import { colors } from '../../constant';
import { api } from '../../services';

type Props = { navigation: any; route: any };

type State = {
  loading: boolean;
  matches: Array<any>;
};

export default class Stock extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, matches: [] };

    this.getVLeagueMatches = this.getVLeagueMatches.bind(this);
  }

  async componentDidMount() {
    const { route = {} } = this.props;
    const { params = {} } = route;
    const { team = '' } = params;
    await this.getVLeagueMatches(team);
  }

  async getVLeagueMatches(team: string) {
    this.setState({ loading: true });
    const matches = await api.getVLeagueMatches(team);
    this.setState({ loading: false, matches });
  }

  render() {
    const { loading = false, matches = [] } = this.state;

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
              {matches.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO MATCHES</Text>
                </View>
              )}
              {matches.length > 0 && (
                <ScrollView>
                  {matches.map((match: Record<string, any>, index: number) => {
                    const {
                      round,
                      dateTime,
                      status,
                      homeTeam,
                      awayTeam,
                      homeScore,
                      awayScore,
                    } = match;
                    return (
                      <View key={index} style={styles.item}>
                        <Text>
                          {round} - {dateTime} ({status})
                        </Text>
                        <Text>
                          {homeTeam}: {homeScore}
                        </Text>
                        <Text>
                          {awayTeam}: {awayScore}
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
    padding: 16,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
  },
});
