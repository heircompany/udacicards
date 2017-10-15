import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

class DeckItem extends Component {
  render() {
    return (
      <TouchableOpacity onPress={() => this.props.onPress()}>
        <View
          style={[
            styles.container,
            { borderBottomColor: 'gray', borderBottomWidth: 0.5 }
          ]}
        >
          <Text style={{ fontSize: 20 }}>{this.props.deck.title}</Text>
          <Text stlye={{ fontSize: 10 }}>
            {this.props.deck.questions.length}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default DeckItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderRadius: 16,
    padding: 40,
    // marginLeft:10,
    // marginRight:10,
    marginTop: 17,
    justifyContent: 'center',
    alignItems: 'center'
    // shadowRadius:3,
    // shadowOpacity: 0.8,
    // shadowColor: 'black',
    // shadowOffset:{
    //     width:0,
    //     height:3
    // }
  },
  title: {
    fontSize: 20
  }
});
