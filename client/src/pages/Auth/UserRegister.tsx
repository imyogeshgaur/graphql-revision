import { useState } from "react";
import { UserInterface } from "../../interface/RegisterInterface";
import TextInput from "../../components/TextInput";
import "../../css/Auth.css";
import { TextInputInterface } from "../../interface/TextInputInterface";
import Button from "../../components/Button";
import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from "../../validations/Validations";
import { useDispatch } from "react-redux";
import { addUserData } from "../../redux/userSlice";
import { useNavigate } from "react-router";
import CustomLink from "../../components/CustomLink";

const UserRegister = () => {
  const [userData, setUserData] = useState<UserInterface>({
    nameOfUser: "",
    emailOfUser: "",
    phoneNumber: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeHandler = (e: any) => {
    const { name, value }: any = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const propsArray: Array<TextInputInterface> = [
    {
      type: "text",
      name: "nameOfUser",
      placeholder: "Enter Your Name",
      onChange: onChangeHandler,
      value: userData.nameOfUser,
    },
    {
      type: "email",
      name: "emailOfUser",
      placeholder: "Enter Your Email",
      onChange: onChangeHandler,
      value: userData.emailOfUser,
    },
    {
      type: "tel",
      name: "phoneNumber",
      placeholder: "Enter Your Phone",
      onChange: onChangeHandler,
      value: userData.phoneNumber,
    },
    {
      type: "password",
      name: "password",
      placeholder: "Enter Your Password",
      onChange: onChangeHandler,
      value: userData.password,
    },
  ];

  const userRegisterFunction = () => {
    if (
      !userData.nameOfUser ||
      !userData.password ||
      !userData.emailOfUser ||
      !userData.phoneNumber
    ) {
      console.log("Please Fill All Data !!!");
    } else {
      if (!isValidEmail(userData.emailOfUser))
        console.log("Please Enter a valid email !!!");
      if (!isValidPhoneNumber(userData.phoneNumber))
        console.log("Please Enter a Valid Phone Number !!!");
      if (!isValidPassword(userData.password))
        console.log("Please Enter a Valid Password !!!");
      dispatch(
        addUserData({
          nameOfUser: userData.nameOfUser,
          emailOfUser: userData.emailOfUser,
          phoneNumber: userData.phoneNumber,
          password: userData.password,
        })
      );
      navigate("/registerAddress")
    }

  };

  return (
    <>
      <div className="form-data">
        <div className="row">
        <h1 className="form-heading">User Details</h1>
          {propsArray.map((val: TextInputInterface, index: any) => (
            <TextInput
              key={index}
              type={val.type}
              name={val.name}
              placeholder={val.placeholder}
              value={val.value}
              onChange={val.onChange}
            />
          ))}
          <Button btnText="Submit" onSubmit={userRegisterFunction} />
          <CustomLink
            linkName={"Login Here"}
            navigateTo={"/"}
            linkStyle={{ color: "white", textDecoration: "none",marginTop:"1rem" }}
            linkTextStyle={{ textAlign: "center", marginRight: 20,marginTop:"1rem" }}
            linkText={"Already Registered? "}
          />
        </div>
      </div>
    </>
  );
};

export default UserRegister;
