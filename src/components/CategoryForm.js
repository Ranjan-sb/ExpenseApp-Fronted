import { useState } from "react"
import axios from "axios"
const errorColor = {
    color:'red'
}
export default function CategoriesForm(props){
    const [ name , setName] = useState('')
    const [formErr , setFormErr] = useState({})
    const errors = {}

    const validateErrors = ()=>{
        if(name.trim().length == 0) {
            errors.name = 'name is required'
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const formData = {
            name:name
        }
        validateErrors()
        if(Object.keys(errors).length == 0) {
            try{
                const response = await axios.post('http://localhost:3050/api/categories' , formData , {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                const result = response.data
                props.addCategory(result)
                setFormErr({})
                setName('')
            }catch(err){
                alert(err)
            }
            // axios.post('http://localhost:3050/api/categories' , formData , {
            //     headers:{
            //         Authorization:localStorage.getItem('token')
            //     }
            // })
            // .then((response)=>{
            //     const result = response.data
            //     props.addCategory(result)
            //     setFormErr({})
            //     setName('')
            // })
            // .catch((err)=>{
            //     alert(err)
            // })
        }else {
            setFormErr(errors)
        }
    }
    return (
        <div>
            <h2>Add Category</h2>
            <form  onSubmit={handleSubmit}>
            <label htmlFor="name">Enter The Name</label> <br/>
            <input
            type="text"
            value={name}
            onChange={(e)=>{
                setName(e.target.value)
            }}
            id="name"
            />
            {formErr.name && <span style={errorColor}>{formErr.name}</span>}<br/>
            <input type="submit" />
            </form>
        </div>
    )
}