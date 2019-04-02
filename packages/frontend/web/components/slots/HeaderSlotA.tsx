import React, { Component } from 'react';
import { css } from 'emotion';
import {
    mobileLandscape,
    tablet,
    desktop,
    mobileMedium,
    until,
    leftCol,
} from '@guardian/pasteup/breakpoints';

const styles = css`
    position: absolute;
    left: 10px;
    top: 33px;

    ${mobileLandscape} {
        left: 20px;
    }

    ${tablet} {
        top: 10px;
    }

    width: 100px;
    background-color: red;
`;

export const HeaderSlotA: React.FC<{}> = () => (
    <gap-slot
        class={styles}
        id="header-slot-a"
        data-src="/slot-api-stub.json"
        data-slot-id="headerSlotA"
    />
);
