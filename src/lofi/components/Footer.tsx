import React from 'react';
import { css, cx } from 'emotion';

import {
    brandText,
    brandAlt,
    brandBackground,
} from '@guardian/src-foundations/palette';
import { textSans } from '@guardian/src-foundations/typography';

// CSS
const footer = css`
    background-color: ${brandBackground.primary};
    color: ${brandText.primary};
    padding-bottom: 6px;
    ${textSans.medium()};
`;

const footerLink = css`
    color: inherit;
    text-decoration: none;
    padding-bottom: 12px;
    display: block;

    :hover {
        text-decoration: underline;
        color: ${brandAlt[400]};
    }
`;

const footerList = css`
    overflow: auto;
    width: 100%;

    ul {
        float: left;
        padding: 0 10px 0 10px;
        list-style: none;
    }
`;

const copyright = css`
    ${textSans.xsmall()};
    padding: 12px;
`;

const footerItemContainers = css`
    width: 100%;
    position: relative;
`;

const FooterLinks: React.FC<{
    pageFooter: FooterType;
}> = ({ pageFooter }) => {
    const linkGroups = pageFooter.footerLinks.map((linkGroup) => {
        const linkList = linkGroup.map((l: FooterLink, index: number) => (
            <li key={`${l.url}${index}`}>
                <a
                    className={cx(footerLink, l.extraClasses)}
                    href={l.url}
                    data-link-name={l.dataLinkName}
                >
                    {l.text}
                </a>
            </li>
        ));
        const key = linkGroup.reduce((acc, { text }) => `acc-${text}`, '');
        return <ul key={key}>{linkList}</ul>;
    });

    return <div className={footerList}>{linkGroups}</div>;
};

const year = new Date().getFullYear();

export const Footer: React.FC<{
    pillars: PillarType[];
    pillar: Pillar;
    pageFooter: FooterType;
}> = ({ pageFooter }) => (
    <footer className={footer}>
        <div className={footerItemContainers}>
            <FooterLinks pageFooter={pageFooter} />
        </div>
        <div className={copyright}>
            © {year} Guardian News & Media Limited or its affiliated companies.
            All rights reserved. (lofi)
        </div>
    </footer>
);
