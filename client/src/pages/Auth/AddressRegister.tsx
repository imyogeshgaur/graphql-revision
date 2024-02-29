import { useState } from "react";
import { AddressInterface } from "../../interface/RegisterInterface";
import { useSelector } from "react-redux";
import { TextInputInterface } from "../../interface/TextInputInterface";
import "../../css/Auth.css";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "../../graphql/Mutation";
import { isValidPinCode } from "../../validations/Validations";
import { useNavigate } from "react-router";

const AddressRegister = () => {
  const [addressData, setAddressData] = useState<AddressInterface>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    pinCode: "",
  });

  const userData = useSelector((state: any) => state.user);
  const [signUpUser, { loading, error }] = useMutation(SIGNUP_MUTATION);
  const navigate = useNavigate();

  const onChangeHandler = (e: any) => {
    const { name, value }: any = e.target;
    setAddressData({
      ...addressData,
      [name]: value,
    });
  };

  const propsArray: Array<TextInputInterface> = [
    {
      type: "text",
      name: "addressLine1",
      placeholder: "Enter Your Flat/House Number",
      onChange: onChangeHandler,
      value: addressData.addressLine1,
    },
    {
      type: "text",
      name: "addressLine2",
      placeholder: "Enter Your Street and landmark",
      onChange: onChangeHandler,
      value: addressData.addressLine2,
    },
    {
      type: "text",
      name: "city",
      placeholder: "Enter Your City",
      onChange: onChangeHandler,
      value: addressData.city,
    },
    {
      type: "text",
      name: "pinCode",
      placeholder: "Enter Your Pin Coe",
      onChange: onChangeHandler,
      value: addressData.pinCode,
    },
  ];

  const addressRegisterFunction = async() => {
    if (
      !addressData.addressLine1 ||
      !addressData.addressLine2 ||
      !addressData.city ||
      !addressData.pinCode
    )
      console.log("Please Fill All Data !!!");
    if (!isValidPinCode(addressData.pinCode))
      console.log("Please Enter a Valid Pin Code");

    if (loading) console.log("Loading");
    if (error) console.log("Error occurred : ", error);

    if (
      addressData.addressLine1 &&
      addressData.addressLine2 &&
      addressData.city &&
      addressData.pinCode && isValidPinCode(addressData.pinCode)
    ) {
      const userInput = { ...userData, ...addressData };

      const responseFromBackend = await signUpUser({
        variables: {
          userInput,
        },
      });

      if(responseFromBackend.data.signUpUser.status==200){
        navigate("/")
      }else{
        navigate("/registerUser")
      }
    }
  };

  return (
    <>
      <div className="form-data">
        <div className="row">
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
          <Button btnText="Submit" onSubmit={addressRegisterFunction} />
        </div>
      </div>
    </>
  );
};

export default AddressRegister;
