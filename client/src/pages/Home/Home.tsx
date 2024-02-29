import { useNavigate } from "react-router";
import NavBar from "../../components/NavBar";
import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../graphql/Query";
import Card from "../../components/Card";
import "../../css/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  const { data } = useQuery(GET_ALL_USERS, {
    variables: {
      userInput: token,
    },
  });

  useEffect(() => {
    if (token == null || undefined || "") navigate("/");
    data == undefined ? "" : setUsers(data.getAllUsers.data);
  }, [data]);

  return (
    <>
      <NavBar />
      <div className="display-card">
          {users.map((val: any, index: any) => (
            <Card
              emailOfUser={val.emailOfUser}
              nameOfUser={val.nameOfUser}
              key={index}
            />
          ))}
        </div>
    </>
  );
};

export default Home;
