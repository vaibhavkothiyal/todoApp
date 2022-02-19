import './TodoInput.css'
import { useEffect, useState } from "react"
import { addTodoLoading, addTodoSuccess, addTodoError } from "../../features/todos/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Todo = () => {

    const [userData, setData] = useState(null);
    const url = "http://localhost:3004/list";
    const dispatch = useDispatch();
    const [todoAdded, setTodoAdded] = useState(false);

    const { loading, token, error, email } = useSelector((state) => {
        return {
            loading: state.login.loading,
            token: state.login.token,
            error: state.login.error,
            email: state.login.email,
        }
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) navigate("/login")
    })

    const handleInp = (e) => {
        const { name, value } = e.target;
        setData({
            ...userData, [name]: value, status: "Incomplete",
        });
    }

    const handleSubmit = () => {
        dispatch((addTodoLoading()))
        fetch(`/todo/${email}`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData),
        }).then(res => res.json())
            .then((res) => {
                setTimeout(()=>{
                    document.getElementById("inp_task_title").value="";
                    document.getElementById("inp_task_desc").value="";
                    setTodoAdded(true);
                },2000)
                setTimeout(()=>{
                    setTodoAdded(false);
                },5000)
            })
            .catch((err) => { dispatch((addTodoError(err))) })
    }

    const debounce = (fun, d) => {
        let timer;
        return function (...argu) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fun(...argu);
            }, d)
        }
    }

    return <>
        <div className="task-input-container">
            <input id='inp_task_title' className='task-title' onChange={handleInp} type="text" name="title" placeholder="enter task" />
            <textarea className='task-desc' onChange={handleInp} name="description" id="inp_task_desc" cols="30" rows="20" placeholder="enter description"></textarea>
            <button className='add-todo-btn' onClick={debounce(handleSubmit,2000)}>Add Todo</button>
        </div>
        {todoAdded ?
            <div className='todo-add-success-container'>
                <span className='todo-add-success'>
                    Task added succesfully
                </span>
            </div> : null
        }
    </>
}