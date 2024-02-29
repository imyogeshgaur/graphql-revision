import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
    mutation signUpUser($userInput:UserData){
        signUpUser(userInput:$userInput){
        data {
            nameOfUser
        }
        status
        message
        }
    }
`

export const LOGIN_WITH_EMAIL_MUTATION = gql`
    mutation loginUserWithEmail($userInput:emailLoginInput){
        loginUserWithEmail(userInput: $userInput) {
        data,
        message,
        status
        }
    }
`

export const LOGIN_WITH_PHONE_MUTATION = gql`
    mutation loginUserWithPhone($userInput: phoneLoginInput){
        loginUserWithPhone(userInput: $userInput) {
        data,
        message,
        status
        }
    }
`
