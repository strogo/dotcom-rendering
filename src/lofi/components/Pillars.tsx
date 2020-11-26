import React from 'react';
import { css } from 'emotion';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';

// CSS
const pillarsStyles = css`
    clear: right;
    margin: 0;
    list-style: none;
    list-style-image: none;
    li {
        float: left;
        display: block;
        position: relative;
    }
`;

const pillarStyle = css`
    padding: 10px;

    :first-of-type {
        padding-left: 20px;
    }
`;

const pillarAnc = css`
    color: ${neutral[0]};
    ${headline.large()}
    font-size: 24px;
    text-decoration: none;

    :hover,
    :focus {
        border-bottom: 1px solid ${neutral[0]};
    }
`;

export const Pillars: React.FC<{
    pillars: PillarType[];
}> = ({ pillars }) => (
    <ul data-testid="pillar-list" className={pillarsStyles}>
        {pillars.map((p, i) => (
            <li key={p.title} className={pillarStyle}>
                <a className={pillarAnc} href={p.url}>
                    {p.title}
                </a>
            </li>
        ))}
    </ul>
);
