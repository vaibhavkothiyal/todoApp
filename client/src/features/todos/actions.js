import {ADD_TODO_SUCCESS, ADD_TODO_LOADING,ADD_TODO_ERROR, GET_TODO_LOADING, GET_TODO_SUCCESS, GET_TODO_ERROR,UPDATE_TODO_LOADING, UPDATE_TODO_SUCCESS, UPDATE_TODO_ERROR, DELETE_TODO_LOADING, DELETE_TODO_SUCCESS, DELETE_TODO_ERROR, USER_TODO} from './actionTypes'

export const addTodoLoading=()=>{
    return {
        type:ADD_TODO_LOADING
    }
}
export const addTodoSuccess=(data)=>{
    return {
        type:ADD_TODO_SUCCESS,
        payload:data
    }
}
export const addTodoError=(err)=>{
    return {
        type:ADD_TODO_ERROR
    }
}



export const getTodoLoading=()=>{
    return {
        type:GET_TODO_LOADING
    }
}
export const getTodoSuccess=(data)=>{
    return {
        type:GET_TODO_SUCCESS,
        payload:data
    }
}
export const getTodoError=()=>{
    return {
        type:GET_TODO_ERROR
    }
}


export const updateTodoLoading=()=>{
    return {
        type:UPDATE_TODO_LOADING
    }
}
export const updateTodoSuccess=(data)=>{
    console.log("here in update")
    return {
        type:UPDATE_TODO_SUCCESS,
        payload:data
    }
}
export const updateTodoError=(err)=>{
    return {
        type:UPDATE_TODO_ERROR
    }
}


export const deleteTodoLoading=()=>{
    return {
        type:DELETE_TODO_LOADING
    }
}
export const deleteTodoSuccess=()=>{
    console.log("here in DELETE")
    return {
        type:DELETE_TODO_SUCCESS,
    }
}
export const deleteTodoError=(err)=>{
    return {
        type:DELETE_TODO_ERROR
    }
}

export const userTodo=(data)=>{
    return{
        type:USER_TODO,
        payload:data
    }
}
