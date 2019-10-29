"use strict";

import path from 'path';
import appRoot from 'app-root-path';

export const IS_DEVELOPMENT = ['development', 'test'].includes(process.env.NODE_ENV);
export const ROOT = IS_DEVELOPMENT ? path.join(__dirname, 'src') : path.join(appRoot.path, 'dist');
export const port = process.env.PORT ? process.env.PORT : "8080";
export const PUBLIC_PATH = path.join(__dirname, 'public');
export const VIEW_PATH = path.join(PUBLIC_PATH, 'views');
export default Object.freeze({
    IS_DEVELOPMENT,
    appRoot,
    port,
    PUBLIC_PATH,
    VIEW_PATH
});