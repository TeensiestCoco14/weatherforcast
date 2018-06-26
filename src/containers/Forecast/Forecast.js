import React, {Component} from "react";
import axios from "axios";
import "./Forecast.css";
import DayCard from "../../components/DayCard/DayCard";
import cloudy from "../../assets/images/weatherIcons/cloudy.png";
import heavyRain from "../../assets/images/weatherIcons/heavy-rain.png";
import lightRain from "../../assets/images/weatherIcons/light-rain.png";
import partlyCloudy from "../../assets/images/weatherIcons/partly-cloudy.png";
import sleet from "../../assets/images/weatherIcons/sleet.png";
import snow from "../../assets/images/weatherIcons/snow.png";
import sunny from "../../assets/images/weatherIcons/sunny.png";
import thunderstorms from "../../assets/images/weatherIcons/thunderstorms.png";


class Forecast extends Component {
	
	state = {
		days: null,
	}

	componentWillMount() {
		axios.get("https://api.openweathermap.org/data/2.5/forecast?lat=37.5407246&lon=-77.4360481&APPID=")
			.then(response => {
				console.log(response);
				let weather = response.data.list;
				let day = weather[0].dt_txt.slice(0,10);
				let forecast = [];
				let dailyForecast = [];
				for (let i = 0; i < weather.length; ++i) {
					if(day == weather[i].dt_txt.slice(0, 10)) {
						dailyForecast.push(weather[i]);
					} else {
						day = weather[i].dt_txt.slice(0,10);
						forecast.push(dailyForecast);
						dailyForecast = [weather[i]];
					}
				}
				
				for(let i = 0; i < forecast.length; ++i) {
					for (let j = 0; j < forecast[i].length; ++j) {
						let date = new Date(forecast[i][j].dt_txt).getDay();
						switch(date) {
							case 0:
								date = "Sunday";
								break;
							case 1:
								date = "Monday";
								break;
							case 2:
								date = "Tuesday";
								break;
							case 3:
								date = "Wednesday";
								break;
							case 4:
								date = "Thursday";
								break;
							case 5:
								date = "Friday";
								break;
							case 6:
								date = "Saturday";
								break;
						}
						forecast[i][j].dt_txt = date;
					}
				}
				this.setState({days: forecast});
				console.log(this.state);
			});
	}

	findMin = (day) => {
		let min = day[0].main.temp_min;
		for (let i = 1; i < day.length; ++i) {
			if (day[i].main.temp_min < min) {
				min = day[i].main.temp_min;
			}
		}
		return Math.round(min * (9/5) - 459.67);
	}

	findMax = (day) => {
		let max = day[0].main.temp_max;
		for (let i = 0; i < day.length; ++i) {
			if (day[i].main.temp_max > max) {
				max = day[i].main.temp_max;
			}
		}
		return Math.round(max * (9/5) - 459.67);
	}

	



	render() {
		let days = <h3>Loading...</h3>;

		if (this.state.days) {
			days = this.state.days.map(day => {
				let icon = null;
				if(day[0].weather[0].main == "Clear") {
					icon = sunny;
				}else if (day[0].weather[0].main == "Rain") {
					if(day[0].weather[0].description == "light rain") {
						icon = lightRain;
					}else {
						icon = heavyRain;
					}
				}else if (day[0].weather[0].main == "Snow") {
					if(day[0].weather[0].description == "sleet" || day[0].weather[0].description == "shower sleet") {
						icon = sleet;
					}else {
						icon = snow
					}
				}else if (day[0].weather[0].main == "Thunderstorm") {
					icon = thunderstorms;
				}else if (day[0].weather[0].main == "Clouds") {
					if(day[0].weather[0].description == "few clouds" || day[0].weather[0].description == "scattered clouds") {
						icon = partlyCloudy;
					} else {
						icon = cloudy;
					}
				}else {
					icon = sunny;
				}
				return(
					<DayCard 
						key = {day[0].dt}
						day = {day[0].dt_txt}
						high = {this.findMax(day)}
						low = {this.findMin(day)}
						weather = {day[0].weather[0].description}
						weatherIcon = {icon}/>
				);
			})
		}

		return(
			<div>
				<h2>With the Forecast here's Johnny!</h2>
				<div>
					<h3>Here's the 5-Day Forecast!</h3>
					{days}
				</div>
			</div>
		);
	}
}

export default Forecast;