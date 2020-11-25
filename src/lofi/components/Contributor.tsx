import React from 'react';
import { css } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { pillarPalette } from '@root/src/lib/pillars';

import { BylineLink } from '@root/src/lofi/components/BylineLink';

const bylineStyle = (pillar: Pillar) => css`
    ${headline.xxxsmall()};
    color: ${pillarPalette[pillar].main};
    padding-bottom: 8px;
    font-style: italic;

    a {
        font-weight: 700;
        color: ${pillarPalette[pillar].main};
        text-decoration: none;
        font-style: normal;
        :hover {
            text-decoration: underline;
        }
    }
`;

export const Contributor: React.FC<{
    author: AuthorType;
    tags: TagType[];
    pillar: Pillar;
}> = ({ designType, author, tags, pillar }) => {
    if (!author.byline) {
        return null;
    }

    return (
        <address
            aria-label="Contributor info"
            data-component="meta-byline"
            data-link-name="byline"
        >
            {designType !== 'Interview' && (
                <div className={bylineStyle(pillar)}>
                    <BylineLink byline={author.byline} tags={tags} />
                </div>
            )}
        </address>
    );
};
