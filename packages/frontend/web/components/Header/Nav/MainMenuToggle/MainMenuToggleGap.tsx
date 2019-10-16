import React, { Component } from 'react';
import { css, cx } from 'emotion';
import { desktop } from '@guardian/pasteup/breakpoints';
import { screenReaderOnly } from '@guardian/pasteup/mixins';
import { headline } from '@guardian/pasteup/typography';
import { VeggieBurger } from './VeggieBurger';
import { palette } from '@guardian/pasteup/palette';

const screenReadable = css`
    ${screenReaderOnly};
`;
const openMainMenu = css`
    ${headline(4)};
    font-weight: 300;
    color: ${palette.neutral[100]};
    cursor: pointer;
    display: none;
    position: relative;
    overflow: hidden;
    border: 0;
    background-color: transparent;
    height: 48px;
    padding-left: 9px;
    padding-right: 20px;
    ${desktop} {
        display: block;
        padding-top: 5px;
        height: 42px;
    }
    :hover {
        color: ${palette.highlight.main};
    }
    :focus {
        color: ${palette.highlight.main};
    }
`;
const checkbox = css`
    :checked {
        + div {
            display: block;
        }
    }
`;
const text = ({ showMainMenu }: { showMainMenu: boolean }) => css`
    display: block;
    height: 100%;
    :after {
        content: '';
        border: 1px solid currentColor;
        border-left: transparent;
        border-top: transparent;
        display: inline-block;
        height: 8px;
        margin-left: 6px;
        transform: ${showMainMenu
            ? 'translateY(1px) rotate(-135deg)'
            : 'translateY(-3px) rotate(45deg)'};
        transition: transform 250ms ease-out;
        vertical-align: middle;
        width: 8px;
    }
    :hover:after {
        transform: ${showMainMenu
            ? 'translateY(-2px) rotate(-135deg)'
            : 'translateY(0) rotate(45deg)'};
    }
`;

export const MainMenuToggle: React.FC<{ targetID: string }> = ({
    targetID,
}) => {
    const CHECKBOX_ID = 'main-menu-toggle';
    const showMainMenu = true;

    return (
        <gap-display data-target={targetID}>
            <VeggieBurger
                showMainMenu={showMainMenu}
                enhanceCheckbox={enhanceCheckbox}
                htmlFor={CHECKBOX_ID}
                ariaControls={'foo'}
                key="VeggieBurger"
            />
            ,
            <button
                className={openMainMenu}
                aria-controls={ariaControls}
                key="OpenMainMenuButton"
                data-link-name={`nav2 : veggie-burger : ${
                    showMainMenu ? 'show' : 'hide'
                }`}
            >
                <span className={screenReadable}>Show</span>
                <span className={text({ showMainMenu })}>More</span>
            </button>
        </gap-display>
    );
};
