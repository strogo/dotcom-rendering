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

    // Duplicated prefetch and preconnect tags from DCP:
    // Documented here: https://github.com/guardian/frontend/pull/12935
    // Preconnect should be used for the most crucial third party domains
    // "use preconnect when you know for sure that you’re going to be accessing a resource"
    // - https://www.smashingmagazine.com/2019/04/optimization-performance-resource-hints/
    // DNS-prefetch should be used for other third party domains that we are likely to connect to but not sure (ads)
    // Preconnecting to too many URLs can reduce page performance
    // DNS-prefetch can also be used as a fallback for IE11
    // More information on preconnecting:
    // https://css-tricks.com/using-relpreconnect-to-establish-network-connections-early-and-increase-performance/
    // More information on prefetching:
    // https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch
    const staticPreconnectUrls = [
        `${CDN}`,
        `https://i.guim.co.uk`,
        `https://j.ophan.co.uk`,
        `https://ophan.theguardian.com`,
    ];

    const staticPrefetchUrls = [
        ...staticPreconnectUrls,
        `https://api.nextgen.guardianapps.co.uk`,
        `https://hits-secure.theguardian.com`,
        `https://interactive.guim.co.uk`,
        `https://ipv6.guim.co.uk`,
        `https://phar.gu-web.net`,
        `https://static.theguardian.com`,
        `https://support.theguardian.com`,
    ];

    const preconnectTags = staticPreconnectUrls.map(
        (src) => `<link rel="preconnect" href="${src}">`,
    );

    const prefetchTags = staticPrefetchUrls.map(
        (src) => `<link rel="dns-prefetch" href="${src}">`,
    );

    return `<!doctype html>
        <html lang="en">
            <head>
                <title>${title}</title>
                <meta name="description" content="${he.encode(description)}" />
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">
                <link rel="icon" href="https://static.guim.co.uk/images/${favicon}">

                ${preconnectTags.join('\n')}

                ${prefetchTags.join('\n')}

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
