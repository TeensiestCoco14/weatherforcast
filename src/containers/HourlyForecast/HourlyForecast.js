import React, {Component} from "react";
import axios from "axios"
import {Link} from "react-router-dom";

import HourCard from "../../components/HourCard/HourCard";

import cloudy from "../../assets/images/weatherIcons/cloudy.png";
import heavyRain from "../../assets/images/weatherIcons/heavy-rain.png";
import lightRain from "../../assets/images/weatherIcons/light-rain.png";
import partlyCloudy from "../../assets/images/weatherIcons/partly-cloudy.png";
import sleet from "../../assets/images/weatherIcons/sleet.png";
import snow from "../../assets/images/weatherIcons/snow.png";
import strongWinds from "../../assets/images/weatherIcons/strong-winds.png";
import sunny from "../../assets/images/weatherIcons/sunny.png";
import thunderstorms from "../../assets/images/weatherIcons/thunderstorms.png";

class HourlyForecast extends Component {
	state = {
		day: null,
		lat: null,
		long: null
	}

	componentDidMount() {
		this.getLocation();
	}

	componentDidUpdate() {
		if (!this.state.day && this.state.lat && this.state.long) {
			axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=" + this.state.lat + "&lon=" + this.state.long + "&APPID=8c282803ea9759bc4e1503e68fd68174")
			.then(response => {
				let weather = response.data.list;
				let day = null;
				let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
				let hourly = [];
				for(let i = 0; i < weather.length; ++i) {
					day = new Date(weather[i].dt_txt);
					day = day.getDay();
					day = daysOfWeek[day];
					if (day === this.props.match.params.day) {
						hourly.push(weather[i]);
					}
				}
				this.setState({
					day: this.props.match.params.day,
					hours: hourly
				});
				console.log(weather);
				console.log(this.state);
			});
		}
	}

	getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.setPosition);
		} else {
			alert("Location not supported");
		}
	}

	setPosition = (position) => {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;
		this.setState({
			lat: lat,
			long: long
		});
	}

	render() {
		
		let hours = null;

		if (this.state.hours) {
			hours = this.state.hours.map(hour => {
				let icon = null;
				if(hour.weather[0].main === "Clear") {
					icon = sunny;
				}else if (hour.weather[0].main === "Rain") {
					if(hour.weather[0].description === "light rain") {
						icon = lightRain;
					}else {
						icon = heavyRain;
					}
				}else if (hour.weather[0].main === "Snow") {
					if(hour.weather[0].description === "sleet" || hour.weather[0].description === "shower sleet") {
						icon = sleet;
					}else {
						icon = snow
					}
				}else if (hour.weather[0].main === "Thunderstorm") {
					icon = thunderstorms;
				}else if (hour.weather[0].main === "Clouds") {
					if(hour.weather[0].description === "few clouds" || hour.weather[0].description === "scattered clouds") {
						icon = partlyCloudy;
					} else {
						icon = cloudy;
					}
				}else {
					icon = sunny;
				}
				return(
					<HourCard 
						key = {hour.dt}
						time = {hour.dt_txt.slice(11)}
						temp = {Math.round(hour.main.temp * (9/5) - 459.67)}
						weather = {hour.weather[0].description}
						icon = {icon} />
				);
			})
		}

		return(
			<div>
				<Link to = "/">Back</Link>
				<div>
					<h2>{this.state.day}'s Hourly Forecast</h2>
					{hours}
				</div>
			</div>
		);
	}
}

export default HourlyForecast;