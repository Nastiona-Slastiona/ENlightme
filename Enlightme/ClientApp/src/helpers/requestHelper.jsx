import serviceUrls from "src/constants/serviceUrls";

const requestHelper = {
    get: async (url, options = { method: 'GET' }, isAuth = false, withAuthorize = false) => {
        if (withAuthorize) {
            const accessToken = JSON.parse(localStorage.getItem('access'));
            options.headers.Authorization = `Bearer ${accessToken}`;
        }

        let data = await getRequest(url, options);

        if (isAuth && data.status === 401 && await refreshToken()) {
            const accessToken = JSON.parse(localStorage.getItem('access'));
            options.headers.Authorization = `Bearer ${accessToken}`;
            data = await getRequest(url, options);
        }
        
        return data;
    }
};

async function refreshToken() {
    const refresh = JSON.parse(localStorage.getItem('refresh'));
    const data = await getRequest(
        serviceUrls.refreshToken, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            refresh,
        }
    }
    )
    if (data.status === 200) {
        const access = JSON.stringify(data.json())['access']
        localStorage.setItem('access', access);
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

async function getRequest(url, options) {
    const response = await fetch(url, options);
    return errorHandler(response, options.method);
}

export default requestHelper;