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
import { getDeck } from '../utils/helpers';
import { Notifications, Permissions } from 'expo';

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

    return (
      <Animated.View style={[styles.container, { left: position }]}>
        <View style={[{ flex: 1, padding: 40 }, styles.center]}>
          <Text style={styles.title}>{title}</Text>
          <Text style={[styles.subtitle]}>{`${questions.length} cards`}</Text>
        </View>
        <View style={[{ flex: 1 }, styles.centered]}>
          <TouchableOpacity
            style={[styles.btn, styles.addBtn]}
            onPress={() => this.addCard(title)}
          >
            <Text style={{ textAlign: 'center' }}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.startBtn]}
            onPress={() => this.startQuiz(title)}
          >
            <Text style={{ color: 'white', textAlign: 'center' }}>
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
  title: {
    fontSize: 40
  },
  subtitle: {
    fontSize: 20,
    color: 'gray',
    marginTop: 10
  },
  btn: {
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
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

export default connect()(Deck);
