export declare function startTestServer(portNumber: number | undefined): Promise<boolean>;
export declare function stopTestServer(): Promise<boolean>;
export declare function getTestResults(): JSON;
export declare function getTestServerState(): boolean;
export declare function getTestServerPort(): number;
export declare function pingTestServer(portNumber: number | undefined): Promise<Object>;
export declare function sendTestResults(data: Object, portNumber: number | undefined): Promise<boolean>;
