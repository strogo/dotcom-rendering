import { initialise } from '@guardian/ab-rendering';

type ABConfigType = {
    mvtMaxValue?: number;
    mvtCookieId?: number;
    pageIsSensitive?: boolean;
    abTestSwitches?: any;
    serverSideTests?: any;
    errorReporter?: () => void;
    ophanRecord?: () => void;
};

const defaultConfig = {
    mvtMaxValue: 1000000,
    mvtCookieId: 1234,
    pageIsSensitive: false,
    abTestSwitches: {},
    serverSideTests: {},
    errorReporter: () => {},
    ophanRecord: () => {},
};

let globalAB: any;

export const initAB = (config: ABConfigType) => {
    const {
        mvtMaxValue,
        mvtCookieId,
        pageIsSensitive,
        abTestSwitches,
        serverSideTests,
        errorReporter,
        ophanRecord,
    } = { ...defaultConfig, ...config };

    globalAB = initialise(
        {
            mvtMaxValue,
            mvtCookieId,
            pageIsSensitive,
            abTestSwitches,
        },
        {
            serverSideTests,
            errorReporter,
            ophanRecord,
        },
    );

    console.log('Initialised AB', globalAB);
};

export const AB = () => globalAB;
