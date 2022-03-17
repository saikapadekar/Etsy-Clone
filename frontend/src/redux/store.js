import React, { Component } from 'react';
import {createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from '@redux-devtools/extension';

import rootReducer from './rootReducer';

const initialState ={}


const middleware = [thunk]

const store = createStore( 
    rootReducer,
    composeWithDevTools(applyMiddleware(logger, thunk))
)

export default store