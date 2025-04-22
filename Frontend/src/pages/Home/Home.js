import React from "react";
// import Layout from "../../components/Layouts/Layout";
import "../../styles/HomeStyle.css";



import menu from "./Menu";

import Layout from "../../components/Layout";
import Homepage from "./Homepage";



const Home = () => {
    fetch("http://localhost:10000/user/get-user/", {
        method: 'GET',
        credentials: 'include'
    }).then(e=>{
        if(e.status !=200)
            window.location="http://localhost:3000/Login"
    }).catch(()=>{
        console.log("Hello")
    })
    return (
        <>
            <Layout>


                <Homepage />
                


               






            </Layout>
        </>
    );
};

export default Home;