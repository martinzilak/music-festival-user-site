const ENV = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';

export const LOCATIONS = 'locations';
export const ARTISTS = 'artists';
export const PERFORMANCES = 'performances';
export const LOGIN = 'auth/local';
export const REGISTER = `${LOGIN}/register`;
export const USERS = 'users';
export const ME = `${USERS}/me`;
export const ME_DEEP = `${USERS}/me-deep`;
export const MESSAGES = 'messages';
export const STAGES = 'stages';

const DEV_URL = 'http://localhost:1337';
const PROD_URL = 'https://music-festival-management.herokuapp.com';

export const getUrl = (location, id = undefined) => `${ENV.toLowerCase() === 'prod' ? PROD_URL : DEV_URL}/${location}${id ? `/${id}` : ''}`;
export const getPicture = (picture) => ENV.toLowerCase() === 'prod' ? picture.url : DEV_URL + picture.url;

export const groupByParam = (items, param) => items.reduce(
    (result, item) => ({
        ...result,
        [item[param]]: [
            ...(result[item[param]] || []),
            item,
        ],
    }),
    {},
);

export const COOKIE_NAME = 'festival-login-token';
export const COOKIE_OPTIONS = {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
};
