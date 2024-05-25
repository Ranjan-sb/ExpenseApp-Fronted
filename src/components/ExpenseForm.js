import { useState } from "react"
import axios from "axios"

const errorColor = {
    color:'red'
}
export default function ExpensesForm({categories, addExpense}){
    const [expenseDate , setExpenseDate] = useState('')
    const [amount , setAmount] = useState('')
    const [description , setDescription] = useState('')
    const [categoryId , setCategoryId] = useState('')
    const [formErr , setFormErr]= useState({})
    const errors = {}

    const validateErrors = ()=>{
        if(expenseDate.length == 0){
            errors.expenseDate = 'expenseDate is required'
        }else if(new Date(expenseDate)>new Date()){
            errors.expenseDate = 'expense date cannot be greater than today\'s date'
        }
        if(amount.length == 0){
            errors.amount = 'amount is required'
        }
        if(description.length == 0){
            errors.description = 'description is required'
        }
        if(categoryId.length ==0){
            errors.categoryId = 'category is required'
        }
    }
    const handleSubmit =async (e)=>{
        e.preventDefault()
        const formData = {
            expenseDate,
            amount, 
            description,
            categoryId
        }

        validateErrors()

        if(Object.keys(errors).length == 0){
            try{
                const response = await axios.post('http://localhost:3050/api/expenses' , formData , {
                    headers:{
                        Authorization:localStorage.getItem('token')
                    }
                })
                const result = response.data
                    addExpense(result)
                    setAmount('')
                    setCategoryId('')
                    setDescription('')
                    setExpenseDate('')
                    setFormErr({})
            }catch(err){
                alert(err.message)
            }
            // axios.post('http://localhost:3050/api/expenses' , formData , {
            //     headers:{
            //         Authorization:localStorage.getItem('token')
            //     }
            // })
            //     .then((response)=>{
            //         const result = response.data
            //         addExpense(result)
            //         setAmount('')
            //         setCategoryId('')
            //         setDescription('')
            //         setExpenseDate('')
            //         setFormErr({})
            //     })
            //     .catch((err)=>{
            //         alert(err.message)
            //     })
        }else{
            setFormErr(errors)
        }
    }
   
    return (
        <div>
            <h3>Add Details</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="date">Select Date</label><br/>
                <input
                type="date"
                value={expenseDate}
                onChange={(e)=>setExpenseDate(e.target.value)}
                id="date"/>
                {formErr.expenseDate && <span style={errorColor}>{formErr.expenseDate}</span>}<br/>
                <label htmlFor="amount">Enter Amount</label> <br/>
                <input
                type="number"
                value={amount}
                onChange={(e)=>setAmount(e.target.value)}
                id="amount"/>
                {formErr.amount && <span style={errorColor}>{formErr.amount}</span>}<br/>
                <label htmlFor="description">Enter Description</label><br/>
                <textarea value={description} onChange={(e)=>{
                    setDescription(e.target.value)
                }}></textarea>
                {formErr.description && <span style={errorColor}>{formErr.description}</span>}<br/>
                <label htmlFor="categoryId">Select Category</label><br/>
                <select value={categoryId} onChange={(e)=>{setCategoryId(e.target.value)}}>
                    <option value=''>select Category Name</option>
                    {categories.map((ele)=>{
                        return <option key={ele._id} value={ele._id}>{ele.name}</option>
                    })}
                </select>
                {formErr.categoryId && <span style={errorColor}>{formErr.categoryId}</span>}<br/>
                <input 
                type="submit"/>
            </form>
        </div>
    )
}