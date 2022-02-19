import './SelectedTodo.css'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateTodoLoading, updateTodoSuccess, updateTodoError, deleteTodoLoading, deleteTodoSuccess, deleteTodoError } from '../../features/todos/actions';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa'

export const SelectedTodo = () => {
    const { id } = useParams();
    const [selTodo, setSelTodo] = useState(null);
    const [currStatus, setCurrStatus] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token, email } = useSelector((state) => {
        return {
            token: state.login.token,
            email: state.login.email,
        }
    })

    useEffect(() => {
        fetch(`/todo/one/${email}`)
            .then(res => res.json())
            .then(res => {
                let ans = res.list.filter((el) => {
                    if (el._id == id) return el;
                })
                setSelTodo(ans[0]);
                setCurrStatus(ans[0].status);
            })
            .catch(err => console.log("eroor is->", err))
    }, [currStatus]);
    const toogleStatus = () => {
        dispatch(updateTodoLoading());
        fetch(`/todo/status/${email}/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(res => {
                setCurrStatus(currStatus == "Incomplete" ? "Complete" : "Incomplete")
                // dispatch(updateTodoSuccess(res))
            })
            .catch(err => {
                dispatch(updateTodoError(err))
            })
    }

    const deleteTodo = () => {
        dispatch(deleteTodoLoading());
        fetch(`/todo/${email}/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then(res => {
                dispatch(deleteTodoSuccess())
                navigate("/")
            })
            .catch(err => {
                dispatch(deleteTodoError(err));
            })
    }

    return <>
        {selTodo ?
            <div className='container'>
                <div className='title-status-delete-container'>
                    <div className='title-del-parent'>
                        <div className='t-s-d-title'>{selTodo.title}</div>
                        <div><MdDelete size={"2em"} className='t-s-d-delete-btn' onClick={deleteTodo} /></div>
                    </div>
                    <div className='status-toggle'>
                        <div className='statuscls'><span></span ><span className='status-value'>{selTodo.status}</span></div>
                        <div className='toogle-status'>
                            <input onClick={toogleStatus} type="checkbox" id="switch"
                                className="checkbox" />
                            <label for="switch" className="toggle"></label>
                        </div>
                    </div>
                </div>
                <div className='t-s-description'>
                    <div>
                        <FaEdit className='t-s-d-edit' size={"1.5em"} onClick={() => { navigate(`/edit_todo/${id}`) }} />
                    </div>
                    <div>
                        <h5>{selTodo.description}</h5>
                    </div>
                </div>
            </div> : null
        }
    </>
}