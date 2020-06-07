const ENV = 'DEV';

export const LOCATIONS = 'locations';
export const ARTISTS = 'artists';
export const PERFORMANCES = 'performances';
export const LOGIN = 'auth/local';
export const USERS = 'users';

const DEV_URL = 'http://localhost:1337';
const PROD_URL = 'https://music-festival-admin-panel.herokuapp.com';

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