import * as types from '../actions/action-types';
import {Map} from 'immutable';

const initialState = Map({
    screen: 0
});

const indexStateReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.INDEX_HOME_SCREEN:
            return state.set('screen', 0);
        case types.INDEX_STUDENT_SCREEN:
            return state.set('screen', 1);
        case types.INDEX_LECTURER_SCREEN: 
            return state.set('screen', 2);
        case types.INDEX_STUDENTID_SCREEN:
            return state.set('screen', 3);
        default:
    }
    return state;
}

export default indexStateReducer;