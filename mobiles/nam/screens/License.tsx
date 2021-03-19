/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../constant';
import { api } from '../services';

type Props = {};

type State = {
  loading: boolean;
  licensePlates: Array<any>;
  filterLicensePlates: Array<any>;
};

export default class License extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, licensePlates: [], filterLicensePlates: [] };

    this.getLicensePlates = this.getLicensePlates.bind(this);
    this.filter = this.filter.bind(this);
  }

  async componentDidMount() {
    await this.getLicensePlates();
  }

  filter(query: string) {
    const { licensePlates = [] } = this.state;
    const filterLicensePlates = licensePlates.filter((plate: any) => {
      const { license = '' } = plate;
      const flag: boolean = query
        ? license.toString().toLowerCase().includes(query.toLowerCase())
        : true;
      return flag;
    });
    this.setState({ filterLicensePlates });
  }

  async getLicensePlates() {
    this.setState({ loading: true });
    const licensePlates = await api.getLicensePlates();
    this.setState({ loading: false, licensePlates, filterLicensePlates: licensePlates });
  }

  render() {
    const { loading = false, filterLicensePlates = [] } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            maxLength={2}
            placeholder="License"
            onChangeText={this.filter}
            editable
          />
        </View>
        <View style={styles.listContainer}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
          {!loading && (
            <View>
              {filterLicensePlates.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO LICENSE PLATES</Text>
                </View>
              )}
              {filterLicensePlates.length > 0 && (
                <ScrollView>
                  {filterLicensePlates.map((plate, index) => {
                    const { license = '', definition = '', type = '' } = plate;
                    return (
                      <View key={index} style={styles.item}>
                        <Text>
                          {license} - {definition}
                        </Text>
                        <Text>{type}</Text>
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
    backgroundColor: colors.white,
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
  listContainer: {
    backgroundColor: colors.white,
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
