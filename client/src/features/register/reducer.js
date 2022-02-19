import {REGISTER_ERROR,REGISTER_LOADING,REGISTER_SUCCESS} from './actionTypes'

const initialState={
    loading:false,
    token:"",
    error:false
}


export const RegisterReduceer=(state=initialState,action)=>{
    switch (action.type){

        case REGISTER_LOADING:
            return {
                ...state,
                loading:true
            }

        case REGISTER_SUCCESS:
            if(action.payload.token)
                localStorage.setItem('userToken', JSON.stringify(action.payload.token))
            return {
                ...state,
                token: action.payload.token,
                loading: false
            } 

            case REGISTER_ERROR:
            return {
                ...state,
                loading:false,
                error:true
            }
    }
}