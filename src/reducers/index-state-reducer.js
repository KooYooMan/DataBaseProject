import * as types from '../actions/action-types';

const initialState = 0;

const indexStateReducer = function(state = initialState, action) {
    switch(action.type) {
        case types.INDEX_HOME_SCREEN:
            return 0;
        case types.INDEX_STUDENT_SCREEN:
            return 1;
        case types.INDEX_LECTURER_SCREEN: 
            return 2;
        default:
    }

    return state;
}

export default indexStateReducer;