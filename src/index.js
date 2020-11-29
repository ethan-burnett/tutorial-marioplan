import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider, useSelector } from 'react-redux'
import thunk from "redux-thunk";
import {createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import firebase from 'firebase/app'
import fbConfig from './config/fbConfig'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig)
  )
);

const rrfConfig = {
  enableLogging: false,
  userProfile: 'users', // root that user profiles are written to
  updateProfileOnLogin: false, // enable/disable updating of profile on login
  useFirestoreForProfile: true, // Save profile to Firestore instead of Real Time Database
  useFirestoreForStorageMeta: true // Metadata associated with storage file uploads goes to Firestore
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  presence: 'presence', // where list of online users is stored in database
  sessions: 'sessions',
};

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth);
  if (!isLoaded(auth)) return <div>Loading Screen...</div>;
  return children
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded><App /></AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'));