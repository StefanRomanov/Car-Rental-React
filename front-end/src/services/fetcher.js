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
                if(response.status === 410){
                    window.location.href = '/logout';
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