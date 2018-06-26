import React from "react";
import "./DayCard.css";
import {Link} from "react-router-dom";


const dayCard = (props) => {
	return(
		<Link
			style = {{
				textDecoration: "none",
				color: "black"
			}}
			to = {{
				pathname: "/" + props.day
			}}>
			<div className = "Card">
				<h3>{props.day}</h3>
				<img src = {props.weatherIcon} alt = {props.weather} style = {{height: "75px", width: "75px"}}/>
				<div>
					<h4>Low: {props.low}&#8457;</h4>
					<h4>High: {props.high}&#8457;</h4>
				</div>
			</div>
		</Link>
	);
}

export default dayCard; 