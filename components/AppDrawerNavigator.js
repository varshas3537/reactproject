import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationScreen from '../screens/NotificationScreen';
import LoginForAdminScreen from '../screens/LoginForAdminScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import {Icon} from 'react-native-elements'
import CustomSideBarMenu from './CustomSideBarMeanu';
import RequestPaintingScreen from '../screens/RequestPaintingScreen';

export const AppDrawerNavigator = createDrawerNavigator({
    Home:{
        screen: RequestPaintingScreen,
        navigationOptions:{
            DrawerIcon: <Icon name = "home" type = "fontawesome5" />
        }
    },
    AdminLogin:{
        screen: LoginForAdminScreen,
        navigationOptions:{
        DrawerIcon: <Icon name = "login" type = "entypo" />
        }
    },
    Notifications:{
        screen: NotificationScreen,
        navigationOptions:{
        DrawerIcon: <Icon name = "bell" type = "fontawesome5" />
        }
    },
    Settings:{
        screen: SettingsScreen,
        navigationOptions:{
        DrawerIcon: <Icon name = "settings" type = "feather" />
        }
    }
},
{
    contentComponent: CustomSideBarMenu
},
{
    initialRouteName: 'name'
}
)