import { increment,decrement,incrementbyvalue,reset } from "./slice"
import {useDispatch,useSelector} from 'react-redux'
const Counter = () => {
  const count = useSelector((state)=>state.z.value)
  const dispatch=useDispatch()

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>dispatch(increment())}>+</button>
      <button onClick={()=>dispatch(decrement())}>-</button>
      <button onClick={()=>dispatch(incrementbyvalue(100))}>increment by value</button>
      <button onClick={()=>dispatch(reset())}>reset</button>
    </div>
  )
}

export default Counter