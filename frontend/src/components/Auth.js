import React , {useState} from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage  from '../assets/signup.jpg'
const cookies = new Cookies();
const initialState = {
    fullName : '',
    username : '',
    password : '',
    confirmPassword : '',
    phoneNumber : '',
    avatarURL : '',
}

const Auth = () => {

    const [form , setForm] = useState(initialState);
    const[isSignUp , setSignUp] = useState(true);

    const handleChange = (e) =>{
        setForm( form => ({...form , [e.target.name] :e.target.value}));
        console.log(form);

    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
       const { username , password , phoneNumber , avatarURL } = form;
       const URL = "http://localhost:5000/auth";

       const { data : {token , userId , hashedPassword ,fullName } } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`,{
        fullName:form.fullName , username , password , phoneNumber , avatarURL
       });
       cookies.set('token' , token);
       cookies.set('username' , username);
       cookies.set('fullName' , fullName);
       cookies.set('userId' , userId);

       if(isSignUp)
        {
        cookies.set('phoneNumber' , phoneNumber);
        cookies.set('avatarURL' , avatarURL);
        cookies.set('hashedPassword' ,  hashedPassword);
        }
        window.location.reload();

    }
    const switchMode = () =>{
        setSignUp((prevIsSignup) => !prevIsSignup)
    }

  return (
    <div className ='auth__form-container'>
     <div className ='auth__form-container_fields'>
      <div className = 'auth__form-container_fields-content'>
        <p> {isSignUp ? 'Sign Up' : 'Sign In'} </p>
        <form onSubmit = {handleSubmit}>
          {isSignUp && (
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='fullName'>Full Name</label>
              <input
                name = "fullName" type = "text" placeholder ='Full Name' onChange = {handleChange} required
              />
            </div>
          )}
          <div className='auth__form-container_fields-content_input'>
              <label htmlFor='username'>Username</label>
              <input
                name = "username" type = "text" placeholder ='Username' onChange = {handleChange} required
              />
            </div>
            {isSignUp && (
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input
                name = "phoneNumber" type = "text" placeholder ='Phone Number' onChange = {handleChange} required
              />
            </div>
          )}
          {isSignUp && (
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='avatarUrl'>Avatar Url</label>
              <input
                name = "avatarUrl" type = "text" placeholder ='Avatar Url' onChange = {handleChange} required
              />
            </div>
          )}
          <div className='auth__form-container_fields-content_input'>
              <label htmlFor='password'>Password</label>
              <input
                name = "password" type = "password" placeholder ='Password' onChange = {handleChange} required
              />
          </div>
          {isSignUp && (
            <div className='auth__form-container_fields-content_input'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <input
                name = "confirmPassword" type = "password" placeholder ='Confirm Password' onChange = {handleChange} required
              />
            </div>
          )}
          <div className='auth__form-container_fields-content_button'>
            <button> {isSignUp ? "Sign Up" : "Sign In"}</button>
          </div>
        </form>
         <div className='auth__form-container_fields-account'>
           <p>
            {isSignUp 
            ?  "Already have an account ?" :"Don't have an account ?"
            }
            <span onClick={switchMode}>
                {isSignUp ? "Sign In" : "Sign Up"}
            </span>
           </p>
         </div>
      </div>
     </div>
     <div className ='auth__form-container_image'>
       <img src = {signinImage} alt = "sign in"/>
     </div>
    </div>
  )
}

export default Auth
