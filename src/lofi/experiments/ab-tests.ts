import { ABTest } from '@guardian/ab-core';
import { abTestTest } from '@frontend/web/experiments/tests/ab-test-test';
import { signInGateMainVariant } from '@root/src/lofi/experiments/tests/sign-in-gate-main-variant';
import { signInGateMainControl } from '@root/src/lofi/experiments/tests/sign-in-gate-main-control';
import { curatedContainerTest2 } from '@frontend/web/experiments/tests/curated-container-test';
import {
    newsletterMerchUnitLighthouseControl,
    newsletterMerchUnitLighthouseVariants,
} from '@root/src/lofi/experiments/tests/newsletter-merch-unit-test';

export const tests: ABTest[] = [
    abTestTest,
    signInGateMainVariant,
    signInGateMainControl,
    curatedContainerTest2,
    newsletterMerchUnitLighthouseControl,
    newsletterMerchUnitLighthouseVariants,
];
