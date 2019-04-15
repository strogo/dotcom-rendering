import React from 'react';
import { css } from 'emotion';
import { mobileLandscape, tablet } from '@guardian/pasteup/breakpoints';

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

    width: 300px;
    max-height: 73px;
`;

export const HeaderSlotA: React.FC<{}> = () => (
    <gap-slot
        class={styles}
        id="header-slot-a"
        data-src="https://8sxxopt4aa.execute-api.eu-west-1.amazonaws.com/PROD/slots"
        data-slot-id="header-slot-a"
        data-config-path="guardian.gapSlotsMeta"
    />
);
