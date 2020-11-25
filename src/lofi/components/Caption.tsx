import React from 'react';

import { text } from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';
import { css, cx } from 'emotion';
import { from } from '@guardian/src-foundations/mq';

type Props = {
    captionText?: string;

    credit?: string;
    displayCredit?: boolean;
};

const captionStyle = css`
    ${textSans.xsmall()};
    padding-top: 6px;
    ${textSans.xsmall()};
    word-wrap: break-word;
    color: ${text.supporting};
    margin-bottom: 1em;
    ${from.tablet} {
        clear: right;
        float: right;
        width: 300px;
        margin-left: 1em;
    }
`;

export const Caption = ({
    captionText,

    credit,
    displayCredit = true,
}: Props) => {
    const noCaption = !captionText;
    const noCredit = !credit;
    const hideCredit = !displayCredit;
    if (noCaption && (noCredit || hideCredit)) return null;

    return (
        <figcaption className={cx(captionStyle)}>
            {captionText && (
                <span
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                        __html: captionText || '',
                    }}
                    key="caption"
                />
            )}
            {credit && displayCredit && ` ${credit}`}
        </figcaption>
    );
};
