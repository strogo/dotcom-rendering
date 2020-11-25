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
import { until } from '@guardian/src-foundations/mq';
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

const gridTemplate = css`
    grid-template-areas:
        'title'
        'headline'
        'standfirst'
        'media'
        'lines'
        'meta'
        'body';
`;

const layoutGrid = css`
    /* IE Fallback */
    display: flex;
    flex-direction: column;

    @supports (display: grid) {
        display: grid;
        width: 100%;
        margin-left: 0;

        grid-column-gap: 10px;


            grid-template-columns: 1fr; /* Main content */
            ${gridTemplate}
        }
    }
`;

const StandardGrid = ({
    children,
}: {
    children: JSX.Element | JSX.Element[];
}) => <div className={layoutGrid}>{children}</div>;

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

    padding-left: 10px;
    margin-left: -10px;
`;

const ageWarningMargins = css`
    margin-top: 12px;
    margin-left: -10px;
    margin-bottom: 6px;
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
                <StandardGrid>
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
                        <div>
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
                        <div>
                            <MainMedia
                                elements={CAPI.mainMediaElements}
                                pillar={pillar}
                                adTargeting={adTargeting}
                            />
                        </div>
                    </GridItem>
                    <GridItem area="lines">
                        <div>
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
                        <div>
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
                            <main>
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
