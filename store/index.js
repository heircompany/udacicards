import { createStore, compose, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../reducers';

/* use redux-persist-migrate if we ever change a piece of state's type (ex: from object to array)*/

// const store = createStore(
//   reducers,
//   {},
//   compose(applyMiddleware(thunk), autoRehydrate())
// );
//
// // set whitelisted content in reducer as in this example
// // switch (action.type) {
// //   case REHYDRATE:
// //     return action.payload.likedJobs || [];
// persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });
//

const store = createStore(reducers);

export default store;
