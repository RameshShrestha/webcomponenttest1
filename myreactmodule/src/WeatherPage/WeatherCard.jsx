
import { useContext } from "react";
import { UserLocationContext } from "../Data/ContextHandler/UserLocationContext";

function WeatherCard() {
    //   const [todayWeather, setTodayWeather] = useState(weatherDataBengaluru);
    const { weatherToday } = useContext(UserLocationContext);
    let todayWeather = weatherToday;
  //  console.log( todayWeather);
    // let weatherData = weatherForcast?.list;
    return <>
     {todayWeather && 
        <div style={{ background: "#2b3f68", color: "white", width: "280px", padding: "20px" }}>
           
            <div style={{ marginLeft: " 10px", fontSize: "20px", fontWeight: "bold" }}>{todayWeather.name},{todayWeather.sys.country}</div>
            {/* <div style={{ display: "flex", justifyContent: "space-around" }}> */}
            <div style={{ textAlign: "center" }}>
                <div><img height={100} alt="weather icon" src={`https://openweathermap.org/img/w/${todayWeather.weather[0].icon}.png`} /></div>
                <div style={{ fontWeight: "bold" }}>{todayWeather.weather[0].main} </div>
            </div>
            <div>
                <div style={{ fontSize: "50px", display: "flex", alignItems: "center" }}>{todayWeather.main.temp} °C</div>
                <div>Feels like {todayWeather.main.feels_like} °C , {todayWeather.weather[0].description}</div>
            </div>


        </div>
        }
    </>
}
export default WeatherCard;