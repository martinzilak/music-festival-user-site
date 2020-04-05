const ENV = 'DEV';

export const LOCATIONS = 'locations';
export const ARTISTS = 'artists';
export const PERFORMANCES = 'performances';
export const LOGIN = 'auth/local';

const DEV_URL = 'http://localhost:1337';
const PROD_URL = 'https://music-festival-admin-panel.herokuapp.com';

export const getUrl = (location) => `${ENV.toLowerCase() === 'prod' ? PROD_URL : DEV_URL}/${location}`;
export const getPicture = (picture) => ENV.toLowerCase() === 'prod' ? picture.url : DEV_URL + picture.url;