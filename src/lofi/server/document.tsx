import React from 'react';
import { extractCritical } from 'emotion-server';
import { renderToString } from 'react-dom/server';
import { cache } from 'emotion';
import { CacheProvider } from '@emotion/core';
import { decidePillar } from '@root/src/lofi/lib/decidePillar';
import { LofiLayout } from '@root/src/lofi/layouts/LofiLayout';
import { htmlTemplate } from './htmlTemplate';

interface RenderToStringResult {
    html: string;
    css: string;
    ids: string[];
}

const replaceStrings = (html: string) => {
    const replacementPairs = [
        {
            old: `font-family:GuardianTextSans,Guardian Text Sans Web,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;`,
            new: `font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;`,
        },
        {
            old: `font-family:GH Guardian Headline,Guardian Egyptian Web,Georgia,serif;`,
            new: ``,
        },
        {
            old: `font-family:GuardianTextEgyptian,Guardian Text Egyptian Web,Georgia,serif;`,
            new: ``,
        },
    ];

    return replacementPairs.reduce(
        (prev, pair) => prev.split(pair.old).join(pair.new),
        html,
    );
};

export const document = ({ data }: Props) => {
    const { CAPI, NAV, linkedData } = data;
    const { designType } = CAPI;
    const pillar: Pillar = decidePillar(CAPI);
    const title = `${CAPI.headline} | ${CAPI.sectionLabel} | The Guardian`;
    const { html, css, ids: cssIDs }: RenderToStringResult = extractCritical(
        renderToString(
            // TODO: CacheProvider can be removed when we've moved over to using @emotion/core
            <CacheProvider value={cache}>
                <React.StrictMode>
                    <LofiLayout
                        CAPI={CAPI}
                        NAV={NAV}
                        designType={designType}
                        pillar={pillar}
                    />
                </React.StrictMode>
            </CacheProvider>,
        ),
    );

    const { openGraphData } = CAPI;

    const keywords =
        typeof CAPI.config.keywords === 'undefined' ||
        CAPI.config.keywords === 'Network Front'
            ? ''
            : CAPI.config.keywords;

    return replaceStrings(
        htmlTemplate({
            title,
            description: CAPI.trailText,
            linkedData,
            css,
            html,
            openGraphData,
            keywords,
        }),
    );
};
