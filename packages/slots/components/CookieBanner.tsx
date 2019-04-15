import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import { headline, textSans, body } from '@guardian/pasteup/typography';
import { Container } from '@guardian/guui';
import TickIcon from '@guardian/pasteup/icons/tick.svg';
import RoundelIcon from '@guardian/pasteup/icons/the-guardian-roundel.svg';
import { until } from '@guardian/pasteup/breakpoints';

const banner = css`
    background-color: ${palette.neutral[20]};
    padding: 10px 0 24px;
    width: 100%;
    position: relative;
`;

const inner = css`
    padding: 0 10px;
    max-width: 60%;
    margin: 0 20%;
    p {
        ${body(2)};
        margin-top: 0;
        color: ${palette.neutral[100]};
        margin-bottom: 8px;
    }

    a {
        color: ${palette.neutral[100]};
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        text-decoration: none;

        :hover {
            border-color: ${palette.neutral[100]};
        }
    }
    ${until.phablet} {
        max-width: 90%;
        margin: auto;
        padding 0;
        p {
            ${body(1)};
        }
    }
`;

const header = css`
    ${headline(6)};
    font-weight: bold;
    padding-bottom: 12px;
    color: ${palette.neutral[100]};
`;

const more = css`
    margin-left: 12px;
    ${textSans(3)};
    font-weight: bold;
`;

const iconCss = css`
    max-width: 20%;
    position: absolute;
    left: 45px;
    ${until.phablet} {
        display: none;
    }
`;

const button = css`
    ${textSans(5)};
    border-radius: 1000px;
    background: ${palette.highlight.main};
    color: ${palette.neutral[7]};
    padding: 0 25px 0 46px;
    display: block;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
    border: 0;
    white-space: nowrap;
    display: inline-block;
    font-weight: bold;

    svg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        width: 42px;
        height: 42px;
        transform: scale(0.5);
    }
`;

const actions = css`
    margin-top: 24px;
`;

export const CookieBanner: React.FC<{}> = () => (
    <div className={banner} id="CookieBanner">
        <Container className={inner}>
            <div className={iconCss}>
                <RoundelIcon />
            </div>
            <h1 className={header}>Your privacy</h1>
            <p>
                We use cookies to improve your experience on our site and to
                show you personalised advertising.
            </p>
            <p>
                To find out more, read our{' '}
                <a href="/help/privacy-policy">privacy policy</a> and{' '}
                <a href="/info/cookies">cookie policy</a>.
            </p>
            <div className={actions}>
                <gap-display
                    data-hide="true"
                    data-target="CookieBanner"
                    class={button}
                >
                    <TickIcon />
                    I'm OK with that
                </gap-display>
                <a
                    className={more}
                    href="https://profile.theguardian.com/privacy-settings"
                >
                    My options
                </a>
            </div>
        </Container>
    </div>
);
