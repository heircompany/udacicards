import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { receiveDecks, selectDeck } from '../actions';
import DeckItem from '../components/DeckItem';
import { getDecks } from '../utils/helpers';

class DeckList extends Component {
  static navigationOptions = {
    tabBarLabel: 'Decks'
  };

  componentDidMount() {
    const { dispatch } = this.props;

    getDecks()
      .then(decks => dispatch(receiveDecks(decks)))
      .catch(() => console.log('Error fetching decks.'));
  }

  selectDeck = ({ title }) => {
    const { dispatch, navigation } = this.props;

    dispatch(selectDeck(title));
    navigation.navigate('Deck', { title });
  };

  render() {
    const { decks } = this.props;
    const { container, centered } = styles;

    return (
      <View style={container}>
        {decks === null ? (
          <View style={centered}>
            <Text style={{ fontSize: 50 }}>No Decks Available</Text>
          </View>
        ) : (
          <FlatList
            data={Object.keys(decks).map(deck => {
              return { ...decks[deck] };
            })}
            renderItem={({ item }) => (
              <DeckItem
                key={item.title}
                deck={item}
                onPress={() => this.selectDeck(item)}
              />
            )}
            keyExtractor={(item, index) => index}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

function mapStateToProps({ decks }) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(DeckList);
