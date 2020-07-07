import React from 'react';
import ReactDOM from 'react-dom';
import { ABProvider } from '@guardian/ab-react';
import { App } from '@root/src/web/components/App';

import { getCookie } from '../browser/cookie';

import { signInGateCentesimus } from '../experiments/tests/sign-in-gate-centesimus';
import { signInGatePatientia } from '../experiments/tests/sign-in-gate-patientia';
import { signInGateVii } from '../experiments/tests/sign-in-gate-vii';

const abTests = [signInGateCentesimus, signInGatePatientia, signInGateVii];

type Props = {
    CAPI: CAPIBrowserType;
    NAV: NavType;
};

export const HydrateApp = ({ CAPI, NAV }: Props) => {
    ReactDOM.render(
        <ABProvider
            tests={abTests}
            switches={CAPI.config.switches}
            isSensitive={CAPI.config.isSensitive}
            mvtMax={1000000}
            mvtId={Number(getCookie('GU_mvt_id'))}
        >
            <App CAPI={CAPI} NAV={NAV} />
        </ABProvider>,
        document.getElementById('react-root'),
    );
};
