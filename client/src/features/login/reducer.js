import { LOGIN_LOADING, LOGIN_SUCCES, LOGIN_ERROR, LOGOUT_SUCCESS, USER_TODO } from "./actionTypes";

const initialState = {
    loading: false,
    token: "",
    error: false,
    email: ""
};

let tokenIs = localStorage.getItem('userToken');
if (tokenIs) {
    let data = JSON.parse(tokenIs);
    initialState.token = data.token
    initialState.email = data.email
}


export const loginReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN_LOADING:
            return {
                ...state,
                loading: true
            }

        case LOGIN_SUCCES:
            localStorage.setItem('userToken',JSON.stringify(action.payload))
            return {
                ...state,
                token: action.payload.token,
                email: action.payload.email,
                loading: false
            }

        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }


        case LOGOUT_SUCCESS:
            return {
                ...state,
                token: ""
            }


        default:
            return state;
    }
}