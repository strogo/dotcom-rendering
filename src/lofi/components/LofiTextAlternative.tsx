import React from 'react';
import { css } from 'emotion';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';

interface Props {
    altText?: string;
    elementTypeShownToUser: string;
    children?: JSX.Element | JSX.Element[];
}

const style = css`
    padding: 1em;
    margin-bottom: 1em;
    background-color: ${neutral[97]};
    border: 1px solid ${neutral[86]};
`;

const fullSiteLink = css`
    color: black;
    display: inline-block;
    ${textSans.xsmall()}
    margin-top: 0.7em;
`;

export const LofiTextAlternative = ({
    altText,
    elementTypeShownToUser,
    children,
}: Props) => (
    <p className={style}>
        {elementTypeShownToUser}
        {altText && `: ${altText}`}
        <br />
        <a href="#" className={fullSiteLink}>
            View on full site ⇢
        </a>
        {children}
    </p>
);
