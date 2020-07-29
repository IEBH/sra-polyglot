export const createToken = (query) => {
    return new Promise((resolve, reject) => {
        var body = {
            Data: {
                query: query
            },
            Referrer: "polyglot"
        }
        fetch("http://localhost:4040/exchange", {
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
        fetch("http://localhost:4040/exchange?token=".concat(token), {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(function (res) {
            resolve(res.data.query);
        }).catch(err => reject(err)); 
    })
}