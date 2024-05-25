import {useState} from 'react'
import axios from 'axios'
export default function LoginForm(props){
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [formErrors , setFormErrors] = useState({})
    const [serverErrors , setServerErrors] = useState('')
    const errors = {}
    const validateErrors = ()=>{
        if(email.trim().length ==0){
            errors.email = 'email is required'
        }
        if(password.trim().length == 0 ){
            errors.password = 'password is required'
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const formData = {
            email , 
            password
        }
        validateErrors()
        if(Object.keys(errors).length == 0){
            try{
                const response = await axios.post('http://localhost:3050/api/users/login' , formData)
                const token = response.data.token
                localStorage.setItem('token', token)
                alert('successfully loggedIn')
                props.loginSuccess()
                setFormErrors({})
            }catch(err){
                setServerErrors(err.response.data.notice)
            }
        //     axios.post('http://localhost:3050/api/users/login' , formData)
        //     .then((response)=>{
        //         const token = response.data.token
        //         localStorage.setItem('token' , token)
        //         props.loginSuccess()
        //         setFormErrors({})
        //     })
        //     .catch((err)=>{
        //         setServerErrors(err.response.data.notice)
        //     })
        }else{
            setFormErrors(errors)
        }
        

    }
    
    return (
        <div>
            <h2>Login</h2>
            {serverErrors && <p style={{color:'red'}}>{serverErrors}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Enter Your Email</label> <br/>
                <input
                 type='text'
                  value={email} 
                  onChange={(e)=>{setEmail(e.target.value)}}
                  id='email'/>
                  {formErrors.email && <span style={{color:'red'}}>{formErrors.email}</span>}<br/>
                  <label htmlFor='password'>Enter Your Password</label> <br/>
                  <input
                   type='password'
                    value={password} 
                    onChange={(e)=>{setPassword(e.target.value)}}
                    id='password'/> 
                    {formErrors.password && <span style={{color:'red'}}>{formErrors.password}</span>}<br/>
                    <input type='submit'/>
            </form>
        </div>
    )
}