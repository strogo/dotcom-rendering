import React from 'react';
import { css } from 'emotion';

import {
    neutral,
    background,
    brandAltBackground,
    brandBackground,
    brandLine,
    brandBorder,
} from '@guardian/src-foundations/palette';
import { from, until } from '@guardian/src-foundations/mq';
import { GuardianLines } from '@root/src/lofi/components/GuardianLines';

import { StarRating } from '@root/src/lofi/components/StarRating/StarRating';
import { ArticleBody } from '@root/src/lofi/components/ArticleBody';
import { ArticleTitle } from '@root/src/lofi/components/ArticleTitle';
import { ArticleContainer } from '@root/src/lofi/components/ArticleContainer';
import { ArticleMeta } from '@root/src/lofi/components/ArticleMeta';
import { SubMeta } from '@root/src/lofi/components/SubMeta';
import { MainMedia } from '@root/src/lofi/components/MainMedia';
import { ArticleHeadline } from '@root/src/lofi/components/ArticleHeadline';
import { ArticleHeadlinePadding } from '@root/src/lofi/components/ArticleHeadlinePadding';
import { ArticleStandfirst } from '@root/src/lofi/components/ArticleStandfirst';
import { Header } from '@root/src/lofi/components/Header';
import { Footer } from '@root/src/lofi/components/Footer';
import { Section } from '@root/src/lofi/components/Section';
import { Nav } from '@root/src/lofi/components/Nav/Nav';

import { Border } from '@root/src/lofi/components/Border';
import { GridItem } from '@root/src/lofi/components/GridItem';
import { AgeWarning } from '@root/src/lofi/components/AgeWarning';

import { buildAdTargeting } from '@root/src/lib/ad-targeting';
import { getAgeWarning } from '@root/src/lib/age-warning';
import {
    decideLineCount,
    decideLineEffect,
    getCurrentPillar,
} from '@root/src/lofi/lib/layoutHelpers';

const gridTemplateWide = css`
    grid-template-areas:
        'title  border  headline     right-column'
        '.      border  standfirst   right-column'
        'lines  border  media        right-column'
        'meta   border  media        right-column'
        'meta   border  body         right-column'
        '.      border  .            right-column';
`;

const gridTemplateWidePreFurnished = css`
    grid-template-areas:
        'title  border  preFurniture right-column'
        '.      border  headline     right-column'
        '.      border  standfirst   right-column'
        'lines  border  media        right-column'
        'meta   border  media        right-column'
        'meta   border  body         right-column'
        '.      border  .            right-column';
`;

const gridTemplateLeftCol = css`
    grid-template-areas:
        'preFurniture  right-column'
        'title         right-column'
        'headline      right-column'
        'standfirst    right-column'
        'media         right-column'
        'lines         right-column'
        'meta          right-column'
        'body          right-column'
        '.             right-column';
`;

const gridTemplateLeftColPreFurnished = css`
    grid-template-areas:
        'title         right-column'
        'headline      right-column'
        'standfirst    right-column'
        'media         right-column'
        'lines         right-column'
        'meta          right-column'
        'body          right-column'
        '.             right-column';
`;

const gridTemplateDesktop = css`
    grid-template-areas:
        'title'
        'headline'
        'standfirst'
        'media'
        'lines'
        'meta'
        'body';
`;
const gridTemplateDesktopPreFurnished = css`
    grid-template-areas:
        'preFurniture'
        'title'
        'headline'
        'standfirst'
        'media'
        'lines'
        'meta'
        'body';
`;

const gridTemplateTablet = css`
    grid-template-areas:
        'media'
        'title'
        'headline'
        'standfirst'
        'lines'
        'meta'
        'body';
`;
const gridTemplateTabletPreFurnished = css`
    grid-template-areas:
        'preFurniture'
        'media'
        'title'
        'headline'
        'standfirst'
        'lines'
        'meta'
        'body';
`;

const layoutGrid = (hasPreFurniture?: boolean) =>
    css`
        /* IE Fallback */
        display: flex;
        flex-direction: column;
        ${until.leftCol} {
            margin-left: 0px;
        }
        ${from.leftCol} {
            margin-left: 151px;
        }
        ${from.wide} {
            margin-left: 230px;
        }

        @supports (display: grid) {
            display: grid;
            width: 100%;
            margin-left: 0;

            grid-column-gap: 10px;

            ${from.wide} {
                grid-template-columns:
                    219px /* Left Column (220 - 1px border) */
                    1px /* Vertical grey border */
                    1fr /* Main content */
                    300px; /* Right Column */

                ${hasPreFurniture
                    ? gridTemplateWidePreFurnished
                    : gridTemplateWide}
            }

            ${until.wide} {
                grid-template-columns:
                    140px /* Left Column */
                    1px /* Vertical grey border */
                    1fr /* Main content */
                    300px; /* Right Column */

                ${hasPreFurniture
                    ? gridTemplateWidePreFurnished
                    : gridTemplateWide}
            }

            ${until.leftCol} {
                grid-template-columns:
                    1fr /* Main content */
                    300px; /* Right Column */
                ${hasPreFurniture
                    ? gridTemplateLeftColPreFurnished
                    : gridTemplateLeftCol}
            }

            ${until.desktop} {
                grid-template-columns: 1fr; /* Main content */
                ${hasPreFurniture
                    ? gridTemplateDesktopPreFurnished
                    : gridTemplateDesktop}
            }

            ${until.tablet} {
                grid-column-gap: 0px;

                grid-template-columns: 1fr; /* Main content */
                ${hasPreFurniture
                    ? gridTemplateTabletPreFurnished
                    : gridTemplateTablet}
            }
        }
    `;

const StandardGrid = ({
    children,
    designType,
    CAPI,
}: {
    children: JSX.Element | JSX.Element[];
    designType: DesignType;
    CAPI: CAPIType;
}) => (
    <div
        className={layoutGrid(designType === 'MatchReport' && !!CAPI.matchUrl)}
    >
        {children}
    </div>
);

const maxWidth = css`
    ${from.desktop} {
        max-width: 620px;
    }
`;

const articleWidth = css`
    ${from.desktop} {
        width: 620px;
    }
`;

const stretchLines = css`
    ${until.phablet} {
        margin-left: -20px;
        margin-right: -20px;
    }
    ${until.mobileLandscape} {
        margin-left: -10px;
        margin-right: -10px;
    }
`;

const starWrapper = css`
    margin-bottom: 18px;
    margin-top: 6px;
    background-color: ${brandAltBackground.primary};
    display: inline-block;

    ${until.phablet} {
        padding-left: 20px;
        margin-left: -20px;
    }
    ${until.leftCol} {
        padding-left: 0px;
        margin-left: -0px;
    }

    padding-left: 10px;
    margin-left: -10px;
`;

const ageWarningMargins = css`
    margin-top: 12px;
    margin-left: -10px;
    margin-bottom: 6px;

    ${from.tablet} {
        margin-left: -20px;
    }

    ${from.leftCol} {
        margin-left: -10px;
        margin-top: 0;
    }
`;

interface Props {
    CAPI: CAPIType;
    NAV: NavType;
    designType: DesignType;
    pillar: Pillar;
}

export const LofiLayout = ({ CAPI, NAV, designType, pillar }: Props) => {
    const {
        config: { host },
    } = CAPI;

    const adTargeting: AdTargeting = buildAdTargeting(CAPI.config);

    const age = getAgeWarning(CAPI.tags, CAPI.webPublicationDate);

    return (
        <>
            <div>
                <Section
                    showTopBorder={false}
                    showSideBorders={false}
                    padded={false}
                    backgroundColour={brandBackground.primary}
                >
                    <Header />
                </Section>

                <Section
                    showSideBorders={true}
                    borderColour={brandLine.primary}
                    showTopBorder={false}
                    padded={false}
                    backgroundColour={brandBackground.primary}
                >
                    <Nav
                        pillar={getCurrentPillar(CAPI)}
                        nav={NAV}
                        subscribeUrl={
                            CAPI.nav.readerRevenueLinks.header.subscribe
                        }
                        edition={CAPI.editionId}
                    />
                </Section>

                <Section
                    backgroundColour={background.primary}
                    padded={false}
                    showTopBorder={false}
                >
                    <GuardianLines count={4} pillar={pillar} />
                </Section>
            </div>

            <Section showTopBorder={false}>
                <StandardGrid designType={designType} CAPI={CAPI}>
                    <GridItem area="title">
                        <ArticleTitle
                            designType={designType}
                            tags={CAPI.tags}
                            sectionLabel={CAPI.sectionLabel}
                            sectionUrl={CAPI.sectionUrl}
                            guardianBaseURL={CAPI.guardianBaseURL}
                            pillar={pillar}
                            badge={CAPI.badge}
                        />
                    </GridItem>
                    <GridItem area="border">
                        <Border />
                    </GridItem>

                    <GridItem area="headline">
                        <div className={maxWidth}>
                            <ArticleHeadlinePadding designType={designType}>
                                {age && (
                                    <div className={ageWarningMargins}>
                                        <AgeWarning age={age} />
                                    </div>
                                )}
                                <ArticleHeadline
                                    headlineString={CAPI.headline}
                                />
                                {age && (
                                    <AgeWarning
                                        age={age}
                                        isScreenReader={true}
                                    />
                                )}
                            </ArticleHeadlinePadding>
                        </div>
                        {CAPI.starRating || CAPI.starRating === 0 ? (
                            <div className={starWrapper}>
                                <StarRating
                                    rating={CAPI.starRating}
                                    size="large"
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                    </GridItem>
                    <GridItem area="standfirst">
                        <ArticleStandfirst
                            designType={designType}
                            pillar={pillar}
                            standfirst={CAPI.standfirst}
                        />
                    </GridItem>
                    <GridItem area="media">
                        <div className={maxWidth}>
                            <MainMedia
                                elements={CAPI.mainMediaElements}
                                pillar={pillar}
                                adTargeting={adTargeting}
                            />
                        </div>
                    </GridItem>
                    <GridItem area="lines">
                        <div className={maxWidth}>
                            <div className={stretchLines}>
                                <GuardianLines
                                    count={decideLineCount(designType)}
                                    pillar={pillar}
                                    effect={decideLineEffect(
                                        designType,
                                        pillar,
                                    )}
                                />
                            </div>
                        </div>
                    </GridItem>
                    <GridItem area="meta">
                        <div className={maxWidth}>
                            <ArticleMeta
                                pillar={pillar}
                                author={CAPI.author}
                                tags={CAPI.tags}
                                primaryDateline={CAPI.blocks[0].primaryDateLine}
                                secondaryDateline={
                                    CAPI.blocks[0].secondaryDateLine
                                }
                            />
                        </div>
                    </GridItem>
                    <GridItem area="body">
                        <ArticleContainer>
                            <main className={articleWidth}>
                                <ArticleBody
                                    pillar={pillar}
                                    blocks={CAPI.blocks}
                                    designType={designType}
                                    adTargeting={adTargeting}
                                    host={host}
                                />
                                <GuardianLines count={4} pillar={pillar} />
                                <SubMeta
                                    pillar={pillar}
                                    subMetaKeywordLinks={
                                        CAPI.subMetaKeywordLinks
                                    }
                                    subMetaSectionLinks={
                                        CAPI.subMetaSectionLinks
                                    }
                                />
                            </main>
                        </ArticleContainer>
                    </GridItem>
                </StandardGrid>
            </Section>

            <Section
                padded={false}
                showTopBorder={false}
                showSideBorders={false}
                backgroundColour={neutral[93]}
            />

            <Section
                padded={false}
                backgroundColour={brandBackground.primary}
                borderColour={brandBorder.primary}
            >
                <Footer
                    pageFooter={CAPI.pageFooter}
                    pillar={pillar}
                    pillars={NAV.pillars}
                />
            </Section>
        </>
    );
};
