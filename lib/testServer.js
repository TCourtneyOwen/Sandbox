var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const xmlhttprequest_ts_1 = require("xmlhttprequest-ts");
const app = express();
let port = 8080;
let server;
let testServerStarted = false;
let jsonData;
function startTestServer(portNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (portNumber !== undefined) {
                port = portNumber;
            }
            process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
            const key = fs.readFileSync('certs/server.key');
            const cert = fs.readFileSync('certs/server.crt');
            const options = { key: key, cert: cert };
            app.use(cors());
            app.get("/ping", function (req, res, next) {
                res.send(process.platform === "win32" ? "Win32" : "Mac");
                resolve(true);
            });
            app.post("/results", function (req, res) {
                res.send("200");
                jsonData = JSON.parse(req.query.data);
                resolve(true);
            });
            const https = require("https");
            server = https.createServer(options, app);
            // listen for new web clients:
            try {
                server.listen(port, function () {
                    testServerStarted = true;
                    resolve(true);
                });
            }
            catch (err) {
                reject(new Error(`Unable to start test server. \n${err}`));
            }
        }));
    });
}
exports.startTestServer = startTestServer;
function stopTestServer() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (testServerStarted) {
                try {
                    server.close();
                    testServerStarted = false;
                    resolve(true);
                }
                catch (err) {
                    reject(new Error(`Unable to stop test server. \n${err}`));
                }
            }
            else {
                // test server not started
                resolve(false);
            }
        }));
    });
}
exports.stopTestServer = stopTestServer;
function getTestResults() {
    return jsonData;
}
exports.getTestResults = getTestResults;
function getTestServerState() {
    return testServerStarted;
}
exports.getTestServerState = getTestServerState;
function getTestServerPort() {
    return port;
}
exports.getTestServerPort = getTestServerPort;
function pingTestServer(portNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (portNumber !== undefined) {
                port = portNumber;
            }
            const serverResponse = {};
            const serverStatus = "status";
            const platform = "platform";
            const xhr = new xmlhttprequest_ts_1.XMLHttpRequest();
            const pingUrl = `https://localhost:${port}/ping`;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    serverResponse[serverStatus] = xhr.status;
                    serverResponse[platform] = xhr.responseText;
                    resolve(serverResponse);
                }
                else if (xhr.readyState === 4 && xhr.status === 0 && xhr.responseText.indexOf("ECONNREFUSED") > 0) {
                    reject(xhr.responseText);
                }
            };
            xhr.open("GET", pingUrl, true);
            xhr.send();
        }));
    });
}
exports.pingTestServer = pingTestServer;
function sendTestResults(data, portNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (portNumber !== undefined) {
                port = portNumber;
            }
            const json = JSON.stringify(data);
            const xhr = new xmlhttprequest_ts_1.XMLHttpRequest();
            const url = `https://localhost:${port}/results/`;
            const dataUrl = url + "?data=" + encodeURIComponent(json);
            xhr.open("POST", dataUrl, true);
            xhr.send();
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200 && xhr.responseText === "200") {
                    resolve(true);
                }
                else if (xhr.readyState === 4 && xhr.status === 0 && xhr.responseText.indexOf("ECONNREFUSED") > 0) {
                    reject(false);
                }
            };
        }));
    });
}
exports.sendTestResults = sendTestResults;
//# sourceMappingURL=testServer.js.map