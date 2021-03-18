import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faDollarSign, faChartLine, faCar } from '@fortawesome/free-solid-svg-icons';

type Props = {
  navigation: any;
};

export default class Home extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const rows = [
      [
        { icon: faEye, screen: 'eye', text: 'Eye' },
        { icon: faCar, screen: 'license', text: 'License' },
      ],
      [
        { icon: faDollarSign, screen: 'forex', text: 'Forex' },
        { icon: faChartLine, screen: 'stock', text: 'Stock' },
      ],
    ];

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.column}>
            {rows.map((apps: Array<any>, rowIndex: number) => {
              return (
                <View key={rowIndex} style={styles.row}>
                  {apps.map((app, index: number) => {
                    const { icon, screen, text } = app;
                    return (
                      <View key={index} style={styles.cell}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate(screen)}>
                          <View>
                            <FontAwesomeIcon style={styles.icon} icon={icon} size={50} />
                            <Text style={styles.text}>{text}</Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    );
                  })}
                </View>
              );
            })}
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
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: '#343a40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});
