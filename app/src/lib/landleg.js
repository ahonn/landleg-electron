import os from 'os';
import md5 from 'md5';
import fetch from 'node-fetch';

const LOGIN_URL = 'http://enet.10000.gd.cn:10001/client/login';
const LOGOUT_URL = 'http://enet.10000.gd.cn:10001/client/logout';
const ACTIVE_URL = 'http://enet.10000.gd.cn:8001/hbservice/client/active?';
const SECRET = 'Eshore!@#';
const WIFI = '4060';
const NASIP = '219.128.230.1';

function getClient(type) {
  var ip, mac;
  var ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function (ifname) {
    ifaces[ifname].forEach(function (iface) {
      if (iface.family === 'IPv4' && iface.address.split('.')[0] == '10' && !ip) {
        ip = iface.address;
        mac = iface.mac;
      }
    });
  });
  return type === 'ip' ? ip : mac;
}

exports.getClientIP = function () {
  return getClient('ip');
};

exports.getClientMAC = function () {
  return getClient('mac');
}

exports.active = function (options, callback) {
  const timestamp = (new Date()).getTime();
  const authenticator = md5(options.ip + NASIP + options.mac + timestamp + SECRET).toUpperCase();

  const params = {
    username: options.username,
    clientip: options.ip,
    nasip: NASIP,
    mac: options.mac,
    timestamp: timestamp,
    authenticator: authenticator,
  };
  const params_str = Object.keys(params).map(function (prop) {
    return [prop, params[prop]].join('=');
  }).join('&'); 
  const url = ACTIVE_URL + params_str;

  fetch(url)
    .then((res) => {
      return res.json();
    }).then(function(json) {
      callback(json);
    });
};

exports.login = function (options, callback) {
  const timestamp = (new Date()).getTime();
  const authenticator = md5(options.ip + NASIP + options.mac + timestamp + SECRET).toUpperCase();

  const params = {
    username: options.username,
    password: options.password,
    verificationcode: '',
    clientip: options.ip,
    nasip: NASIP,
    mac: options.mac,
    iswifi: WIFI,
    timestamp: timestamp,
    authenticator: authenticator
  };

  fetch(LOGIN_URL, { method: 'POST', body: JSON.stringify(params) })
    .then((res) => {
      return res.json();
    }).then(function(json) {
      callback(json);
    });
};

exports.logout = function (options, callback) {
  const timestamp = (new Date()).getTime();
  const authenticator = md5(options.ip + NASIP + options.mac + timestamp + SECRET).toUpperCase();

  const params = {
    clientip: options.ip,
    nasip: NASIP,
    mac: options.mac,
    timestamp: timestamp,
    authenticator: authenticator
  };

  fetch(LOGOUT_URL, { method: 'POST', body: JSON.stringify(params) })
    .then((res) => {
      return res.json();
    }).then(function(json) {
      callback(json);
    });
};

