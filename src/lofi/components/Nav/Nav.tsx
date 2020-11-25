import React from 'react';
import { css, cx } from 'emotion';
import { Pillars } from '@root/src/lofi/components/Pillars';
import { clearFix } from '@root/src/lib/mixins';
import { Display } from '@root/src/lib/display';

type Props = {
    pillar: Pillar;
    nav: NavType;
    display: Display;
    subscribeUrl: string;
    edition: Edition;
};

const clearFixStyle = css`
    ${clearFix};
`;

const rowStyles = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const minHeight = css`
    min-height: 48px;
`;

export const Nav = ({ display, pillar, nav }: Props) => {
    return (
        <div className={rowStyles}>
            <nav
                className={cx(
                    clearFixStyle,
                    rowStyles,
                    display === Display.Immersive && minHeight,
                )}
                role="navigation"
                aria-label="Guardian sections"
                data-component="nav2"
            >
                <Pillars
                    pillars={nav.pillars}
                    pillar={pillar}
                    dataLinkName="nav2"
                />
            </nav>
        </div>
    );
};
