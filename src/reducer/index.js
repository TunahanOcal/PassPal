import {combineReducers} from 'redux';
import passportReducer from './passports';

const crateReducer = combineReducers({passportReducer});

export default crateReducer;