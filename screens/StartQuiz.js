import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated
} from 'react-native';
import { connect } from 'react-redux';
import { getDeck } from '../utils/helpers';

class StartQuiz extends Component {
  static navigationOptions = {
    title: 'Quiz'
  };

  state = {
    animatedValue: new Animated.Value(0),
    opacity: new Animated.Value(0),
    questionIndex: 0,
    score: 0,
    key: this.props.navigation.state.key,
    questions: []
  };

  componentDidMount() {
    getDeck(this.props.navigation.state.params.title)
      .then(deck => {
        this.setState({ questions: deck.questions });
      })
      .catch(e => {
        console.log('Error fetching questions.');
      });
  }

  flipCard = () => {
    Animated.spring(this.state.animatedValue, {
      toValue: 180,
      friction: 8,
      tension: 3
    }).start();
  };

  correct = () => {
    const score = this.state.score + 1;
    const currentIndex = this.state.questionIndex + 1;
    this.state.animatedValue.setValue(0);
    this.state.opacity.setValue(0);
    if (currentIndex === this.state.questions.length) {
      this.props.navigation.navigate('Score', { score, key: this.state.key });
      return;
    }

    this.setState({
      questionIndex: currentIndex,
      score
    });
  };

  incorrect = () => {
    const currentIndex = this.state.questionIndex + 1;
    this.state.animatedValue.setValue(0);
    this.state.opacity.setValue(0);
    if (currentIndex === this.state.questions.length) {
      this.props.navigation.navigate('Score', {
        score: this.state.score,
        key: this.state.key
      });
      return;
    }
    this.setState({
      questionIndex: currentIndex
    });
  };

  render() {
    const { questions, questionIndex, animatedValue } = this.state;

    const { question, answer } =
      questions.length > 0 ? questions[questionIndex] : {};

    const frontInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    });

    const backInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    });

    const frontOpacity = animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    });

    const backOpacity = animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    });

    return (
      <View style={styles.container}>
        <View style={styles.counter}>
          <Text style={{ fontSize: 20 }}>{`${questionIndex +
            1}/${questions.length}`}</Text>
        </View>
        <View style={styles.details}>
          <View
            style={[
              styles.container,
              { justifyContent: 'center', alignItems: 'center' }
            ]}
          >
            <Animated.View style={{ alignItems: 'center' }}>
              <View>
                <Animated.View
                  style={[
                    styles.flipCard,
                    {
                      transform: [{ rotateY: frontInterpolate }],
                      opacity: frontOpacity
                    }
                  ]}
                >
                  <Text style={styles.title}>
                    {`${question ? question : ''}?`}
                  </Text>
                  <Text style={styles.subtitle}>Question</Text>
                </Animated.View>
              </View>

              <View>
                <Animated.View
                  style={[
                    {
                      transform: [{ rotateY: backInterpolate }],
                      opacity: backOpacity
                    },
                    styles.flipCard,
                    styles.flipCardBack
                  ]}
                >
                  <Text style={styles.title}>{answer ? answer : ''}</Text>
                  <Text style={styles.subtitle}>Answer</Text>
                </Animated.View>
              </View>
            </Animated.View>
          </View>
          <TouchableOpacity onPress={this.flipCard}>
            <Text>Show Answer</Text>
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.container,
            { justifyContent: 'center', alignItems: 'center' }
          ]}
        >
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: 'green' }]}
            onPress={this.correct}
          >
            <Text style={styles.text}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: 'red' }]}
            onPress={this.incorrect}
          >
            <Text style={styles.text}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  counter: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    padding: 5
  },
  details: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btn: {
    marginBottom: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 5,
    width: 180
  },
  text: {
    color: 'white',
    textAlign: 'center'
  },
  flipCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden'
  },
  title: {
    fontSize: 40,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 20,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 10
  }
});

export default StartQuiz;
