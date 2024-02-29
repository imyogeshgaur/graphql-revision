import "../css/TextInput.css";
import { TextInputInterface } from "../interface/TextInputInterface";

const TextInput = (props: TextInputInterface) => {
  return (
    <>
      <label htmlFor={props.name} className="form-label">
        {`${props.placeholder.substring(11)}:`}
      </label>
      <input
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        name={props.name}
        className="form-input"
      />
    </>
  );
};

export default TextInput;
