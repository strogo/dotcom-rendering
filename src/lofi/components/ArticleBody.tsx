import React from 'react';
import { css, cx } from 'emotion';

import { border } from '@guardian/src-foundations/palette';
import { between } from '@guardian/src-foundations/mq';
import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { ArticleRenderer } from '@root/src/lofi/lib/ArticleRenderer';

type Props = {
    pillar: Pillar;
    blocks: Block[];
    designType: DesignType;
    adTargeting: AdTargeting;
    host?: string;
};

const pillarColours = pillarMap(
    (pillar) =>
        css`
            color: ${pillar === 'opinion' || pillar === 'culture'
                ? pillarPalette[pillar].dark
                : pillarPalette[pillar].main};
        `,
);

const bodyStyle = css`
    ${between.tablet.and.desktop} {
        padding-right: 80px;
    }

    h2 {
        font-weight: bold;
    }

    strong {
        font-weight: bold;
    }

    img {
        width: 100%;
        height: auto;
    }
`;

const linkColour = pillarMap(
    (pillar) => css`
        a {
            text-decoration: none;
            border-bottom: 1px solid ${border.secondary};
            ${pillarColours[pillar]};

            :hover {
                border-bottom: 1px solid ${pillarPalette[pillar].main};
            }
        }
    `,
);

export const ArticleBody = ({ pillar, blocks, designType, host }: Props) => {
    return (
        <div className={cx(bodyStyle, linkColour[pillar])}>
            <ArticleRenderer
                elements={blocks[0] ? blocks[0].elements : []}
                pillar={pillar}
                designType={designType}
                host={host}
            />
        </div>
    );
};
