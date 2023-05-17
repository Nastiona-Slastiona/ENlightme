import serviceUrls from "src/constants/serviceUrls";

const requestHelper = {
    get: async (url, options = { method: 'GET' }, isAuth = false, withAuthorize = false) => {
        if (withAuthorize) {
            const accessToken = JSON.parse(localStorage.getItem('access'));
            options.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        let data = await getRequest(url, options, isAuth);

        return data;
    }
};

async function refreshToken() {
    const refreshToken = JSON.parse(localStorage.getItem('refresh'));

    const data = await getRequest(
        serviceUrls.refreshToken, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        credentials: 'include',
        body: JSON.stringify({
            refreshToken,
        })
    }, true);

    if (data.status === 200) {
        const access = JSON.stringify(data.json())['accessToken']
        localStorage.setItem('access', access);

        const refresh = JSON.stringify(data.json())['refreshToken']
        localStorage.setItem('refresh', refresh);
        return true
    }
    return false
}

function errorHandler(response) {
    if (!response.ok) {
        return response.text().then(text => { throw new Error(text) });
    }
    
    return response.json();
}

async function getRequest(url, options, isAuth=false) {
    const response = await fetch(url, options);
    
    if (isAuth && response.status === 401) {
        await refreshToken();
        const accessToken = JSON.parse(localStorage.getItem('access'));
        options.headers.Authorization = `Bearer ${accessToken}`;
        response = await fetch(url, options);
        console.log(response);
    }

    return response.json();
}

export default requestHelper;