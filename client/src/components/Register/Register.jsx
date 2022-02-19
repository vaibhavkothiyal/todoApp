import { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'

export const Register = () => {

    const [userDetail, setUserDetail] = useState({
        name: "",
        email: "",
        password: ""
    })
    const Navigate=useNavigate();
    const [registStatus,setRegistStatus]=useState(false);

    const handleInp = (e) => {
        const { name, value } = e.target;

        setUserDetail({ ...userDetail, [name]: value })
    }

    const handleSubmit=()=>{
        fetch("/register",{
            method:"POST",
            body: JSON.stringify(userDetail),
            headers: {
                "content-type": "application/json"
            }
        })
        .then((res)=>res.json())
        .then((res)=>{
            setRegistStatus(1);
            setTimeout(()=>Navigate('/login'),2000)
        })
        .catch((err)=>console.log(err));
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

    const handleBeforeReg=()=>{
        if(userDetail.email.length>0 && userDetail.password.length>0 && userDetail.name.length>0)
        Debounce();
        else{
            setRegistStatus(2);
            setTimeout(()=>setRegistStatus(false),2000)
        }
    }
    const Debounce=debounce(handleSubmit,2000);

    return <>
        <div className='input-container'>
            <div className='input-parent-div'>
                <h1 className='user-reg-title'>Enter your details</h1>
                <input className='user-reg-field' onChange={handleInp} type="text" name="name" id='name'  placeholder="Enter Name" />
                <input className='user-reg-field' onChange={handleInp} type="text" name="email" id='email' placeholder="Enter Email" />
                <input className='user-reg-field' onChange={handleInp} type="password" name="password" id='password' placeholder="Enter Password" />
                <input className='user-reg-btn' onClick={handleBeforeReg} type="submit" value="Register" id="" />
            </div>
        </div>
        {registStatus ?
            <div className='des-update-succ-msg-container'>{registStatus == 1 ? <span className='des-update-succ-msg'>Registered successfully</span> :<span className='des-update-succ-msg'>Provide all information</span>}</div> : null
        }
    </>
}