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
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const { data } = useQuery(GET_ALL_USERS, {
    variables: {
      userInput: token,
    },
  });

  useEffect(() => {
    if (token == null || undefined || "") navigate("/");
    data == undefined ? "" : setUsers(data.getAllUsers.data);
  }, [data]);

  const filetedValue = users.filter((val: any) => {
    if (search == "") return val;
    if (val.nameOfUser.toLowerCase().includes(search.toLowerCase())) {
      return val.nameOfUser;
    }
    if (val.emailOfUser.toLowerCase().includes(search.toLowerCase())) {
      return val.emailOfUser;
    }
  });

  if(sort=="A to Z"){
    filetedValue.sort((a:any,b:any)=>a.nameOfUser.localeCompare(b.nameOfUser))
  }else if(sort=="Z to A"){
    filetedValue.sort((a:any,b:any)=>b.nameOfUser.localeCompare(a.nameOfUser))
  }

  return (
    <>
      <NavBar />

      <input
        type={"text"}
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        placeholder={"Search here"}
        className="search-input"
      />

      <select
        value={sort}
        onChange={(e: any) => setSort(e.target.value)}
        className="sort-input"
      >
        <option value="">
          Select Sorting
        </option>
        <option value="A to Z">A to Z</option>
        <option value="Z to A">Z to A</option>
      </select>

      <div className="display-card">
        {filetedValue.map((val: any, index: any) => (
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
