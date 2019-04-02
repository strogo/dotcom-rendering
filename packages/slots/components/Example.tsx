import React from 'react';
import { css } from 'emotion';

const styles = css`
    font-family: monospace;
`;

export const Example: React.FC<{}> = () => (
    <div className={styles}>
        <h3>Example component</h3>
        <p>Lorem ipsum Harry Potter Fellowship of the Round Table.</p>
    </div>
);
