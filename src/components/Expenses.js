import { useState } from "react"

function Expenses(){
    const [expense , setExpense] = useState([])
    const handleClick  = () =>{
        const name = window.prompt("Add the Expenses Below")
        if(name){
            const obj = {
                _id:Number(new Date()),
                name:name
            }
            setExpense([...expense , obj ])
        }    
    }
    const handleRemove = (obj)=>{
        const confirmation = window.confirm(`Are You Sure? You Want To Delete ${obj.name}`)
        if(confirmation){
           const newArr =  expense.filter((ele)=>{
                return ele._id !== obj._id
            })
            setExpense(newArr)
        }
    }
    return (
        <div>
            <h2>Expenses Listing {expense.length}</h2>
            <ul>
                {
                    expense.map((ele)=>{
                        return <li key={ele._id}>{ele.name}
                        <button onClick={()=>{
                            handleRemove(ele)
                        }}>Delete</button></li>
                    })
                }
            </ul>
            <button onClick={handleClick}>Add Expense</button>

        </div>
    )
}

export default Expenses