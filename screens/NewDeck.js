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

import { addDeck, selectDeck } from '../actions';
import { saveDeckTitle } from '../utils/helpers';
import { Entypo } from '@expo/vector-icons';

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
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={{ fontSize: 50, textAlign: 'center', marginBottom: 50 }}>
          Create New Deck
        </Text>
        <View style={[{ flexDirection: 'row' }, styles.input]}>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Deck Title"
            onChangeText={title => this.setState({ title })}
            value={this.state.title}
          />
        </View>
        <TouchableOpacity
          style={[styles.button, { marginBottom: 10 }]}
          onPress={this.addDeck}
        >
          <Text style={{ color: 'white' }}>Submit</Text>
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
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    height: 50,
    padding: 5,
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    marginTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    borderWidth: 1
  }
});

function mapStateToProps({ deck }) {
  return {
    deck
  };
}

export default connect(mapStateToProps)(NewDeck);
