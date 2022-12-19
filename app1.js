const axios = require("axios");

const options = {
  method: 'POST',
  url: 'https://weather-embed.p.rapidapi.com/forecast/create',
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-forward-key': 'RapidAPI Application Key',
    'X-RapidAPI-Key': 'cda58c044dmsh66a8bef91eeb5a7p170cc5jsn5bb62be3887e',
    'X-RapidAPI-Host': 'weather-embed.p.rapidapi.com'
  },
  data: '{"city":"Uzbekistan","country":"Tashkent"}'
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});