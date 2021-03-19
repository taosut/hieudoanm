/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Linking,
  Alert,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';

import { colors } from '../../constant';
import { api } from '../../services';

type Props = {};

type State = {
  loading: boolean;
  articles: Array<any>;
};

export default class NewsArticles extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, articles: [] };

    this.getNewsTrends = this.getNewsTrends.bind(this);
    this.openBrowser = this.openBrowser.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.getNewsTrends();
  }

  async getNewsTrends(): Promise<void> {
    this.setState({ loading: true });
    const articles: Array<any> = await api.getNewsArticles();
    // await storage.setObject('trends', trends);
    this.setState({ loading: false, articles });
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
    const { loading = false, articles = [] } = this.state;

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
              {articles.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO ARTICLES</Text>
                </View>
              )}
              {articles.length > 0 && (
                <ScrollView>
                  {articles.map((article: Record<string, any>, index: number) => {
                    const { title, url, source } = article;
                    return (
                      <View key={index} style={styles.item}>
                        <TouchableWithoutFeedback onPress={() => this.openBrowser(url)}>
                          <Text style={styles.title}>{title}</Text>
                        </TouchableWithoutFeedback>
                        <Text style={styles.source}>{source}</Text>
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
  title: { color: colors.dark, marginBottom: 8 },
  source: { color: colors.gray },
});
