import React from 'react';
import ReactDOM from 'react-dom';

import { App } from '@root/src/web/components/App';

import { initAB } from '@frontend/web/lib/AB';

type Props = {
    CAPI: CAPIBrowserType;
    NAV: NavType;
};

export const HydrateApp = ({ CAPI, NAV }: Props) => {
    initAB({
        abTestSwitches: {
            DummyTest: true,
            DummyTestException: true,
        },
    });

    ReactDOM.render(
        <App CAPI={CAPI} NAV={NAV} />,
        document.getElementById('react-root'),
    );
};
