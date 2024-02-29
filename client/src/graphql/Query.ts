import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
query($userInput: String) {
    getAllUsers(userInput: $userInput) {
      status,
      data {
        nameOfUser,
        emailOfUser,
        phoneNumber
      }
    }
  }
`