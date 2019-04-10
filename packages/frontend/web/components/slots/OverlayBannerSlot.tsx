import React from 'react';
import { css } from 'emotion';

const styles = css`
    width: 100%;
    max-height: 300px;
    position: fixed;
    bottom: 0;
    background-color: red;
`;

export const OverlayBannerSlot: React.FC<{}> = () => (
    <gap-slot
        class={styles}
        id="overlay-banner-slot"
        data-src="/slot-api-stub.json"
        data-slot-id="overlayBannerSlot"
        data-config-path="guardian.gapSlotsMeta"
    />
);
