import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class DeckItem extends Component {
  render() {
    const { questions, title } = this.props.deck;
    const { container } = styles;

    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View
          style={[
            container,
            { borderBottomColor: 'gray', borderBottomWidth: 0.5 }
          ]}
        >
          <Text style={{ fontSize: 30 }}>{title}</Text>
          <Text style={{ fontSize: 20 }}>{questions.length} Questions</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  title: {
    fontSize: 20
  }
});

export default DeckItem;
