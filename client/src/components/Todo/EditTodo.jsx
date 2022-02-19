import './EditTodo.css'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const EditTodo = () => {
    const { id } = useParams();
    const [selTodo, setSelTodo] = useState(null);
    const [descp, setDesc] = useState("");
    const Navigate = useNavigate();
    const [updateStatus, setUpdateSts] = useState(false)

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
                setDesc(ans[0].description)
            })
            .catch(err => console.log("eroor is->", err))
    }, []);

    const handleDesc = (e) => {
        setDesc(e.target.value)
    }

    const updateDesc = () => {
        fetch(`/todo/desc/${email}/${id}/${descp}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            }
        })
            .then((res) => res.json())
            .then(res => {
                setTimeout(() => {
                    setUpdateSts(true);
                }, 2000)
                setTimeout(() => {
                    setUpdateSts(false);
                }, 4000)
                setTimeout(() => {
                    Navigate(`/todo/${selTodo._id}`)
                }, 5000)
            })
            .catch(err => { console.log(err) })
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
        {selTodo ? <div>
            <div className="edit-todo-des-parent">
                <div className='edit-desc-title'>Edit your todo here</div>
                <div className='edit-desc-inp'>
                    <textarea className='edit-inp-box' onChange={handleDesc} name="" id="" cols="30" rows="15" value={descp}></textarea>
                </div>
                <div className='edit-desc-btn'><button className='update-desc-btn' onClick={debounce(updateDesc,2000)}>Submit edit</button></div>
            </div>
        </div> : null}
        {updateStatus ?
            <div className='des-update-succ-msg-container'><span className='des-update-succ-msg'>Updated Successfully</span></div> : null
        }
    </>
}