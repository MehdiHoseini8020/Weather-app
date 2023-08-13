import { useState, useEffect } from "react";
import "./weather2.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";

export default function Weather2() {
  const [userinput, setUserinput] = useState<string>("");
  const [find, setFind] = useState<any | undefined>("");
  const [load, setLoad] = useState<boolean>(false);
  const [mode, setMode] = useState<any>(1);

  async function getDataa() {
    setLoad(true);
    await fetch(
      `http://api.weatherapi.com/v1/current.json?key=4008513303054539b7b144118230608&q=${userinput}&aqi=no`
    )
      .then(async (res) => {
        if (res.ok) {
          let reza = await res.json();
          setFind(reza);
        } else {
          alert("Please Enter a correct City");
          setUserinput("");
          setFind(undefined);
        }
        setLoad(false);
        return res.json();
      })
      .catch((err) => {
        setLoad(false);
        console.error(err);
      });
  }
  useEffect(() => {
    if (!find) {
      setMode("tree.jpg");
    } else {
      if (find.current.is_day == 1) {
        setMode("day.jpg");
      } else {
        if (find.current.is_day == 0) {
          setMode("night2.jpg");
        }
      }
    }
  }, [find]);
  
  return (
    <div
      className="weather2_container"
      style={{ backgroundImage: `url(${mode})` }}
    >
      <div className="search2_box">
        <input
          onChange={(e) => {
            const regex = /^[A-Za-z ]+$/;
            if (e.target.value === "" || regex.test(e.target.value)) {
              setUserinput(e.target.value);
            }
          }}
          className="search2_inputs"
          placeholder="Weather of City ..."
          value={userinput}
        ></input>
        <div
          className="search_btn"
          onClick={() => {
            getDataa();
          }}
        >
          <SearchIcon />
        </div>
      </div>
      {load ? (
        <div className="dot-spinner">
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
      ) : (
        <>
          {find && (
            <>
              <div className="weather2_box">
                <div
                  className="refresh"
                  onClick={() => {
                    getDataa();
                  }}
                >
                  <RefreshIcon />
                </div>
                <div className="weather_icon_box">
                  <div className="icon_box">
                    <img src={find.current.condition.icon}></img>
                  </div>
                  <div className="weather_box">
                    {find.current.temp_c + "°C"}
                  </div>
                  <div className="text_box">{find.current.condition.text}</div>
                  <div className="time_box">{find.location.localtime}</div>
                </div>

                <div className="country_time_box">
                  <div className="country_box">
                    {find.location.country} {find.location.name}
                  </div>
                </div>

                <div className="information_box">
                  <div className="sun_hum">
                    <div className="sunrise">
                      <img
                        style={{ height: "45%", fill: "white",marginTop:"-15px" }}
                        src={"uv.png"}
                      ></img>
                      <img style={{ height: "32%" }} src={"humidity.svg"}></img>
                    </div>

                    <div className="humidity">
                      <div
                        style={{
                          height: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {find.current.uv}
                      </div>
                      <div
                        style={{
                          height: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {find.current.humidity + "%"}
                      </div>
                    </div>
                  </div>

                  <div className="wind_press">
                    <div className="wind">
                      <img style={{ height: "35%",marginTop:"-8px" }} src={"wind.svg"}></img>
                      <img style={{height: "25%"}} src={"pressure.svg"}></img>
                    </div>

                    <div className="pressure">
                      <div
                        style={{
                          height: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {find.current.wind_mph}
                      </div>
                      <div
                        style={{
                          height: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {find.current.pressure_in}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
