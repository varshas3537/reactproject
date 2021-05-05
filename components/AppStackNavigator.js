import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import RequestPaintingScreen from '../screens/RequestPaintingScreen';
import PaintingDetailsScreen  from '../screens/PaintingDetailsScreen';




export const AppStackNavigator = createStackNavigator({
  BuyPainting : {
    screen : RequestPaintingScreen,
    navigationOptions:{
      headerShown : false
    }
  },
  PaintingDetails : {
    screen : PaintingDetailsScreen,
    navigationOptions:{
      headerShown : false
    }
  }
},
  {
    initialRouteName: 'PaintingBuyList'
  }
);