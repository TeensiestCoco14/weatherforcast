import React from "react";
import "./HourCard.css";

const hourCard = (props) => {
	return(
		<div className = "Hour">
			<h3>{props.time}</h3>
			<img src = {props.icon} alt = {props.weather} />
			<h5>{props.temp}&#8457;</h5>
		</div>
	);
}

export default hourCard;