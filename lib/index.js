import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';

import pkg from '../package';
import routes from './routes';

const server = express();

if (process.env.NODE_ENV === 'production') {
  server.use(compression());
  server.use(morgan('combined'));
} else {
  server.use(morgan('dev'));
}

server.disable('x-powered-by');
server.use(bodyParser.json());
server.use(cookieParser());

/*
 * SECURITY MODULES
 * Helmet is a suite of security middlewares to protect against common attacks
 */
server.use(hpp());
/*
 * Add a content security policy
 * server.use(helmet.contentSecurityPolicy({
 *   directives: {
 *     defaultSrc: [ "'self'" ],
 *     scriptSrc: [ "'self'" ],
 *     styleSrc: [ "'self'" ],
 *     imgSrc: [ 'data:' ],
 *     objectSrc: []
 *   },
 *   setAllHeaders: false
 * }));
*/
server.use(helmet.xssFilter());
server.use(helmet.frameguard('deny'));
server.use(helmet.ieNoOpen());
server.use(helmet.noSniff());

/*
 * Register our routes
 */
routes(server);

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`${pkg.name}:${pkg.version} is running on port ${port}`);
});
