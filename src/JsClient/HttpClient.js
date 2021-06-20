class HttpClient {
    async makeRequest(url, method, data, headers) {
        try {
            let options = {
                method: method,
                headers: headers
            };
            let isBodyAllowed = method !== 'GET' && method !== 'HEAD';
            if (isBodyAllowed && data)
                options['body'] = JSON.stringify(data);
            let resp = await fetch(url, options);
            let code = resp.status;
            let json;
            try {
                json = await resp.json();
            } catch (parseError) {
                return {
                    status: code,
                    networkError: false
                };
            }
            return {
                status: code,
                body: json,
                networkError: false
            };
        } catch (error) {
            console.log(error);
            return {
                networkError: true
            };
        }
    }
    getUrl(baseUrl, queryParams) {
        let url = new URL(baseUrl);
        Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
        return url;
    }
}
export default HttpClient;