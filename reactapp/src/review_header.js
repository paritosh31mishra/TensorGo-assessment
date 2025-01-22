import {Link}  from 'react-router-dom';
import { useState } from 'react';
import { googleLogout } from '@react-oauth/google';

const clientId = "925306536966-8krnsg2kdor08se5s6d47vla1pec5f2f.apps.googleusercontent.com";
const Reviewheader = () =>{

  const logout = () => {
    googleLogout(); // Perform Google logout
    window.localStorage.clear(); // Clear localStorage
    window.location.href = "https://feedback-portal-t6lj.onrender.com/#/"; // Redirect to dashboard
    window.location.reload(); // Reload the app
  }
  
    let[isHidden, setIsHidden] = useState(true);
    return(
      <nav className="navbar text-white  p-4 ">
      <div class="container-fluid">
      <span className="navbar-brand mb-0 h1 text-white"><h2>Feedback Portal</h2></span>
       
      <div class="btn-group" role="group" >
      <Link to="/Addfeedback" className="menu"> {isHidden && <button className="btn btn-dark fw-bold" type="submit" onClick={() => setIsHidden(false)}>Add Feedback</button>} </Link>
        <button className="btn btn-dark fw-bold" onClick={logout}> Welcome - {localStorage.getItem("fullname") } Logout <i className="fa fa-power-off"></i>  </button>
</div>   
 </div>
 </nav>
   )
}
export default Reviewheader;


