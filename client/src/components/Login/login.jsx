import './login.css'
import { useEffect, useState } from "react"
import { loginLoading, loginSuccess, loginError } from "../../features/login/actions";
import { userTodo } from '../../features/todos/actions'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [userInp, setUserInp] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const { loading, token, error } = useSelector((state) => {
        return {
            loading: state.login.loading,
            token: state.login.token,
            error: state.login.error
        }
    })
    const [loginStatus, setLoginStatus] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        if (token)
            setTimeout(() => {
                navigate("/")
            }, 2000);
    }, [token]);

    const handleInp = (e) => {
        const { name, value } = e.target;
        setUserInp({ ...userInp, [name]: value })
    }

    const handleSubmit = () => {
        dispatch(loginLoading());
        fetch("/login", {
            method: "POST",
            body: JSON.stringify(userInp),
            headers: {
                "content-type": "application/json"
            }
        })
            .then(res => res.json())
            .then((res) => {
                if (res.token) {
                    dispatch(loginSuccess({ token: res.token, email: res.email }));
                    dispatch(userTodo(res.list));
                    setLoginStatus(1)
                } else {
                    setLoginStatus(2)
                    setTimeout(() => setLoginStatus(false), 4000)
                }
            })
            .catch(err => dispatch(loginError()));
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

    function handleBeforeLogin() {
        if (userInp.email.length > 0 && userInp.password.length > 0)
            Debounce();
        else {
            setLoginStatus(3);
            setTimeout(() => setLoginStatus(false), 2000)
        }
    }
    const Debounce = debounce(handleSubmit, 2000)
    return <>
        <div className="user-login-container">
            <h1 className='user-login-heading'>Enter Login Details</h1>
            <input className='user-email' onChange={handleInp} type="text" name="email" placeholder="enter your email" />
            <input className='user-password' onChange={handleInp} type="password" name="password" placeholder="enter password" />
            <button id='user-login-btn-id' className='user-login-btn' onClick={handleBeforeLogin}>Login</button>
            <div><span>Not a user! </span><span onClick={() => navigate("/register")} className='register-redirect'> register</span></div>
        </div>
        {loginStatus ?
            <div className='des-update-succ-msg-container'>{loginStatus == 1 ? <span className='des-update-succ-msg'>Loged in successfully</span> : loginStatus == 2 ? <span className='des-update-succ-msg'>User not found</span> : <span className='des-update-succ-msg'>please fill all info</span>}</div> : null
        }
    </>
}