import {
    LOAD_PASSPORTS,
    LOAD_PASSPORTS_ERROR,
    LOAD_PASSPORTS_SUCCESS,
    LOAD_RELATIONS,
    LOAD_RELATIONS_SUCCESS,
    LOAD_RELATIONS_ERROR
} 
from './actionTypes';

export function loadPassports(){
    return{
        type:LOAD_PASSPORTS
    }
}

export function loadPassportsSuccess(passportList){
    return{
        type:LOAD_PASSPORTS_SUCCESS,
        passportList
    }
}

export function loadPassportsError(error){
    return{
        type:LOAD_PASSPORTS_ERROR,
        error

    }
}

export function loadRelations(countryCode){
    return{
        type: LOAD_RELATIONS,
        countryCode
    }
}

export function loadRelationsSuccess(relationList){
    return{
        type: LOAD_RELATIONS_SUCCESS,
        relationList
    }
}

export function loadRelationsError(error){
    return{
        type: LOAD_RELATIONS_ERROR,
        error
    }
}


