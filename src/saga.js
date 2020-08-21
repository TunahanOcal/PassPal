import {call,put,takeLatest} from 'redux-saga/effects';
import {LOAD_PASSPORTS, LOAD_RELATIONS} from './actions/actionTypes';
import {loadPassportsSuccess,loadPassportsError, loadRelationsError,loadRelationsSuccess} from './actions/passports';
import {LOAD_PASSPORTS_URL,LOAD_RELATIONS_URL} from './path';

export function* loadPassportsHandler(){
    try {
        const response = yield call(fetch,LOAD_PASSPORTS_URL,{});
        console.log(response);
        if(response.status !== 200){
            yield put(loadPassportsError("An error occured"));
        }else{
            let responseJson = yield call((r) => r.json(), response);
            yield put(loadPassportsSuccess(responseJson));
        }

    } catch (error) {
        yield put(loadPassportsError('An error occured'));      
    }
}

export function* loadRelationsHandler(action){
    try {
        const countryCode= action.countryCode;
        const response = yield call(fetch,LOAD_RELATIONS_URL+"/"+countryCode,{});
        if(response.status !== 200){
            yield put(loadRelationsError("An error occured"));
        }else{
            let responseJson = yield call((r) => r.json(), response);
            yield put(loadRelationsSuccess(responseJson));
        }
        
    } catch (error) {
        yield put(loadRelationsError('An error occured')); 
    }
}

export default function* sagaHandler(){
    yield takeLatest (LOAD_PASSPORTS,loadPassportsHandler)
    yield takeLatest (LOAD_RELATIONS,loadRelationsHandler)
}