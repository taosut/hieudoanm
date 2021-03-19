/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  Linking,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';

import { colors } from '../constant';
import { api } from '../services';

type Props = {};

type State = {
  loading: boolean;
  trends: Array<string>;
};

export default class News extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, trends: [] };

    this.getGoogleTrends = this.getGoogleTrends.bind(this);
    this.openBrowser = this.openBrowser.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.getGoogleTrends();
  }

  async getGoogleTrends(): Promise<void> {
    this.setState({ loading: true });
    const trends: Array<string> = await api.getGoogleTrends();
    // await storage.setObject('trends', trends);
    this.setState({ loading: false, trends });
  }

  async openBrowser(url: string): Promise<void> {
    const supported: boolean = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }

  render() {
    const { loading = false, trends = [] } = this.state;
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
              {trends.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO LICENSE PLATES</Text>
                </View>
              )}
              {trends.length > 0 && (
                <ScrollView>
                  {trends.map((trend: string, index: number) => {
                    const url: string = `https://www.google.com/search?q=${encodeURI(trend)}`;
                    return (
                      <View key={index} style={styles.item}>
                        <TouchableWithoutFeedback onPress={() => this.openBrowser(url)}>
                          <Text>{trend}</Text>
                        </TouchableWithoutFeedback>
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
