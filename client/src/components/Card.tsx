import { CardInterface } from '../interface/CardInterface'
import "../css/Card.css"
const Card = (props:CardInterface) => {
  return (
    <div className='card'>
    <h2>{props.nameOfUser}</h2>
    <p>{props.emailOfUser}</p>
  </div>
  )
}

export default Card