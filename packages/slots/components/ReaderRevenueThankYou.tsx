import React from 'react';
import { css } from 'emotion';

import { serif } from '@guardian/pasteup/typography';

import { palette } from '@guardian/pasteup/palette';
import { tablet, desktop, leftCol } from '@guardian/pasteup/breakpoints';

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

export const ReaderRevenueThankYou: React.FC<{}> = () => {
    return (
        <div>
            <div className={message}>Thank you for supporting us Nicolas!</div>
        </div>
    );
};
