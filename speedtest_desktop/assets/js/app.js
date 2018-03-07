var SpeedTestNet = require('speedtest-net');

var type = {
  ping: 0,
  download: 1,
  upload: 2,
  title: 3
}
var options = {
  maxTime: 10000,
  proxy: null,
  pingCount: 10,
  log: true
}
var percent = 0;
var completedUpload = false;
var completedDownload = false;

var speedtest = SpeedTestNet(options);

function rendertext(type, value) {
  switch (type) {
    case 0:
      document.querySelector("div.ping").innerHTML = value
      document.querySelector("h3.ping").classList.toggle("hide", false)
      document.querySelector("div.ping").classList.toggle("finish", true)
      break;
    case 1:
      document.querySelector("div.down").innerHTML = value
      document.querySelector("h3.down").classList.toggle("hide", false)
      if(completedDownload)
      document.querySelector("div.down").classList.toggle("finish", true)
      break;
    case 2:
      document.querySelector("div.upl").innerHTML = value
      document.querySelector("h3.upl").classList.toggle("hide", false)
      if(completedUpload)
      document.querySelector("div.upl").classList.toggle("finish", true)
      break;
    case 3:
      document.querySelector(".servinfo").innerHTML = value
      break;
  }
}

function speedText(speed) {
  var places = (speed < 2 ? 2 : 1);
  var str = speed.toFixed(places);
  return str;
}

function incpercent(value) {
  percent += value
  if (percent >= 100)
    document.querySelector(".percent").style["background"] = "rgb(233, 30, 99)"
  document.querySelector(".percent").style["width"] = percent + "%"
}



speedtest.once('testserver', function (info) {
  console.log(info.sponsor + ', ' + info.country + ' - ' + info.name, type.title)
  rendertext(type.title, info.sponsor + ', ' + info.country + ' - ' + info.name);
  var ping = Math.ceil(Math.round(info.bestPing * 10) / 10);
  rendertext(type.ping, ping)
  incpercent(10)
});
speedtest.on('downloadspeedprogress', function (speed) {
  if (!completedDownload) {
    rendertext(type.download, speedText(speed))
    incpercent(2)

  }
});
speedtest.on('uploadspeedprogress', function (speed) {
  if (!completedUpload) {
    rendertext(type.upload, speedText(speed))
    incpercent(2)
  }
});
speedtest.once('downloadspeed', function (speed) {
  completedDownload = true;
  rendertext(type.download, speedText(speed))
});
speedtest.once('uploadspeed', function (speed) {
  completedUpload = true;
  rendertext(type.upload, speedText(speed))
  incpercent(60)
});