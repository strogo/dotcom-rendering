import React from 'react';
import { css, cx } from 'emotion';
import { neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';

import { headline } from '@guardian/src-foundations/typography';

type Props = {
    standfirst: string;
};

const nestedStyles = css`
    li {
        margin-bottom: 6px;
        padding-left: 20px;

        p {
            display: inline;
        }
    }

    li:before {
        display: inline-block;
        content: '';
        border-radius: 6px;
        height: ${space[3]}px;
        width: ${space[3]}px;
        margin-right: ${space[2]}px;
        background-color: ${neutral[86]};
        margin-left: -20px;
    }

    p {
        margin-bottom: 8px;
    }

    strong {
        font-weight: bold;
    }
`;

const standfirstStyles = css`
    ${headline.xxxsmall()};
    line-height: 20px;
    margin-bottom: ${space[3]}px;
`;

export const Standfirst = ({ standfirst }: Props) => {
    return (
        <div
            className={cx(nestedStyles, standfirstStyles)}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
                __html: standfirst,
            }}
        />
    );
};
