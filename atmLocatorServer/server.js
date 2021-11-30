const http = require('http');
const url = require('url');

let atms = generateAtms();
let options = ["contactless", "withdraw", "deposit", "vault", "coinDeposit"];
let users = [{username: "admin", password: "admin", token: "adminToken"}, 
            {username: "user", password: "user", token: "userToken"}];

http.createServer(function (req, res) {
  if (req.method == "GET") {
    return handleGetReq(req, res);
  } else if (req.method == "POST") {
    return handlePostReq(req, res);
  }
}).listen(8080, () => {
  console.log(`Server is running on http://localhost:8080`);
});

function handleGetReq(req, res) {
  let path = url.parse(req.url, true);

  if (path.pathname === '/atms') {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    var query = path.query;

    if (query.id !== undefined){
      return res.end(JSON.stringify(atms.filter(atm => atm.id == query.id)[0]));
    }

    return res.end(JSON.stringify(atms))
  } else if (path.pathname === '/atmOptions') {
    res.setHeader('Content-Type', 'application/json;charset=utf-8');
    return res.end(JSON.stringify(options))
  }
  
  return handleError(res, 404)
}

function handlePostReq(req, res) {
  let path = url.parse(req.url, true);
  
  var body = '';
  req.on('data', function (data) {
      body += data;

      if (body.length > 1e6)
      req.connection.destroy();
  });

  req.on('end', function () {
      var postBody = JSON.parse(body);

      if (path.pathname == '/login') {
        users.forEach(user => {
          if(user.username == postBody.username && user.password == postBody.password)
            return res.end(user.token);
        })

        console.log(path);

        return handleError(res, 403);
      } else if (path.pathname == '/atm') {
        atms[postBody.id] = postBody;

        return res.end();
      }
  });
}

function handleError (res, code) { 
  res.statusCode = code 
  res.end(`{"error": "${http.STATUS_CODES[code]}"}`) 
} 

function generateAtms() {
  let midnight = new Date("1970-01-01T00:00:00.000+00:00");
  let am8 = new Date("1970-01-01T08:00:00.000+00:00");
  let pm4 = new Date("1970-01-01T16:00:00.000+00:00");
  let pm9 = new Date("1970-01-01T21:00:00.000+00:00");
  let pm10 = new Date("1970-01-01T22:00:00.000+00:00");

  let am8pm9 = { from: am8, to: pm9 };
  let am8pm10 =  { from: am8, to: pm10};
  let always = { from: midnight, to: midnight };
  let classic = { from: am8, to: pm4 };

  //sunday is at index 0
  let storeWorkingHour = [am8pm9, am8pm10, am8pm10, am8pm10, am8pm10, am8pm10, am8pm9];
  let roundTheClock = [always, always, always, always, always, always, always];
  let notWorkingWeekends = [undefined, classic, classic, classic, classic, classic, undefined];
  let demoClosed = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];

  let standardAtm = ["withdraw"];
  let contactlessAtm = ["contactless", "withdraw"];
  let depositAtm = ["withdraw", "deposit"];
  let vault = ["vault"];
  let standardBank = ["contactless", "withdraw", "deposit"];
  let coinDeposit = ["contactless", "withdraw", "deposit", "coinDeposit"];
  let full = ["contactless", "withdraw", "deposit", "coinDeposit", "vault"];

  let atms = [];
  atms.push({id: 0, address: "Dubečka bb, Okretište Dubec, Zagreb", options: standardAtm, workingHours: storeWorkingHour, geoLocation: [16.079428, 45.828046]});
  atms.push({id: 1, address: "Zagrebačka 15, Sesvete", options: coinDeposit, workingHours: roundTheClock, geoLocation: [16.106851, 45.827448]});
  atms.push({id: 2, address: "Dubrava 47, Zagreb", options: standardBank, workingHours: roundTheClock, geoLocation: [16.050426, 45.828398]});
  atms.push({id: 3, address: "Slavonska avenija 11d, Zagreb", options: standardAtm, workingHours: storeWorkingHour, geoLocation: [16.050862, 45.802457]});
  atms.push({id: 4, address: "Maksimirska 86-88, Zagreb", options: standardBank, workingHours: roundTheClock, geoLocation: [16.007752, 45.817276]});
  atms.push({id: 5, address: "Ilica 38, Zagreb", options: vault, workingHours: roundTheClock, geoLocation: [15.970953, 45.813322]});
  atms.push({id: 6, address: "Vlaška 106, Zagreb", options: full, workingHours: roundTheClock, geoLocation: [15.994848, 45.814126]});
  atms.push({id: 7, address: "Savska cesta 60, Zagreb", options: vault, workingHours: roundTheClock, geoLocation: [15.960637, 45.798461]});
  atms.push({id: 8, address: "Miramarska cesta 23, Zagreb", options: full, workingHours: roundTheClock, geoLocation: [15.975466, 45.802093]});
  atms.push({id: 9, address: "Zinke Kunc 2, Zagreb", options: full, workingHours: roundTheClock, geoLocation: [15.996818, 45.792926]});
  atms.push({id: 10, address: "Trg J.F.Kennedyja 6, Zagreb", options: contactlessAtm, workingHours: roundTheClock, geoLocation: [16.011656, 45.816003]});
  atms.push({id: 11, address: "Radnička 26, Zagreb", options: standardBank, workingHours: demoClosed, geoLocation: [15.977823, 45.816003]});
  atms.push({id: 12, address: "Zagrebačka 12, Zagreb", options: vault, workingHours: demoClosed, geoLocation: [15.985485, 45.823548]});

  return atms;
}
