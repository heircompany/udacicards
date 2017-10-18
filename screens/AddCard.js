import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';

import { addCard } from '../actions';
import { addCardToDeck } from '../utils/helpers';

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Card',
    gestureEnabled: true
  });

  state = {
    question: '',
    answer: ''
  };

  addCard = () => {
    const { dispatch, navigation } = this.props;
    const title = this.props.navigation.state.params.title;
    const card = { ...this.state };

    dispatch(addCard(title, card));
    addCardToDeck(title, card)
      .then(() => {
        navigation.state.params.update();
        navigation.goBack();
      })
      .catch(() => console.log('Error adding card to deck'));
  };

  render() {
    const { button, container, input } = styles;

    return (
      <View style={container}>
        <View style={[{ flexDirection: 'row' }, input]}>
          <TextInput
            style={{ flex: 1, fontSize: 20 }}
            placeholder="Question"
            onChangeText={question => this.setState({ question })}
            value={this.state.question}
          />
        </View>
        <View style={[{ flexDirection: 'row' }, input]}>
          <TextInput
            style={{ flex: 1, fontSize: 20 }}
            placeholder="Answer"
            onChangeText={answer => this.setState({ answer })}
            value={this.state.answer}
          />
        </View>
        <TouchableOpacity style={[button]} onPress={this.addCard}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    height: 60,
    padding: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30
  },
  button: {
    marginTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    width: 180
  }
});

export default connect()(AddCard);
