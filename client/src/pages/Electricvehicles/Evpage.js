import React from "react";
// import Cars from "./Cars";
import UpcomingCars from "./UpcomingCars";
import RegisterFooter from "../../components/Login_Signup/RegisterFooter";
import "./ev-list.css";
import Navbar from "../../components/Navbar/Navbar";

const Evpage = (props) => {
	console.log(props);
	const isLoggedIn = Object.keys(props.user).length !== 0;

	return (
		<>
			<Navbar />
			<div className="evbody_final">
				<UpcomingCars />
				<RegisterFooter />
			</div>
		</>
	);
};

export default Evpage;
