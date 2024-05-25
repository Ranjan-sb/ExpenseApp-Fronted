import React from "react"
import { useState , useEffect } from "react"
import CategoriesContainer from "./components/CategoriesContainer"
import ExpensesContainer from "./components/ExpenseContainer"
import LoginForm from "./components/LoginForm"
import axios from 'axios'
function App(){
    const [categories , setCategories] = useState([])
    const [expenses , setExpenses] = useState([])
    const [userLoggedIn , setUserLoggedIn] = useState(false)
    // console.log(expenses)
    useEffect(()=>{
        // console.log('userloggedin' , userLoggedIn)
        if(userLoggedIn){
            // declare the function to convert the code to async await
            // use IIFE - immediately invoked function expression
            //(function(){})(); or in arrow function // only here ; should or not be used if errors

            (async ()=>{
                try{
                    const catResponse = await axios.get('http://localhost:3050/api/categories' , {
                        headers:{
                            Authorization:localStorage.getItem('token')
                        }
                    })
                    setCategories(catResponse.data)
                    const expResponse = await axios.get('http://localhost:3050/api/expenses' , {
                        headers:{
                            Authorization:localStorage.getItem('token')
                        }
                    })
                    setExpenses(expResponse.data)

                }catch(err){
                    alert(err.message)
                }
            })();
            // axios.get('http://localhost:3050/api/categories' ,{ headers:{
            //     'Authorization': localStorage.getItem('token')
            // }})
            //     .then((response)=>{
            //         const result = response.data
            //         setCategories(result)
            //     })
            //     .catch((err)=>{
            //         alert(err.message)
            //     })
            // axios.get('http://localhost:3050/api/expenses' ,{headers:{
            //     'Authorization': localStorage.getItem('token')
            // }})
            //     .then((response)=>{
            //         const result = response.data
            //         setExpenses(result)
            //     })
            //     .catch((err)=>{
            //         alert(err.message)
            //     })
        }else{
            setCategories([])
            setExpenses([])
        }
    },[userLoggedIn])
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setUserLoggedIn(true)


            // axios.get('http://localhost:3050/api/categories' , {
            //     headers:{
            //         'Authorization': localStorage.getItem('token')
            //     }
            // })
            //     .then((response)=>{
            //         const result = response.data
            //         setCategories(result)
            //     })
            //     .catch((err)=>{
            //         alert(err.message)
            //     })
            // axios.get('http://localhost:3050/api/expenses' ,{
            //     headers:{
            //         'Authorization': localStorage.getItem('token')
            //     }
            // })
            //     .then((response)=>{
            //         const result = response.data
            //         setExpenses(result)
            //     })
            //     .catch((err)=>{
            //         alert(err.message)
            //     })
        
        }
    },[])
    const addCategory =(category)=>{
        setCategories([...categories , category])
    }
    const editCategory = (result)=>{
        const newArr = categories.map((ele)=>{
                if(ele._id === result._id){
                   return result
                }else{
                    return ele
                }
            })
        setCategories(newArr)
    }
    const removeCategory = (id)=>{
       setCategories(id)
    }
    const addExpense = (exp)=>{
        setExpenses([...expenses , exp])
    }
    const removeExpense = (id)=>{
        const newArr = expenses.filter((ele)=>{
            return ele._id !== id
        })
        setExpenses(newArr)
    }
    const loginSuccess = ()=>{
        setUserLoggedIn(true)
    }
    const logout = ()=>{
        setUserLoggedIn(false)
    }
    return (
        <div>
            <h2>Expense App</h2>
            {
                userLoggedIn ? (
                    <div>
                        <button onClick={logout}>logout</button>
                        <CategoriesContainer 
                                categories={categories}
                                editCategory={editCategory}
                                removeCategory={removeCategory}
                                addCategory={addCategory}
                                />
                        <ExpensesContainer
                            expenses={expenses}
                            categories={categories}
                            addExpense={addExpense}
                            removeExpense={removeExpense}
                            
                            />
                    </div>
                ):(
                    <LoginForm
                    loginSuccess={loginSuccess}/>
                )
            }
        </div>
    )
}

export default App