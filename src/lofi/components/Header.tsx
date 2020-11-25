import React from 'react';
import { css } from 'emotion';
import { Logo } from '@frontend/web/components/Logo';

const headerStyles = css`
    /* Ensure header height contains it's children */
    overflow: auto;
    /* Prevent a scrollbar appearing here on IE/Edge */
    -ms-overflow-style: none;
`;

export const Header = () => (
    <header className={headerStyles}>
        <Logo />
    </header>
);
