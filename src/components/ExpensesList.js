// import ExpensesItem from "./ExpensesItems"
import axios from "axios"
export default function ExpenseList({expenses, categories, removeExpense}){
    const handleRemove= async (id)=>{
        const confirmation = window.confirm('Are You Sure?')
        if(confirmation){
            try{
                const response = await axios.delete(`http://localhost:3050/api/expenses/${id}` , {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                const result = response.data
                removeExpense(result._id)
            }catch(err){
                alert(err.message)
            }
            // axios.delete(`http://localhost:3050/api/expenses/${id}` , {
            //     headers:{
            //         Authorization:localStorage.getItem('token')
            //     }
            // })
            //     .then((response)=>{
            //         const result = response.data
            //        
            //         removeExpense(result._id)
            //     })
            //     .catch((err)=>{
            //         alert(err.message)
            //     })
        }
    }
    const getCategoryName = (id)=>{
        const category = categories.find((ele)=>{
            return ele._id == id
        })
        if(category){
            return category.name
        }else{
            return 'N\A'
        }
    }
    return (
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>amount</th>
                        <th>description</th>
                        <th>date</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {expenses.map((ele)=>{
                            return (
                                <tr key={ele._id}>
                                    <td>{ele.amount}</td>
                                    <td>{ele.description}</td>
                                    <td>{ele.expenseDate}</td>
                                    <td>{getCategoryName(ele.categoryId)}</td>
                                    <td><button onClick={()=>{
                                        handleRemove(ele._id)
                                    }}>Remove</button></td>
                                </tr>
                            )
                        })}
                    
                </tbody>
            </table>
            
        </div>
    )
}