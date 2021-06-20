import HttpClient from "../JsClient/HttpClient";

class AuthClient extends HttpClient {
    constructor(host) {
        super();
        this.host = host;
    }

    async login(data) {
        let url = this.host + "/api/login";
        let headers = {};
        headers['Content-Type'] = "application/json";
        return this.makeRequest(
            url,
            "POST",
            data,
            headers
        );
    }





}

export default AuthClient;