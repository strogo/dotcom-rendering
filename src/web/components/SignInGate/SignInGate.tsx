import React, { useState } from 'react';
import { css, cx } from 'emotion';

import { CMP } from '@frontend/web/components/StickyBottomBanner/CMP';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { space, palette } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import { Link } from '@guardian/src-link';

interface Props {
    signInUrl: string;
    guUrl: string;
}

const signinGate = css`
    max-width: 617px;

    ${from.desktop} {
        min-height: 600px;
    }

    p {
        ${textSans.medium()}
        padding-bottom: ${space[6]}px;
        line-height: 135%;

        ${from.phablet} {
            padding-right: 160px;
        }
    }
`;

const headingStyles = css`
    ${headline.small({ fontWeight: 'bold' })};
    border-top: 2px black solid;
    padding-bottom: 42px;

    ${from.phablet} {
        padding-right: 160px;
        ${headline.medium({ fontWeight: 'bold' })};
    }
`;

const subHeader = css`
    ${textSans.medium({ fontWeight: 'bold' })};
    border-top: 1px ${palette.line.primary} solid;
    padding-bottom: 20px;
    ${from.phablet} {
        padding-right: 130px;
    }
`;

const signInHeader = css`
    padding-bottom: 0;
`;

const actionButtons = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 42px;

    > a {
        margin-right: ${space[9]}px;
    }
`;

const faq = css`
    background-color: ${palette.neutral[97]};
    padding-top: ${space[3]}px;
    padding-bottom: 18px;
    margin-top: ${space[9]}px;

    & a {
        color: ${palette.text.primary};
        display: block;
        margin-bottom: 22px;
    }
`;

const privacyLink = css`
    text-decoration: underline;
    border: 0;
    background: transparent;
    font-size: inherit;
    padding: 0;
    cursor: pointer;
`;

// TODO: Click handlers
// TODO: Tracking
// TODO: Tests
// TODO: Embed in article on storybook

export const SignInGate = ({ signInUrl, guUrl }: Props) => {
    const [showCpmUi, setShowCmpUi] = useState(false);

    return (
        <div className={cx(signinGate)}>
            <h1 className={cx(headingStyles)}>
                Register for free and continue reading
            </h1>
            <h2 className={cx(subHeader)}>
                It’s important to say this is not a step towards a paywall
            </h2>
            <p>
                We need more readers to register with us to help sustain our
                independent, quality journalism. Without you taking this simple
                step, we miss out on revenues from personalised advertising - a
                critical source of funding for our future.
            </p>
            <p>
                Through doing so, you&apos;ll help ensure that our reporting
                remains freely available to everyone, and if we recognise you
                when you come back, we can improve your news experience too. You
                can still control your own&nbsp;
                <button
                    className={cx(privacyLink)}
                    onClick={() => {
                        setShowCmpUi(!showCpmUi);
                    }}
                >
                    privacy settings
                </button>
                . Thank you
            </p>
            <div className={cx(actionButtons)}>
                <LinkButton
                    priority="primary"
                    size="small"
                    href={signInUrl}
                    onClick={() => {}}
                >
                    Register for free
                </LinkButton>

                <LinkButton
                    priority="subdued"
                    size="small"
                    href="#"
                    onClick={() => {}}
                >
                    I’ll do it later
                </LinkButton>
            </div>

            <h2 className={cx([subHeader, signInHeader])}>
                Have a subscription? Made a contribution? Already registered?
            </h2>

            <Link href={signInUrl}>Sign In</Link>

            <div className={cx(faq)}>
                <Link
                    href={`${guUrl}membership/2019/dec/20/signing-in-to-the-guardian`}
                >
                    Why register & how does it help?
                </Link>

                <Link
                    href={`${guUrl}info/2014/nov/03/why-your-data-matters-to-us-full-text`}
                >
                    How will my information & data be used?
                </Link>

                <Link href={`${guUrl}help/identity-faq`}>
                    Get help with registering or signing in
                </Link>
            </div>
            {showCpmUi && (
                <CMP
                    forceShow={true}
                    forceModal={true}
                    onClose={() => {
                        setShowCmpUi(false);
                    }}
                />
            )}
        </div>
    );
};
