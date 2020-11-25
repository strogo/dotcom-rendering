import React from 'react';
import { css } from 'emotion';

import { text } from '@guardian/src-foundations/palette';

import { Zero } from '@root/src/lofi/components/numbers/Zero';
import { One } from '@root/src/lofi/components/numbers/One';
import { Two } from '@root/src/lofi/components/numbers/Two';
import { Three } from '@root/src/lofi/components/numbers/Three';
import { Four } from '@root/src/lofi/components/numbers/Four';
import { Five } from '@root/src/lofi/components/numbers/Five';
import { Six } from '@root/src/lofi/components/numbers/Six';
import { Seven } from '@root/src/lofi/components/numbers/Seven';
import { Eight } from '@root/src/lofi/components/numbers/Eight';
import { Nine } from '@root/src/lofi/components/numbers/Nine';
import { Ten } from '@root/src/lofi/components/numbers/Ten';

type Props = {
    score: number;
};

export const Score = ({ score }: Props) => {
    const ScoreStyles = ({ children }: { children: React.ReactNode }) => (
        <div
            className={css`
                position: relative;
                width: 3.75rem;
                height: 3.75rem;
                border-radius: 1.875rem;
                border: 0.0625rem solid ${text.primary};

                svg {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                }
            `}
        >
            {children}
        </div>
    );

    switch (score) {
        case 0:
            return (
                <ScoreStyles>
                    <Zero />
                </ScoreStyles>
            );
        case 1:
            return (
                <ScoreStyles>
                    <One />
                </ScoreStyles>
            );
        case 2:
            return (
                <ScoreStyles>
                    <Two />
                </ScoreStyles>
            );
        case 3:
            return (
                <ScoreStyles>
                    <Three />
                </ScoreStyles>
            );
        case 4:
            return (
                <ScoreStyles>
                    <Four />
                </ScoreStyles>
            );
        case 5:
            return (
                <ScoreStyles>
                    <Five />
                </ScoreStyles>
            );
        case 6:
            return (
                <ScoreStyles>
                    <Six />
                </ScoreStyles>
            );
        case 7:
            return (
                <ScoreStyles>
                    <Seven />
                </ScoreStyles>
            );
        case 8:
            return (
                <ScoreStyles>
                    <Eight />
                </ScoreStyles>
            );
        case 9:
            return (
                <ScoreStyles>
                    <Nine />
                </ScoreStyles>
            );
        case 10:
        default:
            return (
                <ScoreStyles>
                    <Ten />
                </ScoreStyles>
            );
    }
};
