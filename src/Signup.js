import React, { useState } from 'react'

const Signup = (props) => {
    const {onSubmitSuccess} = props;
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassWord] = useState('');
    const [message,setMessage] = useState('');

    const handleSubmit = async (event) =>{
        event.preventDefault();
        try{
            const response = await fetch(`${process.env.REACT_APP_API_URL}auth/signup/`, {
            method: 'post',
            headers: {
                'content-type': 'application/json',
            },
            body:JSON.stringify({ username, email, password}),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Signup succesful!');
            setUserName('');
            setEmail('');
            setPassWord('');

            onSubmitSuccess();
        }

        else{
            setMessage(`Signup failed: ${JSON.stringify(data)}`);
        }
        }
        catch (error){
            setMessage(`Error during signup: ${error.message}`);
        }
        //perform signup logic (e.g  API call)
        // if signup is successful:
        
        // call the function passed from the authpage or main app 

    }





  return (
    <div>
        <form onSubmit={handleSubmit}>
        
        
        

        <div className='firstDiv'>
            <label>
                userName:
                <input type='text' className='userName' value={username} onChange={(e)=> setUserName(e.target.value)} name='username' required/>
            </label>
        </div>
        
        <div className='firstDiv'>
            <label>
                Email:
                <input type='email' className='email' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='@gmail.com' name='email' required/>
            </label>
        </div>
        
        
        <div className='firstDiv'>
            <label>
                Password:
                <input type='password' value={password} onChange={(e)=> setPassWord(e.target.value)} name='password' required/>
            </label>
        </div>
        
        <button type='submit'>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Signup;



