import React from 'react';
import { css, cx } from 'emotion';

import { headline, textSans } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { LinkButton } from '@guardian/src-button';

interface Props {
    signInUrl: string;
    guUrl: string;
}

const signinGate = css`
    clear: left;
    margin-bottom: $gs-baseline * 2;
    ${from.tablet} {
        padding: ($gs-baseline * 2) 0;
    }
    ${from.desktop} {
        min-height: 600px;
    }

    p {
        ${textSans.medium({ lineHeight: 'tight' })}
    }
`;

const headingStyles = css`
    ${headline.medium({ fontWeight: 'bold' })};
`;

const subHeader = css`
    ${textSans.medium({ fontWeight: 'bold' })};
`;

export const SignInGate = ({ signInUrl, guUrl }: Props) => (
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
            Through doing so, you&apos;ll help ensure that our reporting remains
            freely available to everyone, and if we recognise you when you come
            back, we can improve your news experience too. You can still control
            your own privacy settings. Thank you
        </p>
        <LinkButton
            priority="primary"
            size="default"
            href={signInUrl}
            onClick={() => {}}
        >
            Register for free
        </LinkButton>
        <LinkButton
            priority="secondary"
            size="default"
            href="#"
            onClick={() => {}}
        >
            I’ll do it later
        </LinkButton>

        <div className="signin-gate__buttons">
            <a
                className="signin-gate__link js-signin-gate__why"
                href={`${guUrl}/membership/2019/dec/20/signing-in-to-the-guardian`}
            >
                Why register & how does it help?
            </a>
        </div>
        <div className="signin-gate__buttons">
            <a
                className="signin-gate__link js-signin-gate__how"
                href={`${guUrl}/info/2014/nov/03/why-your-data-matters-to-us-full-text`}
            >
                How will my information & data be used?
            </a>
        </div>
        <div className="signin-gate__buttons">
            <a
                className="signin-gate__link js-signin-gate__help"
                href={`${guUrl}/help/identity-faq`}
            >
                Get help with registering or signing in
            </a>
        </div>
    </div>
);
