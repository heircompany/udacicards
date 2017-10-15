import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
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
    this.props.navigation.dispatch(
      NavigationActions.back({
        key: this.props.navigation.state.params.key
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
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Your score</Text>
        <Text style={styles.score}>
          {this.props.navigation.state.params.score}
        </Text>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={this.restartQuiz}
            style={[styles.btn, { borderColor: 'gray' }]}
          >
            <Text style={{ textAlign: 'center' }}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.backToDeck}
            style={[styles.btn, { backgroundColor: 'black' }]}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
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
  btn: {
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    width: 180
  },
  addBtn: {
    borderColor: 'gray'
  },
  startBtn: {
    backgroundColor: 'black'
  }
});

function mapStateToProps(state) {
  const { decks, selectedDeck } = state;
  return {
    deck: decks[selectedDeck]
  };
}

export default connect(mapStateToProps)(Score);
