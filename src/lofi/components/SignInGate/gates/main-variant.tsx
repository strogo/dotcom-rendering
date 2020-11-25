import React, { Suspense } from 'react';
import { Lazy } from '@root/src/lofi/components/Lazy';

import {
    SignInGateComponent,
    CurrentABTest,
} from '@root/src/lofi/components/SignInGate/gateDesigns/types';
import {
    isNPageOrHigherPageView,
    isValidContentType,
    isValidSection,
    isValidTag,
    isIOS9,
} from '@root/src/lofi/components/SignInGate/displayRule';
import { initPerf } from '@root/src/lofi/browser/initPerf';
import { hasUserDismissedGateMoreThanCount } from '../dismissGate';

const SignInGateMain = React.lazy(() => {
    const { start, end } = initPerf('SignInGateMain');
    start();
    return import(
        /* webpackChunkName: "SignInGateMain" */ '../gateDesigns/SignInGateMain'
    ).then((module) => {
        end();
        return { default: module.SignInGateMain };
    });
});

const canShow = (
    CAPI: CAPIBrowserType,
    isSignedIn: boolean,
    currentTest: CurrentABTest,
): boolean =>
    !isSignedIn &&
    !hasUserDismissedGateMoreThanCount(
        currentTest.variant,
        currentTest.name,
        5,
    ) &&
    isNPageOrHigherPageView(3) &&
    isValidContentType(CAPI) &&
    isValidSection(CAPI) &&
    isValidTag(CAPI) &&
    !isIOS9();

export const signInGateComponent: SignInGateComponent = {
    gate: ({
        ophanComponentId,
        dismissGate,
        guUrl,
        signInUrl,
        abTest,
        isComment,
    }) => (
        <Lazy margin={300}>
            <Suspense fallback={<></>}>
                <SignInGateMain
                    ophanComponentId={ophanComponentId}
                    dismissGate={dismissGate}
                    guUrl={guUrl}
                    signInUrl={signInUrl}
                    abTest={abTest}
                    isComment={isComment}
                />
            </Suspense>
        </Lazy>
    ),
    canShow,
};
