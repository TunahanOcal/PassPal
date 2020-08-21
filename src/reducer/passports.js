import {fromJS} from 'immutable';
import {LOAD_PASSPORTS,LOAD_PASSPORTS_ERROR,LOAD_PASSPORTS_SUCCESS, LOAD_RELATIONS, LOAD_RELATIONS_ERROR, LOAD_RELATIONS_SUCCESS} from '../actions/actionTypes';


const initialState = fromJS({
    passportList : [],
    relationList : []

});

function passportReducer(state=initialState,action){

    switch(action.type){
        case LOAD_PASSPORTS:
            return state.merge({
                loading:true,
                error: undefined
            });
        case LOAD_PASSPORTS_ERROR:
            return state.merge({
                loading: false,
                error: action.error
            });
        case LOAD_PASSPORTS_SUCCESS:
            return state.merge({
                loading:false,
                passportList: action.passportList
            });
        case LOAD_RELATIONS:
            return state.merge({
                loading:true,
                countryCode: action.countryCode,
                error: undefined
            });
        case LOAD_RELATIONS_ERROR:
            return state.merge({
                loading: false,
                error: action.error
        });
        case LOAD_RELATIONS_SUCCESS:
            return state.merge({
                loading: false,
                relationList:action.relationList
            });
        default:
            return state;
        
    }
    
}

export default passportReducer;