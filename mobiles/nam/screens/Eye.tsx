/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet, Button } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

type Props = {};

export default class Eye extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.getPhotos = this.getPhotos.bind(this);
  }

  getPhotos() {
    CameraRoll.getPhotos({ first: 0 });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <Button title="Get Photos" onPress={this.getPhotos} />
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
});
