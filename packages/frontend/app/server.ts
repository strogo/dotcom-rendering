import * as path from 'path';
import express from 'express';
import compression from 'compression';

import { recordBaselineCloudWatchMetrics } from './aws/metrics-baseline';
import {
    getGuardianConfiguration,
    GuardianConfiguration,
} from './aws/aws-parameters';
import { log, warn } from '@root/scripts/env/log';
import { logger } from './logging';
import { registerRoutes } from './routes';

const port = process.env.PORT || 9000;

logger.info('dotcom-rendering is GO.');
getGuardianConfiguration('prod')
    .then((config: GuardianConfiguration) => {
        log(`loaded ${config.size()} configuration parameters`);
    })
    .catch((err: any) => {
        warn('Failed to get configuration. Bad AWS credentials?');
        warn(err);
    });

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(compression());

registerRoutes(app);

setInterval(() => {
    recordBaselineCloudWatchMetrics();
}, 10 * 1000);

app.listen(port);
