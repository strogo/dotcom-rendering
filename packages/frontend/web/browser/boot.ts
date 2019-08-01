import 'ophan-tracker-js';
import { getRaven } from '@frontend/web/browser/raven';
import {
    init as initGa,
    sendPageView as sendGaPageView,
} from '@frontend/web/browser/ga';
import { sendOphanPlatformRecord } from '@frontend/web/browser/ophan';
import { ReportedError, reportError } from '@frontend/web/browser/reportError';
import { loadScript } from '@frontend/web/browser/loadScript';
import { RavenStatic } from 'raven-js';

if (module.hot) {
    module.hot.accept();
}

const initApp = (): void => {
    const { data } = window.guardian.app;
    const commercialBundleUrl = data.config.commercialBundleUrl;

    const enhanceApp = () => {
        initGa();

        // Ophan - Let's record a 'platformVariant' field so that we can track
        // DCR views in datalake(regardless of A / B test)
        sendOphanPlatformRecord();

        // Google Analytics
        sendGaPageView();
    };

    const loadCommercial = (): Promise<void> => {
        return loadScript(commercialBundleUrl);
    };

    loadCommercial()
        .then(() => {
            enhanceApp();
        })
        .catch(err => {
            // If loadCommercial fails reportError and enhanceApp
            reportError(
                err,
                {
                    feature: 'commercial',
                },
                false,
            );
            enhanceApp();
        });
};

const initAppWithRaven = (raven: RavenStatic) => {
    const oldOnError = window.onerror;

    /**
     * Make sure global onerror doesn't report errors
     * already manually reported via reportError module
     * by checking for 'reported' property
     */
    window.onerror = (
        message,
        filename,
        lineno,
        colno,
        error: ReportedError | undefined,
    ) => {
        // Not all browsers pass the error object
        if (!error || !error.reported) {
            oldOnError(message, filename, lineno, colno, error);
        }
    };

    // Report unhandled promise rejections
    window.addEventListener('unhandledrejection', event => {
        // Prevent error output on the console:
        event.preventDefault();

        // Typecast Event to PromiseRejectionEvent for TypeScript
        const { reason } = event as PromiseRejectionEvent;
        raven.captureException(reason);
    });

    raven.context(
        {
            tags: {
                feature: 'initApp',
            },
        },
        initApp,
    );
};

const onPolyfilled = (): Promise<void> => {
    return getRaven()
        .catch(err => {
            // If getRaven fails continue to initApp
            initApp();
        })
        .then(raven => {
            if (!raven) {
                return;
            }

            initAppWithRaven(raven);
        })
        .catch(() => {
            /**
             * Raven will have reported any unhandled promise
             * rejections from this chain so return here.
             */
            return;
        });
};

const run = (): void => {
    /*
        We want to run `onPolyfilled` only after polyfill.io has initialised
        By the time this script runs, if `window.guardian.polyfilled` is true,
        meaning that polyfill.io has initialised, then we run onPolyfilled(), otherwise
        we stick it in window.guardian.onPolyfilled to be ran later.
    */
    if (window.guardian.polyfilled) {
        onPolyfilled();
    } else {
        window.guardian.onPolyfilled = onPolyfilled;
    }
};

run();

export const _ = {
    run,
    onPolyfilled,
};
