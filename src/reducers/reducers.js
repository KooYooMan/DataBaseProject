import {combineReducers} from 'redux';
import indexStateReducer from './index-state-reducer';

var reducers = combineReducers({
    indexScreen: indexStateReducer
})

export default reducers;