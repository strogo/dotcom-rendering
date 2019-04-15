import React from 'react';
import { css, cx } from 'emotion';

import { serif, sans } from '@guardian/pasteup/typography';
import ArrowRightIcon from '@guardian/pasteup/icons/arrow-right.svg';
import { palette } from '@guardian/pasteup/palette';
import {
    mobileLandscape,
    tablet,
    desktop,
    mobileMedium,
    until,
    leftCol,
} from '@guardian/pasteup/breakpoints';

const message = css`
    color: ${palette.highlight.main};
    display: none;
    font-family: ${serif.headline};
    font-size: 20px;
    font-weight: 800;
    line-height: 1;
    padding-top: 3px;
    margin-bottom: 12px;

    ${tablet} {
        display: block;
    }

    ${desktop} {
        font-size: 26px;
    }

    ${leftCol} {
        font-size: 32px;
    }
`;

const link = css`
    background: ${palette.highlight.main};
    border-radius: 16px;
    box-sizing: border-box;
    color: ${palette.neutral[7]};
    float: left;
    font-family: ${sans.body};
    font-weight: 700;
    height: 32px;
    text-decoration: none;
    padding: 7px 12px 0 12px;
    position: relative;
    margin-right: 10px;
    line-height: 16px;

    ${mobileMedium} {
        padding-right: 34px;
    }

    svg {
        fill: currentColor;
        position: absolute;
        right: 3px;
        top: 50%;
        height: 32px;
        width: 32px;
        transform: translate(0, -50%);
        transition: transform 0.3s ease-in-out;

        ${until.mobileMedium} {
            display: none;
        }
    }

    :hover svg {
        transform: translate(3px, -50%);
    }
`;

const hiddenUntilTablet = css`
    ${until.tablet} {
        display: none;
    }
`;

const hiddenFromTablet = css`
    ${tablet} {
        display: none;
    }
`;

const hidden = css`
    display: none;
`;

const readerRevenueLinks = css``;

export const ReaderRevenueCTA: React.FC<{}> = () => {
    const urls = {
        subscribe: 'foo',
        support: 'bar',
        contribute: 'zeta',
    };

    const edition = 'UK';

    return (
        <div className={readerRevenueLinks}>
            <div className={message}>Support The Guardian</div>
            <a className={cx(link, hiddenUntilTablet)} href={urls.contribute}>
                Contribute <ArrowRightIcon />
            </a>
            <a className={cx(link, hiddenUntilTablet)} href={urls.subscribe}>
                Subscribe <ArrowRightIcon />
            </a>
            <a
                className={cx(link, hiddenFromTablet, {
                    [hidden]: edition !== 'UK',
                })}
                href={urls.support}
            >
                Support us <ArrowRightIcon />
            </a>
            <a
                className={cx(link, hiddenFromTablet, {
                    [hidden]: edition === 'UK',
                })}
                href={urls.contribute}
            >
                Contribute <ArrowRightIcon />
            </a>
        </div>
    );
};
