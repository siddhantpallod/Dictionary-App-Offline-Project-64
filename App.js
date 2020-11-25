import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen'
import {createAppContainer , createSwitchNavigator} from 'react-navigation'

export default function App() {
  return (
    <View>
      <AppContainer/>
    </View>
  );
}

var AppNavigator = createSwitchNavigator({
  HomeScreen : HomeScreen
})

const AppContainer = createAppContainer(AppNavigator)


