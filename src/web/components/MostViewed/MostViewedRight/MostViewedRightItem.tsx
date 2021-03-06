import React from 'react';
import { css } from 'emotion';

import { neutral, border, text } from '@guardian/src-foundations/palette';
import { headline } from '@guardian/src-foundations/typography';
import { AgeWarning } from '@root/src/web/components/AgeWarning';
import { Avatar } from '@root/src/web/components/Avatar';
import { LinkHeadline } from '@root/src/web/components/LinkHeadline';
import { useHover } from '@root/src/web/lib/useHover';

const listItemStyles = css`
    list-style: none;
    padding-top: 4px;
    margin-bottom: 12px;
    border-top: 1px solid ${border.secondary};

    &:first-of-type {
        padding-top: 0;
        border-top: none;
    }
`;

const linkTagStyles = css`
    text-decoration: none;
    font-weight: 500;
    ${headline.xxxsmall()};

    &:link,
    &:active {
        color: ${text.anchorSecondary};
    }
`;

const lineWrapperStyles = css`
    display: flex;
`;

const headlineWrapperStyles = css`
    width: calc(100% - 82px);
    display: flex;
    flex-direction: column;
`;

const imageWrapperStyles = css`
    width: 72px;
    height: 72px;
    padding-top: 3px;
    margin-right: 10px;
`;

const marginTopStyles = css`
    margin-top: 4px;
`;

type Props = {
    trail: TrailType;
    mostViewedItemIndex: number;
};

export const MostViewedRightItem = ({ trail, mostViewedItemIndex }: Props) => {
    const [hoverRef, isHovered] = useHover<HTMLAnchorElement>();

    const linkProps = {
        to: trail.url,
        visitedColour: neutral[46],
        preventFocus: true,
    };

    return (
        <li
            className={listItemStyles}
            data-link-name={`trail | ${mostViewedItemIndex + 1}`}
        >
            <a className={linkTagStyles} href={trail.url} ref={hoverRef}>
                <div className={lineWrapperStyles}>
                    {trail.image && (
                        <div className={imageWrapperStyles}>
                            <Avatar
                                imageSrc={trail.image}
                                imageAlt=""
                                pillar={trail.pillar}
                            />
                        </div>
                    )}
                    <div className={headlineWrapperStyles}>
                        {trail.isLiveBlog ? (
                            <LinkHeadline
                                designType={trail.designType}
                                headlineText={trail.headline}
                                pillar={trail.pillar}
                                size="small"
                                showUnderline={isHovered}
                                link={linkProps}
                                kickerText="Live"
                                showSlash={false}
                                byline={
                                    trail.showByline ? trail.byline : undefined
                                }
                            />
                        ) : (
                            <LinkHeadline
                                designType={trail.designType}
                                headlineText={trail.headline}
                                pillar={trail.pillar}
                                size="small"
                                showUnderline={isHovered}
                                link={linkProps}
                                byline={
                                    trail.showByline ? trail.byline : undefined
                                }
                            />
                        )}
                        <div className={marginTopStyles}>
                            {trail.ageWarning && (
                                <AgeWarning
                                    age={trail.ageWarning}
                                    size="small"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </a>
        </li>
    );
};
