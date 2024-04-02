// cookieUtils.js

export const setAccessTokenCookie = (accessToken) => {
    document.cookie = `accessToken=${accessToken}; path=/; HttpOnly; Secure`;
};

export const getAccessTokenFromCookie = () => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === "accessToken") {
        return value;
    }
    }
    return null;
};

export const clearAccessTokenCookie = () => {
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure";
};
