import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";

function Home() {
  const location = useLocation();
  const token = location.state.token;
  console.log(token);
  const api = `https://authentication-2wzz65y4q-iqranaz240.vercel.app/user/getUser`;
  axios.get(api, { headers: { "x-access-token": `${token}` } })
    .then(res => {
      console.log("Get User: ", res.data);
      this.setState({
        items: res.data,  /*set response data in items array*/
        isLoaded: true,
        redirectToReferrer: false
      })
    })

    axios.get("https://authentication-2wzz65y4q-iqranaz240.vercel.app/user/allUser")
    .then(res => {
      console.log("All User :", res.data);
      // this.setState({
      //   items: res.data,  /*set response data in items array*/
      //   isLoaded: true,
      //   redirectToReferrer: false
      // })
    })
      return (
        <div>
          <Navbar />
          <h3 className="pt-5 text-center">hello,i am Home Page</h3>
          <h5>{token}</h5>
        </div>
      )
    }

export default Home;
