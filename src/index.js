import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App'
// import InterviewApp from './exercises/InterviewApp'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <InterviewApp/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App'
// // import { useState } from 'react'
// // import Categories  from './Categories' 
// // import ContactForm from './exercises/Contact'
// // import Expense from './Expenses'
// const root = ReactDOM.createRoot(document.getElementById('root'))

// function MyApp(){
//     return (
//         <div>
//             <App/>
//             {/* <ContactForm/> */}

//         </div>
//     )
// }
// root.render(<MyApp/>)

// function App(){
//     const [count , setCount ] = useState(0)
//     // const [ isDisabled , setIsDisabled] = useState(false)

//     const handleUp = ()=>{
//         setCount(count + 1)
//     }
//     const handleDown = () =>{
//         // if(count ===0){
//         //     setIsDisabled(true)
//         // }
//         setCount(count-1)
//     }
//     const handleReset = ()=>{
//         setCount(0)
//     }
//     return (
//         <div>
//             <h2> Counter - {count}</h2>
//             <button onClick={handleUp}>+1</button> <br/>
//             <button onClick={handleDown} disabled = {count === 0}>-1</button> <br/>
//             <button onClick={handleReset}>reset</button>
//             <p>The count value is { count }</p>
//         </div>
//     )
// }

// root.render(<App/>)


// function App(){
//     // const city = 'Bengaluru'
//     // return (
//     //     <div>
//     //         <h1>Weather in {city} is very good</h1>
//     //         <p>{city} is a capital of state karnataka</p>
//     //     </div>
    
    
//     const categories = [
//         {_id:'dct123', name:'Food'},
//         {_id:'dct124', name:'Travel'}
//     ]
//     const users = [
//         {_id:1, name:'john', email:'j@gmail.com'},
//         {_id:2, name:'steve', email:'s@gmail.com'},
//         {_id:3, name:'mark', email:'m@gmail.com'}
//     ]
//     const seasons = ['summer' , 'winter' , 'monsoon' , 'rainy']
    
//     const handleClick = ()=>{
//         alert(`Total categories are - ${categories.length}`)
//     }
//     const handleView = (obj)=>{
//         alert(`you have selected -${obj._id} -${obj.name}`)
//     }
//     const handleNameView = (obj)=>{
//         alert(`you selected userId -${obj._id}- userName -${obj.name} - userEmail-${obj.email} `)
//     }
//     const handleSeasons = (name)=>{
//         const vowels = 'aeiou'
//         let count = 0
//         for(let i=0; i<name.length;i++){
//             if(vowels.includes(name[i])){
//                 count++
//             }
//         }
//         alert(`the vowels present in ${name} are - ${count}`)
//     }

//     const words = ['Javascript' , 'React' , 'Node']
    
//     return (
//         <div >
//              <h1>Expense App</h1>
//             {/* <form >
//                 <label>Enter category</label> <br/>
//                 <input type='text' placeholder='add category'/>
//                 <input type='submit'/>
//             </form>  */}
//             {/* <form onSubmit={handleSubmit}>
//                 <input type='text' placeholder='Enter category...'/>
//                 <input type='submit' />
//             </form> */}
//             <h2>listing categories</h2> 
//             <button onClick={handleClick}>show</button>
//             <ul>
//                 {
//                     categories.map((ele)=>{
//                         return <li key={ele._id}>{ele.name} <button onClick={()=>{
//                             handleView(ele)
//                         }}>view</button></li>
//                     })
//                 }
//             </ul>
            
//             <h2>listing details {users.length}</h2>
//             <ul>
//                 {
                    
//                     users.map((ele)=>{
//                         return <li key={ele._id}>{ele.name} <button onClick={()=>{
//                             handleNameView(ele)
//                         }}>view</button></li>
//                     })
//                 }
//             </ul> 
//             <h2>Listing Seasons</h2>
//             <ul>
//                 {
//                    seasons.map((ele)=>{
//                     return <li> {ele} <button onClick={()=>{
//                         handleSeasons(ele)
//                     }}>view</button></li>
//                    })
//                 }
//             </ul> 
//             {
//                 words.map((tech , i)=>{
//                     return (
//                         <div key={i}>
//                             <h2>{tech}</h2>
//                             <ul>
//                                 {
//                                     tech.split('').map((char, i)=>{
//                                         return <li key={i}>{char.toUpperCase()}</li>
//                                     })
//                                 }
//                             </ul>
//                         </div>
//                     )
//                 })}
//         </div>
//     )
// }

// root.render(<App />)