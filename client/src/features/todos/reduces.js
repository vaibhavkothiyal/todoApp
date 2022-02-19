import { ADD_TODO_LOADING, ADD_TODO_SUCCESS, ADD_TODO_ERROR, GET_TODO_LOADING, GET_TODO_SUCCESS, GET_TODO_ERROR, UPDATE_TODO_LOADING, UPDATE_TODO_SUCCESS, UPDATE_TODO_ERROR, DELETE_TODO_LOADING, DELETE_TODO_SUCCESS, DELETE_TODO_ERROR,USER_TODO} from "./actionTypes";

const initialState = {
    loading: false,
    list: [],
    error: false,
};

export const todoReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_TODO_LOADING:
            return {
                ...state,
                loading: true
            }

        case ADD_TODO_SUCCESS:
            return {
                ...state,
                list: [
                    ...state.list, action.payload
                ],
                loading: false
            }

        case ADD_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }



        case GET_TODO_LOADING:
            return {
                ...state,
                loading: true
            }

        case GET_TODO_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false
            }

        case GET_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }



        case UPDATE_TODO_LOADING:
            return {
                ...state,
                loading: true
            }

        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                list: action.payload,
                loading: false
            }

        case UPDATE_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }


        case DELETE_TODO_LOADING:
            return {
                ...state,
                loading: true
            }

        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                // list: action.payload,
                loading: false
            }

        case DELETE_TODO_ERROR:
            return {
                ...state,
                loading: false,
                error: true
            }

        case USER_TODO:
            return {
                ...state,
                list: action.payload,
            }
        default:
            return state;
    }
}