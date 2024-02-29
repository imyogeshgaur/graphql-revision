import { ButtonInterface } from "../interface/ButtonInterface"
import "../css/Button.css"

const Button = (props:ButtonInterface) => {
  return (
    <>
      <button
        className="form-button"
        onClick={props.onSubmit}
      >
        {props.btnText}
      </button>
    </>
  )
}

export default Button