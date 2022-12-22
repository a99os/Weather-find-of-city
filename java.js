function start() {
  (async () => {
    const inp = document.getElementById("example");

    const options1 = {
      method: "GET",
      url: "https://bing-image-search1.p.rapidapi.com/images/search",
      params: { q: inp.value || "Toshkent" },
      headers: {
        "X-RapidAPI-Key": "cda58c044dmsh66a8bef91eeb5a7p170cc5jsn5bb62be3887e",
        "X-RapidAPI-Host": "bing-image-search1.p.rapidapi.com",
      },
    };

    await axios
      .request(options1)
      .then(function (response) {
        console.log(response.data);
        document.body.style.backgroundImage = `url('${
          response.data.value[Math.floor(Math.random() * 15)].contentUrl
        }')`;
      })
      .catch(function (error) {
        console.error(error);
      });

    const result = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${
        inp.value || "Toshkent"
      }&limit=5&appid=aebc0727af6a8a074ee515ceece1c736`
    );
    const options = {
      method: "GET",
      url: `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${result.data[0].lat}/${result.data[0].lon}`,
      headers: {
        "X-RapidAPI-Key": "cda58c044dmsh66a8bef91eeb5a7p170cc5jsn5bb62be3887e",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };

    const Metadata = {
      lang: {
        english: result.data[0].local_names.en,
        russian: result.data[0].local_names.ru,
        country: result.data[0].country,
      },
      days: [],
      hours: [],
    };

    const { data } = await axios(options);
    let temp = 0;
    let count = 0;
    let day = 1;
    for (const i in data.list) {
      temp += data.list[i].main.temp;
      if (+i < 10) {
        Metadata.hours.push({
          date: data.list[i].dt_txt,
          temp: (data.list[i].main.temp - 273.15).toFixed(),
          wheather: data.list[day].weather[0],
        });
      }
      if ((count + 1) % 8 === 0) {
        Metadata.days.push({
          date: data.list[i].dt_txt,
          temp: (temp / 8 - 273.15).toFixed(),
          weather: data.list[day].weather[0],
        });
        temp = 0;
        day++;
      }
      count++;
    }
    console.log(Metadata);
    console.log(Metadata.days[0].wheather);
    console.log(inp.value);
    let h1 = "";
    Metadata.lang.english ? (h1 += Metadata.lang.english + " ") : null;
    Metadata.lang.russian ? (h1 += Metadata.lang.russian + " ") : null;
    Metadata.lang.country ? (h1 += Metadata.lang.country) : null;
    document.getElementById("cityName").innerHTML = h1;
    let str = "";

    for (const val of Metadata.hours) {
      str += `<div id="bir">
      <h3>${val.date.split(" ")[1].slice(0, 5)}</h3>
      <p>${val.date.split(" ")[0]}</p>
      <h4>${val.temp}°</h4>
      <h3>${val.wheather.main}</h3>
      <img src="https://openweathermap.org/img/wn/${
        val.wheather.icon
      }@2x.png" alt="" />
    </div>`;
    }
    console.log(str);
    document.getElementById("hour").innerHTML = str;
    let days = "";
    for (const val of Metadata.days) {
      days += `<div id="bir">
      <h3>${val.date.split(" ")[0]}</h3>
      <h4>${val.temp}°</h4>
      <h3>${val.weather.main}</h3>
      <img src="https://openweathermap.org/img/wn/${
        val.weather.icon
      }@2x.png" alt="" />
      </div>`;
    }
    document.getElementById("days").innerHTML = days;
  })();

  // document.getElementById("container").innerHTML = `<b>${inp.value}</b>`;
}
start();
