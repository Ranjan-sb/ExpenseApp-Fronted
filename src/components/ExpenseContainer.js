import ExpensesForm from "./ExpenseForm"
import ExpenseList from "./ExpensesList"
import { useState } from "react"
export default function ExpensesContainer({expenses , categories , addExpense,removeExpense}){
    const [search , setSearch] = useState('')
    const total = ()=>{
        return filterSearch().reduce((acc, cv)=>{
            return acc=  acc+ cv.amount 
            
        }, 0)
    }
    const filterSearch = ()=>{
        return expenses.filter((ele)=>{
            return ele.description.toLowerCase().includes(search.toLowerCase())
        })
    }

    return (
        <div>
            {expenses.length == 0 ? <p>No Expense Found!! Add Your First Expense</p> :(
                <div>
                    <h3>Listing Expenses - {filterSearch().length}</h3>
                    <input type="search"  value={search}  onChange={(e)=>{setSearch(e.target.value)}}placeholder="search..."/>
                    <ExpenseList
                    expenses={filterSearch()}
                    categories={categories}
                    removeExpense={removeExpense}
                    />
                    <h3>Total - {total()}</h3>
                </div>
            )}
            <ExpensesForm
                    expenses={expenses}
                    categories={categories}
                    addExpense={addExpense}
                    />
        </div>
    )
}