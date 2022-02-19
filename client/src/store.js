import { createStore, combineReducers } from "redux";
import { todoReducer } from "./features/todos/reduces";
import { loginReducer } from "./features/login/reducer";

const rootReducer=combineReducers({
    todo:todoReducer,
    login:loginReducer
});

export const store=createStore(rootReducer);
// console.log(store.getState())