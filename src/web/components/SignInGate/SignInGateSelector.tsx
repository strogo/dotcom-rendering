import React, { useState } from 'react';
import { useAB } from '@guardian/ab-react';
import { ABTest } from '@guardian/ab-core';
import { signInGateComponent } from './gates/SignInGate';
import { setUserDismissedGate, hasUserDismissedGate } from './dismissGate';
import { signInGateTest1Component } from './gates/SignInGateTest1';
import { SignInGateComponent, CurrentABTest } from './gates/types';
import { signInGatePatientia } from '../../experiments/tests/sign-in-gate-patientia';
import { signInGateCentesimus } from '../../experiments/tests/sign-in-gate-centesimus';
import { signInGateVii } from '../../experiments/tests/sign-in-gate-vii';

// component name, should always be sign-in-gate
export const componentName = 'sign-in-gate';

const dismissGate = (
    setShowGate: React.Dispatch<React.SetStateAction<boolean>>,
    currentAbTestValue: CurrentABTest,
) => {
    setShowGate(false);
    setUserDismissedGate(currentAbTestValue.variant, currentAbTestValue.name);

    // When the user closes the sign in gate, we scroll them back to the main content
    const articleBody =
        document.querySelector('.js-article__body') ||
        document.querySelector('.article-body-commercial-selector');

    articleBody?.parentElement?.scrollIntoView(true);

    // mediator emit ??
};

// TODO: viewing criteria
// TODO: url handling

type GateTestMap = { [name: string]: SignInGateComponent };

/* When adding a new test, you need to add the test name to the tests array below,
   and add a entry for each variant that maps it to a SignInGateComponent in testVariantToGateMapping
   */
const tests: ReadonlyArray<ABTest> = [
    signInGatePatientia,
    signInGateCentesimus,
    signInGateVii,
];

const testVariantToGateMapping: GateTestMap = {
    'patientia-control-1': signInGateComponent,
    'patientia-variant-1': signInGateComponent,
    'centesimus-control-2': signInGateTest1Component,
    'vii-variant': signInGateTest1Component,
};

/*
signInGateFilter takes:
 - all the active sign in gate components
 - filters gates by running their canShow function and checking if user has dismissed this gate
 - creates an instance of the gate
 - at this stage their should only be one gate available, this is returned
 */

const signInGateFilter = (
    setShowGate: React.Dispatch<React.SetStateAction<boolean>>,
    abTest: CurrentABTest,
): JSX.Element | undefined => {
    const gateVariant: SignInGateComponent | null =
        testVariantToGateMapping?.[abTest.variant];

    // eslint-disable-next-line no-console
    console.log(gateVariant, abTest);
    if (
        gateVariant.canShow() &&
        !hasUserDismissedGate(abTest.variant, abTest.name)
    ) {
        return gateVariant.gate({
            guUrl: 'https://theguardian.com/',
            signInUrl: 'https://profile.theguardian.com/',
            dismissGate: () => {
                dismissGate(setShowGate, abTest);
            },
            abTest,
            component: componentName,
        });
    }
};

export const SignInGateSelector = () => {
    const [showGate, setShowGate] = useState(true);

    // wow this whole thing is tightly coupled to the AB test framework ...
    const ab = useAB();
    // const abTest = tests.map((test) =>
    //     ab.isUserInVariant(test.id, 'centesimus-control-2'),
    // );

    const test = ab.firstRunnableTest(tests);
    // eslint-disable-next-line no-console
    console.log(test);
    const currentTestId = test?.id || '';
    const currentVariantId = test?.variantToRun.id || '';

    return (
        <>
            {showGate &&
                signInGateFilter(setShowGate, {
                    name: currentTestId,
                    variant: currentVariantId,
                })}
        </>
    );
};
