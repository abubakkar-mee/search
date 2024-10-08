import { useState,useEffect} from 'react'
import axios from 'axios'


function App() {
  console.log("redering")
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [change, setChange] = useState(true)
  const [users, setUsers] = useState([])
  const [cars, setCars] = useState([])
const fetchUser = async() => {
  try{
    const {data} = await axios.get("http://localhost:5000/user");
    setUsers(data)
  }catch(err){
    console.log(err);
  }
}

const postUser = async (e) =>{
  e.preventDefault();
  try{
    if(name !== "" && email !==""){
      const data = {name:name, email:email}
      await axios.post("http://localhost:5000/user",data)
      setChange(!change)
      setName('');
      setEmail('')
    }
  }catch(err){
    console.log(err)
  }
}
  useEffect(()=>{
    fetchUser()
    // fetchCar()
  },[change])


  return (
    <>
      <form>
        <input type="text" required value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={postUser}>Send Data</button>
      </form>
      <div className="container">
          {
            users.map(({name,email},index) =>(
              <div className='user-container' key={index}>
                <h4>{name}</h4>
                <h4>{email}</h4>
              </div>
            )).reverse()
          }
      </div>
    </>
  )
}

export default App
