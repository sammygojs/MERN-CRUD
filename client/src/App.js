import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  
  const [foodName, setFoodName] = useState('')
  const [days, setDays] = useState(0)
  const [newFoodName, setNewFoodName] = useState('')
  const [foodList, setFoodList] = useState([])

  useEffect(()=>{
    Axios.get('http://localhost:3001/api/read')
    .then((response)=>{
      setFoodList(response.data)
      // console.log(foodList)
    })
  },[])

  const submitFood = () =>{
    Axios.post('http://localhost:3001/api/insert',{foodName:foodName,days:days})
    .then(()=>{
      // alert(`row inserted ${response.data}`)
      // const name = foodName;
      // const day = days;
      console.log(foodList)
      setFoodList([...foodList,{foodName:foodName, daysSinceAte:days}])
      console.log(foodList)
      // console.log("day: ",day)
      // console.log("name: ",name)
    });
  }

  const deleteFood = (id) =>{
    Axios.delete(`http://localhost:3001/api/delete/${id}`)
    .then(()=>{
      console.log("delete done")
    })
  }

  const updateFood = (id) =>{
    Axios.put(`http://localhost:3001/api/update`,{
      id: id,
      newFoodName : newFoodName
    })
    .then((response)=>{

      console.log(`update done : ${response.data}`)
    })
  }

  return (
    <div className="App">
      <h1>Hello CRUD APP</h1>
      <label>FoodName</label>
      <input onChange={(e)=>{setFoodName(e.target.value)}} type="text" ></input>
      <label>Days since you ate it</label>
      <input onChange={(e)=>{setDays(e.target.value)}} type="number"></input>
      <button onClick={submitFood}>Add to list</button>
      <div>
        {foodList.map((food,key)=>{
          return (
            <div key={key}>
               <h1>Foodname: {food.foodName} | daysSinceAte: {food.daysSinceAte} </h1>
               <input onChange={(e)=>{setNewFoodName(e.target.value)}}></input>
               <button onClick={()=>{updateFood(food._id)}}>Update</button>
               <button onClick={()=>{deleteFood(food._id)}}>Delete</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
