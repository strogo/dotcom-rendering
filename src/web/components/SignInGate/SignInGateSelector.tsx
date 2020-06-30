import React, { useState, useEffect } from 'react';
// import { css } from 'emotion';
import { SignInGate } from './SignInGate';

const signInGateStylesID = 'sign-in-gate-styles';

// component name, should always be sign-in-gate
const componentName = 'sign-in-gate';

const dismissGate = (setShowGate: (show: boolean) => void) => {
    setShowGate(false);

    // change the DOM back by removing the style block we added when first rendering
    const gateStyle = document.getElementById(signInGateStylesID);

    gateStyle?.parentNode?.removeChild(gateStyle);

    // When the user closes the sign in gate, we scroll them back to the main content
    const articleBody =
        document.querySelector('.js-article__body') ||
        document.querySelector('.article-body-commercial-selector');

    articleBody?.parentElement?.scrollIntoView(true);

    // mediator emit ??

    // Store the fact that they have closed the gate somewhere ...
};

export const setupGateOnPage = (): void => {
    const signInGate = document.querySelector('#sign-in-gate');

    // Create our stylesheet
    const style = document.createElement('style');
    style.id = signInGateStylesID;

    // Hide all elements after the #sign-in-gate using the
    // General Sibilings combinator https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator
    style.innerHTML = `
        #sign-in-gate ~ p, #sign-in-gate ~ div, #sign-in-gate ~ span {
            display:none;
        }
    `;

    // check if sign in gate exists, then insert the style block
    if (signInGate) {
        signInGate.insertAdjacentElement('beforebegin', style);
    }
};

export const SignInGateSelector = () => {
    const [showGate, setShowGate] = useState(true);

    useEffect(() => {
        setupGateOnPage();
    }, []);

    return (
        <>
            {showGate && (
                <SignInGate
                    guUrl="https://theguardian.com/"
                    signInUrl="https://profile.theguardian.com/"
                    dismissGate={() => {
                        dismissGate(setShowGate);
                    }}
                    abTest={{ name: 'asd', variant: 'asd' }}
                    component={componentName}
                />
            )}
        </>
    );
};
