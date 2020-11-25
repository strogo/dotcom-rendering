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

    return htmlTemplate({
        title,
        description: CAPI.trailText,
        linkedData,
        css,
        html,
        openGraphData,
        keywords,
    });
};
