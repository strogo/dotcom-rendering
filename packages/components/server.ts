import express from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/components/:component', async (req, resp) => {
    const componentID = req.params.component;
    const component = await import(`./${componentID}`);

    // Some components are async, so coerce all into promises and then await
    const resolved = await Promise.resolve(component.default());

    const markup = renderStylesToString(renderToStaticMarkup(resolved));

    if (req.query.json !== undefined) {
        resp.status(200).send({ html: markup });
        return;
    }

    const doc = `
    <html lang="en">
    <head>
        <title>${componentID}</title>
        </head>
        <body>${markup}</body>
    </html>
    `;

    resp.status(200).send(doc);
});

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send({ error: err.stack });
});

app.listen(9070);
