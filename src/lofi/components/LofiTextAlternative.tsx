import React from 'react';
import { css } from 'emotion';

interface Props {
    altText?: string;
    elementTypeShownToUser: string;
}

export const LofiTextAlternative = ({
    altText,
    elementTypeShownToUser,
}: Props) => (
    <p>
        {elementTypeShownToUser}
        {altText && `: ${altText}`}
    </p>
);
