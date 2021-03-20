/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRandom, faCamera } from '@fortawesome/free-solid-svg-icons';

type Props = {
  navigation: any;
};

type State = {
  cameraType: 'back' | 'front' | undefined;
};

export default class Camera extends React.Component<Props, State> {
  private camera: any;

  constructor(props: Props) {
    super(props);

    this.state = { cameraType: 'back' };

    this.switchCamera = this.switchCamera.bind(this);
    this.takePicture = this.takePicture.bind(this);
  }

  switchCamera() {
    const { cameraType = 'back' } = this.state;
    const newCameraType = cameraType === 'back' ? 'front' : 'back';
    Alert.alert(`Switch to ${newCameraType}`);
    this.setState({ cameraType: newCameraType });
  }

  async takePicture(): Promise<void> {
    const { navigation } = this.props;
    const options = { quality: 10, base64: true, doNotSave: false, exif: true };
    const data = await this.camera.takePictureAsync(options);
    const { uri = '', exif } = data;
    console.log('takePictureAsync uri', uri);
    console.log('takePictureAsync exif', exif);
    navigation.navigate('eyeimage', { uri });
  }

  render() {
    const { cameraType } = this.state;
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.cameraContainer}>
            <RNCamera
              style={styles.camera}
              ref={(camera: any) => {
                this.camera = camera;
              }}
              type={cameraType}
            />
          </View>
          <View style={styles.footer}>
            <TouchableWithoutFeedback onPress={() => this.switchCamera()}>
              <View style={styles.button}>
                <FontAwesomeIcon icon={faRandom} size={25} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={async () => await this.takePicture()}>
              <View style={styles.button}>
                <FontAwesomeIcon icon={faCamera} size={25} />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.button}>
              <Text>Button</Text>
            </View>
          </View>
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
  cameraContainer: {
    flex: 9,
  },
  camera: {
    flex: 1,
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
