import * as path from 'path';
import express, { Express } from 'express';

import { dist, root } from '@frontend/app/config';
import {
    render as renderAMPArticle,
    renderPerfTest as renderAMPArticlePerfTest,
} from '@frontend/amp/server/render';
import {
    render as renderArticle,
    renderPerfTest as renderArticlePerfTest,
} from '@frontend/web/server/render';

export const registerRoutes = (app: Express): Express => {
    app.get('/_healthcheck', (req, res) => {
        res.status(200).send('OKAY');
    });

    // if running prod server locally, serve local assets
    if (!process.env.GU_PUBLIC) {
        app.use(
            '/static/:site',
            express.static(
                path.relative(
                    __dirname,
                    path.resolve(root, 'packages', 'frontend', 'static'),
                ),
            ),
        );

        app.use('/assets', express.static(path.relative(__dirname, dist)));
    }

    app.use('/Article', renderArticle);
    app.use('/AMPArticle', renderAMPArticle);

    app.use('/ArticlePerfTest', renderArticlePerfTest);
    app.use('/AMPArticlePerfTest', renderAMPArticlePerfTest);

    app.get('/', (req, res) => {
        try {
            res.send(`
                <!DOCTYPE html>
                <html>
                <body>
                    <ul>
                        <li><a href="/Article">Article</a></li>
                        <li><a href="/AMPArticle">⚡️Article</a></li>
                        <li><a href="/ArticlePerfTest">⚡Article (perf test example)</a></li>
                        <li><a href="/AMPArticlePerfTest">⚡️Article (perf test example)</a></li>
                    </ul>
                    <ul>
                        <li><a href="/ArticlePerfTest">⚡Article (perf test example)</a></li>
                        <li><a href="/AMPArticlePerfTest">⚡️Article (perf test example)</a></li>
                    </ul>
                </body>
                </html>
            `);
        } catch (e) {
            res.status(500).send(`<pre>${e.stack}</pre>`);
        }
    });

    // express requires all 4 args here:
    app.use((err: any, req: any, res: any, next: any) => {
        res.status(500).send(`<pre>${err.stack}</pre>`);
    });

    return app;
};
