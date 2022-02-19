import { Route, Routes } from "react-router-dom";
import { TodoDisplay } from "../Todo/TodoDisplay";
import {Todo} from "../Todo/TodoInput"
import { SelectedTodo } from "../Todo/SelectedTodo";
import { EditTodo } from "../Todo/EditTodo";
import { Login } from "../Login/login";
import { Register } from "../Register/Register";

export const DirectRoutes=()=>{
    return (
        <Routes>
            <Route path="/" element={<TodoDisplay />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/add_todo" element={<Todo />}></Route>
            <Route path="/todo/:id" element={<SelectedTodo />}></Route>
            <Route path="/edit_todo/:id" element={<EditTodo />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    )
}