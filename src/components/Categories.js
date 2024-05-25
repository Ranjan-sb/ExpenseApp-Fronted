import { useState , useEffect } from "react"
import axios from 'axios'

function Categories(){
    const [categories , setCategories] = useState([])
    const [name , setName] = useState('')
    // const handleAdd = ()=>{
    //     const name = window.prompt("Enter Category Name")
    //     if(name){
    //         const category = {
    //             _id:Number(new Date()),
    //             name:name
    //         }
    //         //send the obj to server
    //         // get response from the server
    //         // then ti state
    //         const newArr = [...categories]
    //         // console.log(newArr)
    //         newArr.push(category)
    //         setCategories(newArr)

    //         // setCategories([...categories , category])
    //     }

    // }
    const handleRemove = (obj)=>{
        const confirmation =window.confirm(`Are You Sure ? You Want To Delete ${obj.name}?`)
        if(confirmation){
            axios.delete( `http://localhost:3050/api/categories/${obj._id}`)
            .then((response)=>{
                const result = response.data  
                const newArr = categories.filter((ele)=>{
                return ele._id !== result._id
                })
            setCategories(newArr)
            
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    const handleEdit = (obj)=>{
        const input = window.prompt("Enter Name You Want Update")
        if(input.trim()){
            const formData = {...obj , name:input}// dind't get it
            axios.put(`http://localhost:3050/api/categories/${obj._id}`, formData)
                .then((response)=>{
                    const result = response.data
                    const newArr = categories.map((ele)=>{
                        if(ele._id === result._id){
                            return result
                        }else{
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
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = {
            name:name
        }
        axios.post('http://localhost:3050/api/categories' , formData)
            .then((response)=>{
                const result = response.data
                setCategories([...categories , result])
                setName('')
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    useEffect(()=>{
        axios.get('http://localhost:3050/api/categories')
            .then((response)=>{
                const result = response.data
                setCategories(result)
            })
            .catch((err)=>{
                console.log(err)
            })
    } , [])

    return (
        <div>
           
          { categories.length === 0 ? <p>No record found ! Add your first Category </p>: (
            <div>
                  <h2> Listing Categories {categories.length}</h2>
           
            <ul>

             {
              categories.map((ele)=>{
                return <li key={ele._id}> {ele.name}
                <button onClick={()=>{
                    handleRemove(ele)
                }}> Remove </button>
                <button onClick={()=>{
                    handleEdit(ele)
                }}> edit </button></li>
             })
             }
            </ul>
           
            </div>
            
           )}
            <form onSubmit={handleSubmit}>
                <label>Enter The Name</label> <br/>
                <input
                type="text"
                placeholder="Enter the Category Name"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}/> <br/>
                <input type="submit"/>
            </form>
            {/* <button onClick={handleAdd}>Add Category</button> */}
        </div>
    )
}

export default Categories