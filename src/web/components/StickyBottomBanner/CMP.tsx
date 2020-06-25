import React, { useState, useEffect, Suspense } from 'react';
import { ConsentManagementPlatform } from '@guardian/consent-management-platform/dist/ConsentManagementPlatform';
import {
    shouldShow as shouldShow_,
    setErrorHandler,
} from '@guardian/consent-management-platform';

interface Props {
    forceShow: boolean;
    forceModal: boolean;
    onClose: () => void;
}

const defaultProps: Props = {
    forceShow: false,
    forceModal: false,
    onClose: () => {},
};

export const shouldShow = shouldShow_;

export const CMP = ({ forceShow, forceModal, onClose }: Props) => {
    const [show, setShow] = useState(forceShow);

    useEffect(() => {
        setShow(true);

        // setErrorHandler takes function to be called on errors in the CMP UI
        setErrorHandler((errMsg: string): void => {
            const err = new Error(errMsg);

            window.guardian.modules.sentry.reportError(err, 'cmp');
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

CMP.defaultProps = defaultProps;
