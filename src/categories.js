import {useState, useEffect} from 'react'
import axios from 'axios'
function Categories(){
  //console.log('component start')
  const [categories,setCategories]=useState([])
  const [name, setName]=useState('')
  
  // const handleAdd=()=>{
  //   const name =window.prompt("Enter your Name")
  //   if(name){
  //     const category={
  //     _id: Number(new Date()),
  //     name: name
  //   }
  //   const newArr=[...categories]
  //   newArr.push(category)
  //   setCategories(newArr)
  //   }
  // } 
  const handleRemove=(obj)=>{
    const confirmation=window.confirm(`Are you Sure you want to remove ${obj.name}?`)
    if(confirmation){
      axios.delete(`http://localhost:3050/api/categories/${obj._id}`)
        .then((response)=>{
          const result=response.data
          const newArr=categories.filter((ele)=>{
            return ele._id!==result._id
          })
          setCategories(newArr)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }  
  const handleEdit=(obj)=>{
    const input=window.prompt(`Update category name for ${obj.name}`)
    if(input.trim()){
      const formData={...obj, name:input}
      // const formData=Object.assign(obj,{name:input})
      axios.put(`http://localhost:3050/api/categories/${obj._id}`, formData)
        .then((response)=>{
          const result=response.data
          const newArr=categories.map((ele)=>{
            if(ele._id===result._id){
              return result
            }
            else{
              return ele
            }
        })       
        setCategories(newArr)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    const formData={
      name: name
    }
  
  axios.post('http://localhost:3050/api/categories',formData)
    .then((response)=>{
      const result=response.data
      setCategories([...categories, result])
      setName('')
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(()=>{
    console.log('component useEffect')
    axios.get('http://localhost:3050/api/categories')
    .then((response)=>{
      const result=response.data
      console.log(result) 
      /*
        never ever directly update the state till we get hold on react.
        console log your response and analyse what we are getting as the response.  
      */
      setCategories(result)
    })
    .catch((err)=>{
      alert(err.message)
    })
  },[])

  return(
    <div>
      {/* {condition ? trueStatement : falseStatement} */}
      {categories.length===0 ? <p>No Categories found. Add your first Category.</p> : ( 
        <div>
          <h2>Listing Categories- {categories.length}</h2>
          <ul>
            {categories.map((category)=>{
              return <li key={category._id}>{category.name}
              <button onClick={()=>{
                handleEdit(category)
              }}>edit</button>
              <button onClick={()=>{
                handleRemove(category)
              }}>remove</button>
              </li>
            })}
          </ul>
        </div>
      )}
      
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter Name</label><br/>
        <input 
          type='text'
          value={name}
          onChange={(e)=>{setName(e.target.value)}}
        /><br/>
        <input type='submit'/>
      </form>
    </div>
  )
}

export default Categories 