import { CDN } from '@root/src/lib/assets';
import he from 'he';

export const htmlTemplate = ({
    title = 'The Guardian',
    description,
    linkedData,
    css,
    html,
    openGraphData,
}: {
    title?: string;
    description: string;
    linkedData: object;
    css: string;
    html: string;
    openGraphData: { [key: string]: string };
    keywords: string;
}) => {
    const favicon =
        process.env.NODE_ENV === 'production'
            ? 'favicon-32x32.ico'
            : 'favicon-32x32-dev-yellow.ico';

    const generateMetaTags = (
        dataObject: { [key: string]: string },
        attributeName: 'name' | 'property',
    ) => {
        if (dataObject) {
            return Object.entries(dataObject)
                .map(
                    ([id, value]) =>
                        `<meta ${attributeName}="${id}" content="${value}"/>`,
                )
                .join('\n');
        }
        return '';
    };

    const openGraphMetaTags = generateMetaTags(openGraphData, 'property');

    // Opt out of having information from our website used for personalization of content and suggestions for Twitter users, including ads
    // See https://developer.twitter.com/en/docs/twitter-for-websites/webpage-properties/overview
    const twitterSecAndPrivacyMetaTags = `<meta name="twitter:dnt" content="on">`;

    return `<!doctype html>
        <html lang="en">
            <head>
                <title>${title}</title>
                <meta name="description" content="${he.encode(description)}" />
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">

                <script type="application/ld+json">
                    ${JSON.stringify(linkedData)}
                </script>

                ${openGraphMetaTags}

                ${twitterSecAndPrivacyMetaTags}
                <style>
                body { max-width: 1024px; margin: 0 auto; }
                ul {margin: 0; padding: 0;}
                </style>
                <style>${css}</style>
            </head>

            <body>
                ${html}
            </body>
        </html>`;
};
