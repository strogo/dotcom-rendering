import express from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { renderStylesToString } from 'emotion-server';

const app = express();
const port = 3050;

app.get('/', (req, res) => {
    res.send(`
            <!DOCTYPE html>
            <html>
            <body>
                <ul>
                    <li><a href="/component/Example.ts">/component/:name</a></li>
                </ul>
            </body>
            </html>
        `);
});

app.get('/components/:name', async (req, res) => {
    // load relevant component
    const name = req.params.name;
    const component = await import(`./components/${name}`);
    const markup = renderStylesToString(
        renderToStaticMarkup(
            React.createElement(component[name], null), // get 'name' because no default exports atm
        ),
    );

    res.send({ markup });
});

// tslint:disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
