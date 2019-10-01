import express from 'express';
import compression from 'compression';

import { recordBaselineCloudWatchMetrics } from './aws/metrics-baseline';
import { registerRoutes } from './routes';

const port = process.env.PORT || 3030;

const go = async () => {
    /*     const webpackConfig = await require(`${root}/webpack.dev.config.js`);
    const compiler: any = await webpack(webpackConfig);
    */

    const app = express();

    app.use(express.json({ limit: '50mb' }));
    app.use(compression());

    /*     app.use(
        webpackDevMiddleware(compiler, {
            serverSideRender: true,
            logLevel: 'silent',
            publicPath: '/assets/javascript/',
        }),
    );

    app.use('/assets', express.static(path.relative(__dirname, dist)));

    app.use(
        `/static/frontend`,
        express.static(path.join(root, 'packages', 'frontend', 'static')),
    ); */

    registerRoutes(app);

    setInterval(() => {
        recordBaselineCloudWatchMetrics();
    }, 10 * 1000);

    app.listen(port);
};

go();
