import React, { useEffect } from 'react';
import fetchMock from 'fetch-mock';

import { makeGuardianBrowserCAPI } from '@root/src/model/window-guardian';
import { iabVendorList } from '@root/fixtures/CMP/iabVendorList';
import { Article } from '@root/fixtures/articles/Article';

import { NAV } from '@root/fixtures/NAV';

import { HydrateApp } from '@root/src/web/components/HydrateApp';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';
import { DecideLayout } from '@root/src/web/layouts/DecideLayout';
import { SignInGateSelector } from './SignInGateSelector';
import { SignInGate } from './gates/SignInGate';

export default {
    component: SignInGateSelector,
    title: 'Components/SignInGate',
    parameters: {
        chromatic: { diffThreshold: 0.2 },
    },
};

export const standalone = () => {
    fetchMock
        .restore()
        .getOnce('https://vendorlist.consensu.org/vendorlist.json', {
            status: 200,
            body: iabVendorList,
        });

    return (
        <div>
            <SignInGate
                guUrl="https://theguardian.com/"
                signInUrl="https://profile.theguardian.com/"
                dismissGate={() => {}}
                component="test"
            />
        </div>
    );
};
standalone.story = { name: 'standalone' };

mockRESTCalls();

const convertToStandard = (CAPI: CAPIType) => {
    return {
        ...CAPI,
        pageType: {
            ...CAPI.pageType,
            hasShowcaseMainElement: false,
        },
        isImmersive: false,
    };
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({ ServerCAPI }: { ServerCAPI: CAPIType }) => {
    useEffect(() => {
        const CAPI = makeGuardianBrowserCAPI(ServerCAPI);
        HydrateApp({ CAPI, NAV });
    }, [ServerCAPI]);
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};

export const ArticleStory = () => {
    const ServerCAPI = convertToStandard(Article);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};

ArticleStory.story = { name: 'in default article' };
