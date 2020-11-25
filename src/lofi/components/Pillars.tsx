import React from 'react';
import { css, cx } from 'emotion';

import { brand, brandText } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { pillarMap, pillarPalette } from '@root/src/lib/pillars';

// CSS Vars

export const firstPillarWidth = 171;
export const pillarWidth = 160;
export const preLeftColFirstPillarWidth = 144;
export const preLeftColPillarWidth = 134;
export const preDesktopPillarWidth = 'auto';

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
        width: ${preDesktopPillarWidth};
        ${from.desktop} {
            width: ${preLeftColPillarWidth}px;
        }
        ${from.leftCol} {
            width: ${pillarWidth}px;
        }
    }

    :after {
        content: '';
        border-top: 1px solid ${brand[600]};
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
`;

const pillarStyle = css`
    :first-of-type {
        margin-left: -20px;
        width: ${preDesktopPillarWidth};

        ${from.desktop} {
            width: ${preLeftColFirstPillarWidth}px;
        }

        ${from.leftCol} {
            width: ${firstPillarWidth}px;
        }
        a {
            padding-left: 20px;
        }
    }

    :last-child a:before {
        ${until.desktop} {
            content: none;
        }
    }
`;

const pillarDivider = css`
    :before {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 1px;
        background-color: ${brand[600]};

        ${from.tablet} {
            bottom: 17px;
        }

        ${from.desktop} {
            bottom: 0.6em;
        }
    }
`;

const linkStyle = css`
    ${headline.xxxsmall()};
    box-sizing: border-box;
    font-weight: 900;
    color: ${brandText.primary};
    cursor: pointer;
    display: block;
    font-size: 15.4px;
    position: relative;
    overflow: hidden;
    text-decoration: none;
    z-index: 1;

    :focus:after {
        transform: translateY(4px);
    }
    :hover {
        text-decoration: none;
    }
    :hover:after {
        transform: translateY(4px);
    }
`;
const pillarUnderline = pillarMap(
    (pillar) => css`
        :after {
            border-top: 4px solid ${pillarPalette[pillar].bright};
            left: 0;
            right: 1px;
            top: -4px;
            content: '';
            display: block;
            position: absolute;
            transition: transform 0.3s ease-in-out;
        }
    `,
);

const forceUnderline = css`
    :after {
        transform: translateY(4px);
    }
    :focus:after {
        transform: translateY(4px);
    }
    :hover {
        text-decoration: none;
    }
    :hover:after {
        transform: translateY(4px);
    }
`; // A11Y warning: this styling has no focus state for the selected pillar

const isNotLastPillar = (i: number, noOfPillars: number): boolean =>
    i !== noOfPillars - 1;

export const Pillars: React.FC<{
    pillars: PillarType[];
    pillar: Pillar;
    showLastPillarDivider?: boolean;
    dataLinkName: string;
}> = ({ pillars, pillar, showLastPillarDivider = true }) => (
    <ul data-testid="pillar-list" className={pillarsStyles}>
        {pillars.map((p, i) => (
            <li key={p.title} className={pillarStyle}>
                <a
                    className={cx(linkStyle, pillarUnderline[p.pillar], {
                        [pillarDivider]:
                            showLastPillarDivider ||
                            isNotLastPillar(i, pillars.length),
                        [forceUnderline]: p.pillar === pillar,
                    })}
                    href={p.url}
                >
                    {p.title}
                </a>
            </li>
        ))}
    </ul>
);
