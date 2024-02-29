import { useState } from "react";
import "../../css/Auth.css";
import { LoginInterface } from "../../interface/LoginInterface";
import TextInput from "../../components/TextInput";
import { TextInputInterface } from "../../interface/TextInputInterface";
import Button from "../../components/Button";

const Login = () => {
  const [user, setUser] = useState<LoginInterface>({
    emailOrPhone: "",
    password: "",
  });

  const onChangeHandler = (e: any) => {
    const { name, value }: any = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const propsArray: Array<TextInputInterface> = [
    {
      type: "text",
      name: "emailOrPhone",
      placeholder: "Enter Your Email Or Phone",
      onChange: onChangeHandler,
      value: user.emailOrPhone,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter Your Password",
      onChange: onChangeHandler,
      value: user.password,
    },
  ];

  const userLoginFunction = async()=>{
    //TODO:Login
  }

  return (
    <>
      <div className="form-data">
        <div className="row">
          <h1 className="form-heading">Login Here</h1>
          {propsArray.map((val: TextInputInterface,index:any) => (
            <TextInput
              key={index}
              type={val.type}
              placeholder={val.placeholder}
              name={val.name}
              value={val.value}
              onChange={val.onChange}
            />
          ))}
        <Button 
        btnText="Submit"
        onSubmit={userLoginFunction}
        />
        </div>
      </div>
    </>
  );
};

export default Login;
