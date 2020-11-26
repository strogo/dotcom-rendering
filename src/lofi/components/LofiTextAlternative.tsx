import React from 'react';
import { css, cx } from 'emotion';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { from } from '@guardian/src-foundations/mq';

interface Props {
    altText?: string;
    elementTypeShownToUser: string;
    children?: JSX.Element | JSX.Element[];
    sideNote?: boolean;
    lighter?: boolean;
}

const lighterStyle = css`
    background-color: ${neutral[100]};
    border-top: 1px solid ${neutral[86]};
    border-bottom: 1px solid ${neutral[86]};
`;

const standardStyle = css`
    background-color: ${neutral[97]};
    border: 1px solid ${neutral[86]};
`;

const style = (lighter: boolean) => {
    const boxStyle = lighter ? lighterStyle : standardStyle;
    return css`
        padding: 1em;
        margin-bottom: 1em;
        ${boxStyle}
    `;
};

const smallText = css`
    color: black;
    display: inline-block;
    ${textSans.small()}
`;

const sideNoteStyle = css`
    ${from.tablet} {
        float: right;
        width: 300px;
        margin-left: 1em;
    }
`;

export const LofiTextAlternative = ({
    altText,
    elementTypeShownToUser,
    children,
    sideNote = true,
    lighter = true,
}: Props) => (
    <p className={cx(style(lighter), sideNote && sideNoteStyle)}>
        <span className={smallText}>{elementTypeShownToUser}</span>
        <br />
        {altText}
        <br />
        <a
            href="#"
            className={cx(
                smallText,
                css`
                    margin-top: 0.7em;
                `,
            )}
        >
            View on full site ⇢
        </a>
        {children}
    </p>
);
