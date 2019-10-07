import express from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';

const app = express();

app.get('/components/:component', async (req, resp) => {
    const componentID = req.params.component;
    const component = await import(`./${componentID}`);

    const markup = renderStylesToString(
        renderToStaticMarkup(component.default()),
    );

    resp.status(200).send({ html: markup });
});

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send({ error: err.stack });
});

app.listen(9070);
