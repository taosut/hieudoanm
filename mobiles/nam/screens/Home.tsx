import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faDollarSign,
  faChartLine,
  faCar,
  faCalendar,
  faFutbol,
  faNewspaper,
  faCloudSunRain,
  faPassport,
} from '@fortawesome/free-solid-svg-icons';

type Props = {
  navigation: any;
};

export default class Home extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    const rows = [
      [
        { icon: faCalendar, screen: 'calendar', text: 'Calendar' },
        { icon: faEye, screen: 'eye', text: 'Eye' },
        { icon: faDollarSign, screen: 'forex', text: 'Forex' },
      ],
      [
        { icon: faCar, screen: 'license', text: 'License' },
        { icon: faNewspaper, screen: 'news', text: 'News' },
        { icon: faChartLine, screen: 'stock', text: 'Stock' },
      ],
      [
        { icon: faPassport, screen: 'visas', text: 'Visas' },
        { icon: faFutbol, screen: 'vleaguetable', text: 'VLeague' },
        { icon: faCloudSunRain, screen: 'weather', text: 'Weather' },
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
                          <View style={styles.button}>
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
  button: {
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
