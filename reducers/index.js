import { RECEIVE_DECKS, ADD_DECK, ADD_CARD, SELECT_DECK } from '../actions';

const initialState = {
  decks: null,
  selectedDeck: ''
};

function Deck(state = initialState, action) {
  switch (action.type) {
    case SELECT_DECK:
      return {
        ...state,
        selectedDeck: action.deck
      };
    case ADD_CARD:
      return {
        ...state,
        decks: {
          ...state.decks,
          [action.deck]: {
            ...state.decks[action.deck],
            questions: [...state.decks[action.deck].questions, action.card]
          }
        }
      };
    case ADD_DECK:
      return {
        ...state,
        decks: {
          ...state.decks,
          ...action.deck
        }
      };
    case RECEIVE_DECKS:
      return {
        ...state,
        decks: action.decks
      };
    default:
      return state;
  }
}

export default Deck;
