"use strict";

import path from 'path';
import appRoot from 'app-root-path';

export const IS_DEVELOPMENT = ['development', 'test'].includes(process.env.NODE_ENV);
export const ROOT = IS_DEVELOPMENT ? path.join(__dirname, 'src') : path.join(appRoot.path, 'dist');

export default Object.freeze({
    IS_DEVELOPMENT,
    appRoot
});