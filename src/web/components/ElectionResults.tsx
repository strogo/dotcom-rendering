import React, { useState } from 'react';
import { css } from 'emotion';
import EUElection from '@frontend/static/icons/eu_election.svg';
import { palette } from '@guardian/src-foundations';
import X from '@frontend/static/icons/x.svg';

const electionResultsModal = (open: boolean) => css`
    z-index: 10;
    position: fixed;
    bottom: 100px;
    right: 20px;
    background: ${palette.neutral[100]};
    padding: 8px;
    border-radius: 3px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 32px rgba(0, 0, 0, 0.16);
    overflow: hidden;

    iframe {
        height: 210px;
        width: 400px;
    }

    display: ${open ? 'block' : 'none'};
`;

const electionResultsArrow = (open: boolean) => css`
    z-index: 10;
    position: fixed;
    bottom: 90px;
    right: 40px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid ${palette.neutral[100]};
    display: ${open ? 'block' : 'none'};
`;

const electionResultsButton = css`
    z-index: 10;
    position: fixed;
    bottom: 20px;
    right: 20px;
    height: 60px;
    width: 60px;
    border-radius: 100px;
    overflow: hidden;
    background: rgb(29, 53, 129);
    transition: box-shadow 80ms ease-in-out, -webkit-box-shadow 80ms ease-in-out;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 32px rgba(0, 0, 0, 0.16);

    &:hover {
        cursor: pointer;
    }

    svg {
        fill: white;

        &.center {
            height: 60px;
            margin-left: 20px;
        }
    }
`;

// TODO:
// Timebox
// Remove from page option
// How would it play with cookie banners
// handle link to results tracker
export const ElectionResults: React.FC<{}> = () => {
    const [open, setOpen] = useState(false);

    return (
        <section>
            <section>
                <div className={electionResultsModal(open)}>
                    <iframe src="http://frequent-holiday.surge.sh/interactive.html" />
                </div>
                <div className={electionResultsArrow(open)} />
            </section>
            <div
                className={electionResultsButton}
                role="button"
                onClick={e => setOpen(!open)}
            >
                {open ? <X className="center" /> : <EUElection />}
            </div>
        </section>
    );
};
