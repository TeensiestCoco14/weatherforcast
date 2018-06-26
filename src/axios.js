import axios from "axios";


//instances can be used for creating multiple based url
//for different parts of your app
const instance = axios.create({
	baseURL: ""
});


export default instance;