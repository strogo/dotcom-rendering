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
import { hasUserDismissedGate } from '../dismissGate';

const canShow = (
    CAPI: CAPIBrowserType,
    isSignedIn: boolean,
    currentTest: CurrentABTest,
): boolean =>
    !isSignedIn &&
    !hasUserDismissedGate(currentTest.variant, currentTest.name) &&
    isNPageOrHigherPageView(3) &&
    isValidContentType(CAPI) &&
    isValidSection(CAPI) &&
    isValidTag(CAPI) &&
    !isIOS9();

export const signInGateComponent: SignInGateComponent = {
    canShow,
};
