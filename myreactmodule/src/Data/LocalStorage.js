const LocalStorage = function() {
    const setLoggedInUserData = (user, token,role) => {
        localStorage.setItem('loggedInUserData', JSON.stringify({ user: user, token: token ,role:role}));
    }
    const removeLoggedInUserData = () => {
        localStorage.removeItem('loggedInUserData');
    }
    const getLoggedInUserData = () => {
        let loggedInUserData = localStorage.getItem('loggedInUserData');
        if (loggedInUserData) {
            loggedInUserData = JSON.parse(loggedInUserData)
        } else {
            return null;
        }
        return loggedInUserData;
    }
    const setWeatherData =(weatherData)=>{
        localStorage.setItem('weatherData', JSON.stringify({ data: weatherData, time: new Date().getTime()}));
    }
    const removeWeatherData = () => {
        localStorage.removeItem('weatherData');
    }
    const getWeatherData = ()=>{
        let weatherData = localStorage.getItem('weatherData');
        if (weatherData) {
            weatherData = JSON.parse(weatherData)
        } else {
            return null;
        }
        return weatherData;
    }
    const setServerStatus =(ServerStatusData)=>{
        localStorage.setItem('ServerStatus', JSON.stringify({ data: ServerStatusData, time: new Date().getTime()}));
    }
    const removeServerStatus = () => {
        localStorage.removeItem('ServerStatus');
    }
    const getServerStatus = ()=>{
        let ServerStatus = localStorage.getItem('ServerStatus');
        if (ServerStatus) {
            ServerStatus = JSON.parse(ServerStatus)
        } else {
            return null;
        }
        return ServerStatus;
    }
    return {setLoggedInUserData: setLoggedInUserData,
        removeLoggedInUserData:removeLoggedInUserData,
        getLoggedInUserData:getLoggedInUserData,
        setWeatherData :setWeatherData,
        removeWeatherData : removeWeatherData,
        getWeatherData : getWeatherData,
        setServerStatus :setServerStatus,
        removeServerStatus : removeServerStatus,
        getServerStatus : getServerStatus


    };
}
export  { LocalStorage };