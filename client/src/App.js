import { useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)

  const submitFood = () =>{
    Axios.post('http://localhost:3001/api/insert',{foodName:foodName,days:days}).then((response)=>alert(`row inserted ${response.data}`))
    const name = foodName;
    const day = days;
    console.log("day: ",day)
    console.log("name: ",name)
  }

  return (
    <div className="App">
      <h1>Hello CRUD APP</h1>
      <label>FoodName</label>
      <input onChange={(e)=>{setFoodName(e.target.value)}} type="text" ></input>
      <label>Days since you ate it</label>
      <input onChange={(e)=>{setDays(e.target.value)}} type="number"></input>
      <button onClick={submitFood}>Add to list</button>
    </div>
  );
}

export default App;
