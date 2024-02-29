import { CardInterface } from '../interface/CardInterface'

const Card = (props:CardInterface) => {
  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
    <h2>{props.nameOfUser}</h2>
    <p>{props.emailOfUser}</p>
  </div>
  )
}

export default Card