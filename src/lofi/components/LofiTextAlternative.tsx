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
}

const style = css`
    padding: 1em;
    margin-bottom: 1em;
    background-color: ${neutral[97]};
    border: 1px solid ${neutral[86]};
`;

const smallText = css`
    color: black;
    display: inline-block;
    ${textSans.small()}
    margin-top: 0.7em;
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
}: Props) => (
    <p className={cx(style, sideNote && sideNoteStyle)}>
        <span className={smallText}>{elementTypeShownToUser}</span>
        <br />
        {altText}
        <br />
        <a href="#" className={smallText}>
            View on full site ⇢
        </a>
        {children}
    </p>
);
