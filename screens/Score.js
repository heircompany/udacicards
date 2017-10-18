import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Score extends Component {
  static navigationOptions = {
    headerLeft: null,
    title: 'Score',
    gesturesEnabled: false
  };

  componentDidMount() {
    clearLocalNotification().then(setLocalNotification);
  }

  backToDeck = () => {
    const { state, dispatch } = this.props.navigation;

    dispatch(
      NavigationActions.back({
        key: state.params.key
      })
    );
  };

  restartQuiz = () => {
    const { title } = this.props.deck;

    this.props.navigation.dispatch(
      NavigationActions.reset({
        index: 2,
        actions: [
          NavigationActions.navigate({ routeName: 'Decks' }),
          NavigationActions.navigate({ routeName: 'Deck', params: { title } }),
          NavigationActions.navigate({ routeName: 'Quiz', params: { title } })
        ]
      })
    );
  };

  render() {
    const { button, container, score, title } = styles;

    return (
      <View style={container}>
        <Text style={title}>Your score</Text>
        <Text style={score}>{this.props.navigation.state.params.score}</Text>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={this.restartQuiz}
            style={[button, { borderColor: 'gray' }]}
          >
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              Restart Quiz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.backToDeck}
            style={[button, { backgroundColor: 'black' }]}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
              Back to Deck
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    flex: 1
  },
  score: {
    fontSize: 100,
    flex: 2
  },
  button: {
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderWidth: 1,
    borderRadius: 5,
    width: 180
  }
});

function mapStateToProps(state) {
  const { decks, selectedDeck } = state;

  return {
    deck: decks[selectedDeck]
  };
}

export default connect(mapStateToProps)(Score);
