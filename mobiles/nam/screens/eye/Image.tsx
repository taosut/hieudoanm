/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { SafeAreaView, View, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { colors } from '../../constant';

type Props = {
  route: any;
};

type State = {
  uri: string;
};

export default class EyeImage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = { uri: '' };

    this.setURI = this.setURI.bind(this);
    this.upload = this.upload.bind(this);
  }

  async componentDidMount() {
    const { route = {} } = this.props;
    const { params = {} } = route;
    const { uri = '' } = params;
    this.setURI(uri);
  }

  setURI(uri: string) {
    this.setState({ uri });
  }

  upload() {}

  render() {
    const { uri = '' } = this.state;
    console.log('uri', uri);
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {uri.length > 0 && <Image style={styles.image} source={{ uri }} />}
          </View>
          <View style={styles.footer}>
            <TouchableWithoutFeedback onPress={() => this.upload()}>
              <View style={styles.button}>
                <FontAwesomeIcon icon={faUpload} size={25} />
              </View>
            </TouchableWithoutFeedback>
          </View>
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
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 9,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flex: 1,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
