import React from 'react';
import fetchMock from 'fetch-mock';

import { data } from '@root/fixtures/article';

import { SignInGate } from './SignInGate';

export default {
    component: SignInGate,
    title: 'Components/SignInGate',
    parameters: {
        chromatic: { diffThreshold: 0.2 },
    },
};

export const inDefaultArticle = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: data,
    });

    return (
        <SignInGate
            guUrl="https://gu.com/"
            signInUrl="https://profile.theguardian.com/"
        />
    );
};
inDefaultArticle.story = { name: 'in default article' };
