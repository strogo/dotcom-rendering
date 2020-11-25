import React from 'react';
import { css, cx } from 'emotion';

import { brand, brandText } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { from, until } from '@guardian/src-foundations/mq';

import { pillarMap, pillarPalette } from '@root/src/lib/pillars';
import { Display } from '@root/src/lib/display';
import { navInputCheckboxId } from './Nav/config';

// CSS Vars

export const firstPillarWidth = 171;
export const pillarWidth = 160;
export const preLeftColFirstPillarWidth = 144;
export const preLeftColPillarWidth = 134;
export const preDesktopPillarWidth = 'auto';

// CSS
const pillarsStyles = (display: Display) => css`
    ${until.tablet} {
        display: ${display === Display.Immersive && 'none'};
    }
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
        height: ${display === Display.Immersive ? '49px' : '37px'};
        ${from.tablet} {
            border-bottom: 0;
            height: 49px;
        }
        ${from.desktop} {
            height: ${display === Display.Immersive ? '49px' : '43px'};
        }
    }
`;

const showMenuUnderlineStyles = css`
    /*
        IMPORTANT NOTE:
        we need to specify the adjacent path to the a (current) tag
        to apply styles to the nested tabs due to the fact we use ~
        to support NoJS
    */
    /* stylelint-disable-next-line selector-type-no-unknown */
    ${`#${navInputCheckboxId}`}:checked ~ ul li & {
        ${from.desktop} {
            :before {
                bottom: 0;
            }
        }

        :hover {
            text-decoration: underline;
        }

        :after {
            transform: translateY(4px);
        }
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

const linkStyle = (display: Display) => css`
    ${headline.xxxsmall()};
    box-sizing: border-box;
    font-weight: 900;
    color: ${brandText.primary};
    cursor: pointer;
    display: block;
    font-size: 15.4px;
    height: ${display === Display.Immersive ? '48px' : '36px'};
    padding-top: ${display === Display.Immersive ? '10px' : '9px'};
    padding-right: ${display === Display.Immersive ? '5px' : '5px'};
    padding-bottom: ${display === Display.Immersive ? '0' : '0'};
    padding-left: ${display === Display.Immersive ? '5px' : '5px'};
    position: relative;
    overflow: hidden;
    text-decoration: none;
    z-index: 1;
    ${from.mobileMedium} {
        font-size: 15.7px;
        padding-top: ${display === Display.Immersive ? '9px' : '9px'};
        padding-right: ${display === Display.Immersive ? '5px' : '5px'};
        padding-bottom: ${display === Display.Immersive ? '0' : '0'};
        padding-left: ${display === Display.Immersive ? '5px' : '5px'};
    }
    ${from.mobileLandscape} {
        font-size: 18px;
        padding-top: ${display === Display.Immersive ? '9px' : '9px'};
        padding-right: ${display === Display.Immersive ? '5px' : '5px'};
        padding-bottom: ${display === Display.Immersive ? '0' : '0'};
        padding-left: ${display === Display.Immersive ? '5px' : '5px'};
    }
    ${from.tablet} {
        font-size: 22px;
        height: 48px;
        padding-top: ${display === Display.Immersive ? '9px' : '9px'};
        padding-right: ${display === Display.Immersive ? '20px' : '20px'};
        padding-bottom: ${display === Display.Immersive ? '0' : '0'};
        padding-left: ${display === Display.Immersive ? '9px' : '9px'};
    }
    ${from.desktop} {
        padding-top: ${display === Display.Immersive ? '9px' : '5px'};
        height: ${display === Display.Immersive ? '48px' : '42px'};
    }

    ${from.wide} {
        padding-top: ${display === Display.Immersive ? '10px' : '7px'};
        font-size: 24px;
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
    display: Display;
    isTopNav?: boolean;
    pillars: PillarType[];
    pillar: Pillar;
    showLastPillarDivider?: boolean;
    dataLinkName: string;
}> = ({
    display,
    isTopNav,
    pillars,
    pillar,
    showLastPillarDivider = true,
    dataLinkName,
}) => (
    <ul data-testid="pillar-list" className={pillarsStyles(display)}>
        {pillars.map((p, i) => (
            <li key={p.title} className={pillarStyle}>
                <a
                    className={cx(
                        linkStyle(display),
                        pillarUnderline[p.pillar],
                        isTopNav && showMenuUnderlineStyles,
                        {
                            [pillarDivider]:
                                showLastPillarDivider ||
                                isNotLastPillar(i, pillars.length),
                            [forceUnderline]: p.pillar === pillar,
                        },
                    )}
                    href={p.url}
                    data-link-name={`${dataLinkName} : primary : ${p.title}`}
                >
                    {p.title}
                </a>
            </li>
        ))}
    </ul>
);
