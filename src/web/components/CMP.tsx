import React, { useState, useEffect, Suspense } from 'react';

import { initPerf } from '@root/src/web/browser/initPerf';

interface Props {
    forceShow: boolean;
    forceModal: boolean;
    onClose: () => void;
}

const ConsentManagementPlatform = React.lazy(() => {
    const { start, end } = initPerf('ConsentManagementPlatform');
    start();
    return import(
        /* webpackChunkName: "ConsentManagementPlatform" */ '@guardian/consent-management-platform/lib/ConsentManagementPlatform'
    ).then(module => {
        end();
        return { default: module.ConsentManagementPlatform };
    });
});

// note there are defaultProps set for CMP below this

export const CMP = ({ forceShow, forceModal, onClose }: Props) => {
    const [show, setShow] = useState(forceShow);

    useEffect(() => {
        const { start, end } = initPerf(
            'consent-management-platform-utilities',
        );
        start();
        import(
            /* webpackChunkName: "consent-management-platform-utilities" */ '@guardian/consent-management-platform'
        ).then(({ shouldShow, setErrorHandler }) => {
            end();
            if (shouldShow() || show) {
                setShow(true);

                // setErrorHandler takes function to be called on errors in the CMP UI
                setErrorHandler((errMsg: string): void => {
                    const err = new Error(errMsg);

                    window.guardian.modules.sentry.reportError(err, 'cmp');
                });
            }
        });
    }, []);

    return (
        <>
            {show && (
                <Suspense fallback={<></>}>
                    <ConsentManagementPlatform
                        source="dcr"
                        forceModal={forceModal}
                        onClose={() => {
                            setShow(false);
                            onClose();
                        }}
                    />
                </Suspense>
            )}
        </>
    );
};

CMP.defaultProps = {
    forceShow: false,
    forceModal: false,
    onClose: () => {},
};
