/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

export default class Calendar extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container} />
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
});
