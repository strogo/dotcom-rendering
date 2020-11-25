import React from 'react';
import { css, cx } from 'emotion';
import { Pillars } from '@root/src/lofi/components/Pillars';
import { clearFix } from '@root/src/lib/mixins';

type Props = {
    pillar: Pillar;
    nav: NavType;

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

export const Nav = ({ pillar, nav }: Props) => {
    return (
        <div className={rowStyles}>
            <nav
                className={cx(clearFixStyle, rowStyles)}
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
