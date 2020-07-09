import { SignInGateVii } from '../gateDesigns/SignInGateVii';
import { SignInGateComponent } from '../gateDesigns/types';
import {
    isNPageOrHigherPageView,
    isInvalidArticleType,
    isInvalidSection,
    isIOS9,
} from '../displayRule';

const canShow = (CAPI: CAPIBrowserType): boolean => {
    return (
        isNPageOrHigherPageView(3) &&
        !isInvalidArticleType(CAPI) &&
        !isInvalidSection(CAPI) &&
        !isIOS9()
    );
};

export const signInGateComponentCentesimusControl2: SignInGateComponent = {
    gate: SignInGateVii,
    canShow,
};
