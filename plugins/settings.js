export const DEV_URL = 'http://localhost:1337';
export const PROD_URL = 'https://music-festival-admin-panel.herokuapp.com';

export const LOCATIONS = '/locations';
export const ARTISTS = '/artists';

export const prodPic = (picture) => picture.url;
export const devPic = (picture) => DEV_URL + picture.url;