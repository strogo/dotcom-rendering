import React from 'react';
import { css } from 'emotion';

const styles = css`
    width: 100%;
    max-height: 300px;
    position: fixed;
    bottom: 0;
    background-color: red;
`;

// TODO how to make this only on certain breakpoints?
export const OverlayBannerSlot: React.FC<{}> = () => (
    <gap-slot
        class={styles}
        id="overlay-banner-slot"
        data-src="https://8sxxopt4aa.execute-api.eu-west-1.amazonaws.com/PROD/slots"
        data-slot-id="overlay-banner-slot"
        data-config-path="guardian.gapSlotsMeta"
    />
);
