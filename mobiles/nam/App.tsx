/**
 * @format
 * @flow strict-local
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Eye, Forex, Home, License, Stock } from './screens';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen name="home" options={{ title: 'NAM' }}>
            {props => <Home {...props} />}
          </Stack.Screen>
          <Stack.Screen name="license" options={{ title: 'LICENSE' }}>
            {props => <License {...props} />}
          </Stack.Screen>
          <Stack.Screen name="eye" options={{ title: 'EYE' }}>
            {props => <Eye {...props} />}
          </Stack.Screen>
          <Stack.Screen name="forex" options={{ title: 'FOREX' }}>
            {props => <Forex {...props} />}
          </Stack.Screen>
          <Stack.Screen name="stock" options={{ title: 'STOCK' }}>
            {props => <Stock {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
