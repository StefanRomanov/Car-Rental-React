function fetcher(method) {

    const getAuthHeader =  () => {
        const token = window.localStorage.getItem('auth_token');
        return (token && token.length )
                ? {'Authorization' : `${token}`}
                : {}
    };

    return (url, data = {}, options = {}) => {
        const authHeader = getAuthHeader();

        return fetch(url,{
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                ...authHeader
            },
            body: Object.keys(data).length
                    ? JSON.stringify(data)
                    : undefined,
            ...options
        })
            .then(response => {
                if(response.headers['Expired']){
                    //TODO: Call service that refreshes the auth_token.
                }

                return response.json();
            })
    }
}

export default {
    get : fetcher('get'),
    post : fetcher('post'),
    put : fetcher('put'),
    remove : fetcher('delete')
}