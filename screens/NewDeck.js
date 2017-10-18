import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import { addDeck, selectDeck } from '../actions';
import { saveDeckTitle } from '../utils/helpers';

class NewDeck extends Component {
  state = {
    title: ''
  };

  addDeck = () => {
    const { dispatch, navigation } = this.props;
    const { title } = this.state;

    saveDeckTitle(title)
      .then(deck => {
        dispatch(addDeck(deck));
        navigation.navigate('Deck', { title });
      })
      .then(() => this.setState({ title: '' }))
      .catch(e => console.log('Error saving deck: ', e));
  };

  render() {
    const { button, container, input } = styles;

    return (
      <KeyboardAvoidingView behavior="padding" style={container}>
        <Text style={{ fontSize: 40, textAlign: 'center', marginBottom: 40 }}>
          Create New Deck
        </Text>
        <View style={[{ flexDirection: 'row' }, input]}>
          <TextInput
            style={{ flex: 1, fontSize: 20 }}
            placeholder="Deck Title"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
        </View>
        <TouchableOpacity
          style={[button, { marginBottom: 10 }]}
          onPress={this.addDeck}
        >
          <Text style={{ color: 'white', fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  input: {
    height: 60,
    padding: 5,
    marginLeft: 50,
    marginRight: 50
  },
  button: {
    marginTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth: 1
  }
});

function mapStateToProps({ deck }) {
  return {
    deck
  };
}

export default connect(mapStateToProps)(NewDeck);
