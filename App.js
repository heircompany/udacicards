import React, { Component } from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import Deck from './screens/Deck';
import DeckList from './screens/DeckList';
import NewDeck from './screens/NewDeck';
import AddCard from './screens/AddCard';
import Score from './screens/Score';
import StartQuiz from './screens/StartQuiz';

import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { Constants } from 'expo';
import { red, white } from './styles/colors';
import { setLocalNotification } from './utils/helpers';

import store from './store';

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <MaterialCommunityIcons name="cards" style={{ fontSize: 30 }} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? red : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : red,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Decks: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: StartQuiz
  },
  Score: {
    screen: Score
  }
});

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={red} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
