import { AppDrawerNavigator } from './components/AppDrawerNavigator'
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import RequestPaintingScreen from './screens/RequestPaintingScreen';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default function App() {
  return (
   <AppContainer/>
   
    
  );
}

const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  BuyPaintings:{screen: RequestPaintingScreen},
})


const AppContainer = createAppContainer(switchNavigator);


