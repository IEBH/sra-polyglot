export const createToken = (query, seeds) => {
    return new Promise((resolve, reject) => {
        var body = {
            data: {
                query, 
                seeds
            },
            referrer: "polyglot"
        }
        console.log(JSON.stringify(body));
        fetch("https://ielab-sysrev3.uqcloud.net/exchange", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        }).then(function (response) {
            return response.text();
        }).then(function (newToken) {
            resolve(newToken);
        }).catch(err => reject(err)); 
    })
}

export const getQuery = (token) => {
    return new Promise((resolve, reject) => {
        fetch("https://ielab-sysrev3.uqcloud.net/exchange?token=".concat(token), {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(function (res) {
            resolve([res.data.query, res.data.seeds]);
        }).catch(err => reject(err)); 
    })
}