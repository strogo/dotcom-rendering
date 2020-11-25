import React from 'react';
import { css } from 'emotion';
import { from } from '@guardian/src-foundations/mq';

// CSS
const pillarsStyles = css`
    clear: right;
    margin: 0;
    list-style: none;
    list-style-image: none;
    padding-left: 10px;
    ${from.mobileLandscape} {
        padding-left: 20px;
    }
    li {
        float: left;
        display: block;
        position: relative;
    }
`;

const pillarStyle = css`
    padding: 10px;
`;

const pillarAnc = css`
    color: white;
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 24px;
    text-decoration: none;

    :hover,
    :focus {
        border-bottom: 1px solid #fff;
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
