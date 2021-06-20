import {
    AuthClient,
} from "./JsClient";

const host = "https://reqres.in";

const authClient = new AuthClient(host);


export {
    authClient
};