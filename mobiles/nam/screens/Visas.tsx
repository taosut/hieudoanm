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
  visas: Array<any>;
  filterVisas: Array<any>;
};

export default class Stock extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { loading: false, visas: [], filterVisas: [] };

    this.getVisas = this.getVisas.bind(this);
    this.filter = this.filter.bind(this);
  }

  async componentDidMount() {
    await this.getVisas();
  }

  filter(query: string) {
    const { visas = [] } = this.state;
    const filterVisas = visas.filter((visa: any) => {
      const { country = '', requirement } = visa;
      const countryFlag: boolean = query
        ? country.toString().toLowerCase().includes(query.toLowerCase())
        : true;
      const requirementFlag: boolean = query
        ? requirement.toString().toLowerCase().includes(query.toLowerCase())
        : true;
      return countryFlag || requirementFlag;
    });
    this.setState({ filterVisas });
  }

  async getVisas() {
    this.setState({ loading: true });
    const visas = await api.getVisas();
    this.setState({ loading: false, visas, filterVisas: visas });
  }

  render() {
    const { loading = false, filterVisas = [] } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Query" onChangeText={this.filter} editable />
        </View>
        <View style={styles.listContainer}>
          {loading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator />
            </View>
          )}
          {!loading && (
            <View>
              {filterVisas.length === 0 && (
                <View style={styles.noResults}>
                  <Text style={styles.noResultsText}>NO RESULTS</Text>
                </View>
              )}
              {filterVisas.length > 0 && (
                <ScrollView>
                  {filterVisas.map((visa, index) => {
                    const { country = '', requirement = '' } = visa;
                    return (
                      <View key={index} style={styles.item}>
                        <Text>{country}</Text>
                        <Text>{requirement}</Text>
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
