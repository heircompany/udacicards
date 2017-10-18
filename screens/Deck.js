import React, { Component } from 'react';
import {
  Alert,
  Animated,
  Button,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Notifications, Permissions } from 'expo';

import { getDeck } from '../utils/helpers';

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Deck'
    };
  };

  state = {
    deck: {
      title: '',
      questions: []
    },
    position: new Animated.Value(200)
  };

  componentDidMount() {
    Animated.timing(this.state.position, { toValue: 0, duration: 500 }).start();
    getDeck(this.props.navigation.state.params.title).then(deck => {
      this.setState({ deck });
    });
  }

  refreshOnGoBack() {
    getDeck(this.props.navigation.state.params.title).then(deck => {
      this.setState({ deck });
    });
  }

  addCard = title => {
    this.props.navigation.navigate('AddCard', {
      title,
      update: () => this.refreshOnGoBack()
    });
  };

  startQuiz = title => {
    if (this.state.deck.questions.length > 0) {
      this.props.navigation.navigate('Quiz', { title });
    } else {
      Alert.alert('No Cards', 'Please add a card to start the quiz');
    }
  };

  render() {
    const { title, questions, position } = this.state.deck;
    const {
      addButton,
      button,
      centered,
      container,
      deckTitle,
      startButton,
      subtitle
    } = styles;

    return (
      <Animated.View style={[container, { left: position }]}>
        <View style={[{ flex: 1, padding: 40 }, centered]}>
          <Text style={deckTitle}>{title}</Text>
          <Text style={[subtitle]}>{`${questions.length} cards`}</Text>
        </View>
        <View style={[{ flex: 1 }, centered]}>
          <TouchableOpacity
            style={[button, addButton]}
            onPress={() => this.addCard(title)}
          >
            <Text style={{ textAlign: 'center', fontSize: 20 }}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[button, startButton]}
            onPress={() => this.startQuiz(title)}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  deckTitle: {
    fontSize: 40
  },
  subtitle: {
    fontSize: 30,
    color: 'gray',
    marginTop: 10
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
  },
  addButton: {
    borderColor: 'gray'
  },
  startButton: {
    backgroundColor: 'black'
  }
});

export default connect()(Deck);
