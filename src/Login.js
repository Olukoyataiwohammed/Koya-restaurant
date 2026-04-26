import React, { useState } from 'react'
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = (props) => {
    const {onPressed} = props; 
    const { login } = useAuth();
    const navigate = useNavigate();
    const [username,setUserName]= useState('');
    const [password,setPassWord] = useState('');
    const [error,setError] = useState('');
  
    const handleSubmit= async (event)=>{
        event.preventDefault();
        setError('');

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({ username, password }),   
            });

            if (!response.ok) {
                setError("Invalid username or password");
                return;
            }

            const data = await response.json();
            const newToken = data.access;

            login(newToken); 
            
            navigate('/menu');

        

        
            setUserName('');
            setPassWord('');
        }
        catch (error){
            setError(error.message)
        }

    };



    return (
    <div>
      <form className='formLogin'  onSubmit={handleSubmit}>
        <div>
            <label>
                Username:
                <input type='text' name='username' value={username} onChange={(event)=>setUserName(event.target.value)} className='userName' required/>
            </label>
        </div>
        <div>
            <label>
                Password:
                <input type='password' value={password} onChange={(event)=>setPassWord(event.target.value)} name='password' className='passWord' required/>
            </label>
        </div>
        <button type='submit'>Log In </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <div className='display'>
        <p onClick={onPressed}>Sign Up</p>
        <p>Forgot Password</p>
      </div>
    </div>
  )
    
  
}

export default Login;















