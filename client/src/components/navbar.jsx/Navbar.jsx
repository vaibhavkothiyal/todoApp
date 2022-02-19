import './Navbar.css'
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from '../../features/login/actions'

export const Navbar = () => {

    const { token } = useSelector((state) => {
        return {
            token: state.login.token,
        }
    });
    const dispatch = useDispatch();
    const Navigate=useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userToken')
        dispatch(logoutUser());
        Navigate('/')
    }


    return <>
        <div className='navbar-container'>
            <div className='navbar-parent'>
                <Link className='link' to="/">Home</Link>
                <Link className='link' to="/add_todo">Add Todo</Link>
                {!token ? <Link className='link' to="/login">Login</Link> :
                    <span className='link' onClick={handleLogout}>Logout</span>
                }
                {!token ? <Link className='link' to="/register">Register</Link> : null}
            </div>
        </div>
    </>
}