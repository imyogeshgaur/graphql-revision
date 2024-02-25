const typeDefs = `
    type responseToFrontEnd{
        status:Int!
        data:User
        message:String
    }

    type responseToFrontEndString{
        status:Int!
        data:String
        message:String
    }

    type allUsers{
        status:Int!
        data:[User]
    }

    type Query{
        getAllUsers(userInput:String):allUsers
    }
    type User{
        userId:ID
        nameOfUser:String!
        emailOfUser:String!
        phoneNumber:String!
        password:String!
        addressLine1:String!
        addressLine2:String!
        city:String!
        pinCode:String!
        role:String!
    }

    input UserData{
        nameOfUser:String!
        emailOfUser:String!
        phoneNumber:String!
        password:String!
        addressLine1:String!
        addressLine2:String!
        city:String!
        pinCode:String!
        role:String
    }

    input emailLoginInput{
        emailOfUser:String!
        password:String!
    }

    input phoneLoginInput{
        phoneNumber:String!
        password:String!
    }

    type Mutation{
        signUpUser(userInput:UserData):responseToFrontEnd
        loginUserWithEmail(userInput:emailLoginInput): responseToFrontEndString
        loginUserWithPhone(userInput:phoneLoginInput): responseToFrontEndString
    }

`

export default typeDefs