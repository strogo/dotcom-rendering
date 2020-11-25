import React from 'react';
import { css } from 'emotion';

type DefaultProps = {
    headlineText: string;
    url: string;
};

export const RichLink = ({
    headlineText,

    url,
}: DefaultProps) => {
    return (
        <div
            className={css`
                margin: 1em 0;
            `}
        >
            <a href={url}>{headlineText}</a>
        </div>
    );
};
