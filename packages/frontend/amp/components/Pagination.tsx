import React from 'react';
import { css } from 'emotion';
import { palette } from '@guardian/pasteup/palette';
import ChevronRightSingle from '@guardian/pasteup/icons/chevron-right-single.svg';
import ChevronRightDouble from '@guardian/pasteup/icons/chevron-right-double.svg';
import ChevronLeftSingle from '@guardian/pasteup/icons/chevron-left-single.svg';
import ChevronLeftDouble from '@guardian/pasteup/icons/chevron-left-double.svg';
import { textSans } from '@guardian/pasteup/typography';

const paginationStyle = css`
    ${textSans(1)};
    font-weight: bold;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const paginationLinkStyle = (isActive: boolean, isMarginRight: boolean) => css`
    width: 36px;
    border-radius: 100%;

    position: relative;
    color: ${palette.neutral[7]};
    border: 1px solid ${palette.neutral[86]};
    height: 36px;
    line-height: 38px;
    display: inline-block;

    margin-right: ${isMarginRight ? '5px' : '0px'};

    span {
        fill: ${palette.neutral[100]};

        svg {
            position: absolute;
            top: 10px;
            left: 9px;
            width: 16px;
            height: 16px;
            fill: ${isActive ? palette.neutral[46] : palette.neutral[86]};
        }
    }
`;

export const Pagination: React.SFC<{
    pagination?: Pagination;
    guardianURL: string;
}> = ({ pagination, guardianURL }) => {
    const link = (
        url: string,
        icon: JSX.Element,
        suffix?: string,
        hasRightMargin: boolean = false,
    ): JSX.Element => {
        const styles = paginationLinkStyle(
            suffix !== undefined,
            hasRightMargin,
        );

        const attrs = {
            className: styles,
            href: suffix ? url + suffix : undefined,
        };

        return (
            <a {...attrs}>
                <span>{icon}</span>
            </a>
        );
    };

    if (!pagination) {
        return null;
    }

    return (
        <div className={paginationStyle}>
            <span>
                {link(
                    guardianURL,
                    <ChevronLeftDouble />,
                    pagination.newest,
                    true,
                )}
                {link(guardianURL, <ChevronLeftSingle />, pagination.newer)}
            </span>

            <span>
                {pagination.currentPage} of {pagination.totalPages}
            </span>

            <span>
                {link(
                    guardianURL,
                    <ChevronRightSingle />,
                    pagination.older,
                    true,
                )}
                {link(guardianURL, <ChevronRightDouble />, pagination.oldest)}
            </span>
        </div>
    );
};
