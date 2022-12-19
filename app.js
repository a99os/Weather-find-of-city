const axios = require("axios");
(async () => {
  const result = await axios.get(
    "http://api.openweathermap.org/geo/1.0/direct?q=Parkent&limit=5&appid=aebc0727af6a8a074ee515ceece1c736"
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
    if (+i < 12) {
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
})();
