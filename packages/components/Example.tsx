import React from 'react';
import { css } from 'emotion';

const red = css`
    color: red;
`;

const Example: React.FC<{}> = () => <div className={red}>Example</div>;

// tslint:disable-next-line:no-default-export
export default Example;
