import { useState } from "react";
import "../../css/Auth.css";
import { LoginInterface } from "../../interface/LoginInterface";
import TextInput from "../../components/TextInput";
import { TextInputInterface } from "../../interface/TextInputInterface";
import Button from "../../components/Button";
import CustomLink from "../../components/CustomLink";
import {
  isValidEmail,
  isValidPhoneNumber,
} from "../../validations/Validations";
import { useMutation } from "@apollo/client";
import {
  LOGIN_WITH_EMAIL_MUTATION,
  LOGIN_WITH_PHONE_MUTATION,
} from "../../graphql/Mutation";
import { useNavigate } from "react-router";

const Login = () => {
  const [user, setUser] = useState<LoginInterface>({
    emailOrPhone: "",
    password: "",
  });

  const [loginUserWithEmail] = useMutation(LOGIN_WITH_EMAIL_MUTATION);
  const [loginUserWithPhone] = useMutation(LOGIN_WITH_PHONE_MUTATION);
  const navigate = useNavigate();

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

  const userLoginFunction = async () => {
    if (!user.emailOrPhone || !user.password) {
      console.log("Please Fill All Data !!!");
    } else {
      if (isValidEmail(user.emailOrPhone)) {
        const responseFromBackend = await loginUserWithEmail({
          variables: {
            userInput: {
              emailOfUser: user.emailOrPhone,
              password: user.password,
            },
          },
        });
        if (responseFromBackend.data.loginUserWithEmail.status == 200) {
          localStorage.setItem(
            "token",
            responseFromBackend.data.loginUserWithEmail.data
          );
          navigate("/home");
        } else {
          navigate("/");
          console.log(responseFromBackend.data.signUpUser.message);
        }
      }
      if (isValidPhoneNumber(user.emailOrPhone)) {
        const responseFromBackend = await loginUserWithPhone({
          variables: {
            userInput: {
              phoneNumber: user.emailOrPhone,
              password: user.password,
            },
          },
        });
        console.log(responseFromBackend);
        if (responseFromBackend.data.loginUserWithPhone.status == 200) {
          localStorage.setItem(
            "token",
            responseFromBackend.data.loginUserWithPhone.data
          );
          navigate("/home");
        } else {
          navigate("/");
          console.log(responseFromBackend.data.signUpUser.message);
        }
      }
    }
  };

  return (
    <>
      <div className="form-data">
        <div className="row">
          <h1 className="form-heading">Login Here</h1>
          {propsArray.map((val: TextInputInterface, index: any) => (
            <TextInput
              key={index}
              type={val.type}
              placeholder={val.placeholder}
              name={val.name}
              value={val.value}
              onChange={val.onChange}
            />
          ))}
          <Button btnText="Submit" onSubmit={userLoginFunction} />
          <CustomLink
            linkName={"SignUp Here"}
            navigateTo={"/registerUser"}
            linkStyle={{ color: "white", textDecoration: "none",marginTop:"1rem" }}
            linkTextStyle={{ textAlign: "center", marginRight: 20,marginTop:"1rem" }}
            linkText={"New Here? "}
          />
        </div>
      </div>
    </>
  );
};

export default Login;
