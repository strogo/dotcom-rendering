import React from 'react';
import { css, cx } from 'emotion';
import { headline } from '@guardian/pasteup/typography';
import { palette } from '@guardian/pasteup/palette';
import {
    desktop,
    tablet,
    leftCol,
    wide,
    phablet,
} from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { BigNumber } from '@guardian/guui';
import {
    MoustacheSection,
    moustacheVariable,
} from '../../amp/components/moustache';

const container = css`
    padding-top: 3px;

    ${desktop} {
        padding-top: 6px;
    }
`;

const heading = css`
    ${headline(4)};
    color: ${palette.neutral[7]};
    font-weight: 900;
    padding-right: 5px;
    padding-bottom: 4px;

    ${leftCol} {
        ${headline(3)};
        width: 140px;
        position: relative;

        :after {
            content: '';
            display: block;
            position: absolute;
            height: 30px;
            width: 1px;
            background-color: ${palette.neutral[86]};
            right: -11px;
            top: -6px;
        }
    }

    ${wide} {
        width: 220px;
    }
`;

const listContainer = css`
    max-width: 460px;

    ${leftCol} {
        margin-left: 160px;
    }

    ${wide} {
        margin-left: 230px;
    }
`;

const list = css`
    margin-top: 12px;

    ${tablet} {
        border-top: 1px solid ${palette.neutral[86]};
        min-height: 300px;
        column-width: 300px;
        column-gap: 20px;
        column-fill: balance;
        column-count: 2;
    }
`;

const listItem = css`
    position: relative;
    box-sizing: border-box;
    padding-top: 4px;
    padding-bottom: 24px;

    &:before {
        position: absolute;
        top: 0;
        right: 10px;
        left: 0;
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: ${palette.neutral[86]};
    }

    :first-of-type {
        &:before {
            display: none;
        }
    }

    &:after {
        content: '';
        display: block;
        clear: both;
    }

    ${tablet} {
        padding-top: 3px;
        padding-bottom: 0;
        min-height: 72px;
    }

    ${desktop} {
        width: 100%;

        :nth-of-type(6) {
            &:before {
                display: none;
            }
        }
    }
`;

const bigNumber = css`
    float: left;
    margin-top: 3px;
    fill: ${palette.neutral[7]};
`;

const headlineHeader = css`
    margin-top: -4px;
    margin-left: 70px;
    padding-top: 2px;
    padding-bottom: 2px;
    word-wrap: break-word;
    overflow: hidden;
`;

const headlineLink = css`
    text-decoration: none;
    color: ${palette.neutral[7]};
    font-weight: 500;
    ${headline(2)};
`;

const tabsContainer = css`
    border-bottom: 1px solid ${palette.neutral[86]};

    &::after {
        content: '';
        display: block;
        clear: left;

        ${tablet} {
            display: none;
        }
    }

    ${tablet} {
        border-bottom: 0;
    }
`;

const listTab = css`
    width: 50%;
    float: left;
    border-top: 3px solid ${palette.neutral[93]};
    background-color: ${palette.neutral[93]};

    ${phablet} {
        width: 230px;
    }
`;

const tabButton = css`
    ${headline(1)};
    margin: 0;
    border: 0;
    background: transparent;
    padding-left: 10px;
    padding-right: 6px;
    padding-top: 4px;
    text-align: left;
    text-decoration: none;
    font-weight: 600;
    min-height: 36px;
    display: block;
    width: 100%;

    &:hover {
        cursor: pointer;
    }

    ${tablet} {
        ${headline(2)};
    }
`;

const liveKicker = css`
    color: ${palette.news.main};
    font-weight: 700;

    &::after {
        content: '/';
        display: inline-block;
        font-weight: 900;
        margin: 0 4px;
    }
`;

const tabs = css`
    display: flex;
    flex-wrap: wrap;

    [data-selected='true'] + ol {
        display: block;
    }

    width: 620px;
`;

const tabContent = css`
    order: 1;
    display: none;
`;

export const MostViewed2: React.FC<{
    src: string;
}> = ({ src }) => {
    return (
        <div className={container}>
            <h2 className={heading}>Most viewed</h2>
            <gap-list data-src={src}>
                <template>
                    <div className={listContainer}>
                        <gap-select>
                            <div
                                className={cx(tabsContainer, tabs)}
                                role="tablist"
                            >
                                <MoustacheSection name=".">
                                    <div
                                        className={listTab}
                                        role="tab"
                                        data-option="true"
                                        data-selected={'true'} // TODO only on first index!
                                    >
                                        <button className={tabButton}>
                                            <span
                                                className={css`
                                                    ${screenReaderOnly};
                                                `}
                                            >
                                                Most viewed{' '}
                                            </span>
                                            <span>
                                                {moustacheVariable('heading')}
                                            </span>
                                        </button>
                                    </div>
                                    <ol className={cx(list, tabContent)}>
                                        <MoustacheSection name="trails">
                                            <li className={listItem}>
                                                <span className={bigNumber}>
                                                    <BigNumber index={1} />
                                                </span>
                                                <h2 className={headlineHeader}>
                                                    <a
                                                        className={headlineLink}
                                                        href={moustacheVariable(
                                                            'url',
                                                        )}
                                                    >
                                                        <MoustacheSection name="isLiveBlog">
                                                            <span
                                                                className={
                                                                    liveKicker
                                                                }
                                                            >
                                                                Live
                                                            </span>
                                                        </MoustacheSection>
                                                        {moustacheVariable(
                                                            'linkText',
                                                        )}
                                                    </a>
                                                </h2>
                                            </li>
                                        </MoustacheSection>
                                    </ol>
                                </MoustacheSection>
                            </div>
                        </gap-select>
                    </div>
                </template>
            </gap-list>
        </div>
    );
};
