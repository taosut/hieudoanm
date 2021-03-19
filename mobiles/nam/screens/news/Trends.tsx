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
  Button,
} from 'react-native';

import { colors } from '../../constant';
import { api } from '../../services';

type Props = {
  navigation: any;
};

type State = {
  loading: boolean;
  trends: Array<string>;
};

export default class NewsTrends extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, trends: [] };

    this.getNewsTrends = this.getNewsTrends.bind(this);
    this.openBrowser = this.openBrowser.bind(this);
  }

  async componentDidMount(): Promise<void> {
    await this.getNewsTrends();
  }

  async getNewsTrends(): Promise<void> {
    this.setState({ loading: true });
    const trends: Array<string> = await api.getNewsTrends();
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
    const { navigation } = this.props;

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.buttonContainer}>
            <Button title="Go to Articles" onPress={() => navigation.navigate('newsarticles')} />
          </View>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
          {!loading && (
            <View>
              {trends.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO TRENDS</Text>
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
  buttonContainer: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: 8,
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
