import axios from "axios"
import CategoriesItems from "./CategoryItem"
export default function CategoriesList(props){
    console.log(props.categories)
    const handleEdit = async (obj)=>{
        const input = prompt("Enter The Details")
        if(input){
            const formData = {
                 name:input
            }
            try{
                const response = await axios.put(`http://localhost:3050/api/categories/${obj._id}` , formData , {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                const result = response.data
                props.editCategory(result)
            }catch(err){
                alert(err.message)
            }
            // axios.put(`http://localhost:3050/api/categories/${obj._id}` , formData , {
            //     headers:{
            //         Authorization:localStorage.getItem('token')
            //     }
            // })
            //     .then((response)=>{
            //         const result = response.data
            //         props.editCategory(result._id)
            //     })
            //     .catch((err)=>{
            //         alert(err.message)
                // })
        }
    }
    const handleRemove = (obj)=>{
        const confirmation = window.confirm(`Are You Sure? You Want To Delete ${obj.name}`)
        if(confirmation){
            axios.delete(`http://localhost:3050/api/categories/${obj._id}` , {
                headers:{
                    Authorization:localStorage.getItem('token')
                }
            })
                .then((response)=>{
                    const result = response.data
                    const newArr = props.categories.filter((ele)=>{
                        return ele._id !== result._id
                    })
                    props.removeCategory(newArr)
                })
                .catch((err)=>{
                    alert(err.message)
                })
        }
    }
    return (
        <div>
            <ul>
                {
                    props.categories.map((ele)=>{
                        return <li key={ele._id}>
                            <CategoriesItems
                            key={ele._id}
                            name={ele.name}
                            id={ele._id}/>
                        <button onClick={()=>{
                            handleEdit(ele)
                        }}>Edit</button>
                        <button onClick={()=>{
                            handleRemove(ele)
                        }}>Remove</button>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}
