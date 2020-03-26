var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const testServer_1 = require("./testServer");
function start(command) {
    return __awaiter(this, void 0, void 0, function* () {
        const port = getCommandOptionString(command.port, "");
        let testServerPort;
        if (port != undefined) {
            testServerPort = parseTestServerPort(port);
        }
        const serverStarted = yield testServer_1.startTestServer(testServerPort);
        if (serverStarted) {
            console.log(`Server started successfully on port ${testServerPort != undefined ? testServerPort : 8080}`);
        }
        else {
            console.log("Server failed to start");
        }
    });
}
exports.start = start;
function getCommandOptionString(option, defaultValue) {
    // For a command option defined with an optional value, e.g. "--option [value]",
    // when the option is provided with a value, it will be of type "string", return the specified value;
    // when the option is provided without a value, it will be of type "boolean", return undefined.
    return (typeof (option) === "boolean") ? defaultValue : option;
}
function parseNumericCommandOption(optionValue, errorMessage = "The value should be a number.") {
    switch (typeof (optionValue)) {
        case "number": {
            return optionValue;
        }
        case "string": {
            let result;
            try {
                result = parseInt(optionValue, 10);
            }
            catch (err) {
                throw new Error(errorMessage);
            }
            if (Number.isNaN(result)) {
                throw new Error(errorMessage);
            }
            return result;
        }
        case "undefined": {
            return undefined;
        }
        default: {
            throw new Error(errorMessage);
        }
    }
}
function parseTestServerPort(optionValue) {
    const testServerPort = parseNumericCommandOption(optionValue, "--dev-server-port should specify a number.");
    if (testServerPort !== undefined) {
        if ((testServerPort < 0) || (testServerPort > 65535)) {
            throw new Error("port should be between 0 and 65535.");
        }
    }
    return testServerPort;
}
//# sourceMappingURL=commands.js.map