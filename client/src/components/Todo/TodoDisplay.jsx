import './TodoDisplay.css'
import { useSelector, useDispatch } from 'react-redux';
import { getTodoLoading, getTodoSuccess, getTodoError,userTodo } from '../../features/todos/actions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiTaskX, BiLogInCircle } from 'react-icons/bi';


export const TodoDisplay = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, list, error } = useSelector((state) => {
        return {
            loading: state.todo.loading,
            list: state.todo.list,
            error: state.todo.error,
        }
    });

    const {token,email}=useSelector((state)=>{
        return{
            email:state.login.email,
            token:state.login.token
        }
    })

    useEffect(() => {
        dispatch(getTodoLoading());
        fetch(`/todo/${email}`)
            .then(res => res.json())
            .then(res => {
                dispatch(userTodo(res))
            })
            .catch(err => dispatch(getTodoError(err)));
    }, [])

    return <>
        {token ? <div>
            {list.length===0 ? <div className='no-task-aval'><span>No active task</span> <span><BiTaskX /></span></div> :
                <div className='list-parent'> 
                    <h1 className='disp-heading'>Your list of tasks</h1>
                    {list.map((elem) => {
                        return (
                            <div className="todoList-display-container" key={elem._id}>
                                <div onClick={() => { navigate(`/todo/${elem._id}`) }} className="todoDivContainer">
                                    <div className="topDiv">
                                        <div className="titleDiv">
                                            <h2 className="title" >{elem.title}</h2>
                                        </div>
                                        <div className="statusDiv">
                                            <h3 className="status" style={elem.status == "Completed" ? { color: 'green' } : { color: "#cf0707" }}>{elem.status}</h3>
                                        </div>
                                        <div className="desp-Div">
                                            <i className="fa fa-trash-alt add-btn" title="delete-items" ></i>
                                        </div>
                                    </div>
                                    <h3 className="description">{elem.description}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div> : <div className='login-redirect'><span>Login First</span><span><BiLogInCircle /></span></div> }
    </>
}