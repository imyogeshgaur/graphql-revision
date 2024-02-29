import { useNavigate } from "react-router"
import "../css/NavBar.css"
import Button from "./Button"

const NavBar = () => {
  const navigate = useNavigate();
  const logoutUser = ()=>{
    localStorage.removeItem("token");
    navigate("/")
  }
    return (
        <>
            <div className='display-bar'>
                <h1 style={{marginTop:10}}>Welcome User</h1>
                <Button 
                btnText="Logout"
                onSubmit={logoutUser}
                btnClass="navbar-button"
                />
            </div>
        </>
    )
}

export default NavBar