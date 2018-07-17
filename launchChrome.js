// const chromeLauncher = require('chrome-launcher');

// chromeLauncher.launch({
  
//   startingUrl: 'http://localhost:8081/debugger-ui/',
//   connectionPollInterval: 1000
// }).then(chrome => {
//   console.log(`Chrome debugging port running on ${chrome.port}`);
// });

var childProcess = require('child_process'); 
childProcess.exec('start chrome localhost:8081/debugger-ui');

const chromeLauncher = require('chrome-launcher');

// chromeLauncher.launch({
//   startingUrl: 'https://google.com',
//   chromeFlags: ['--headless', '--disable-gpu']
// }).then(chrome => {
//   console.log(`Chrome debugging port running on ${chrome.port}`);
// });