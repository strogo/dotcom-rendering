import React from 'react';
import { css } from 'emotion';

import { Flex } from '@root/src/web/components/Flex';
import { StickyAd } from '@root/src/web/components/StickyAd';
import { ArticleBody } from '@root/src/web/components/ArticleBody';
import { ArticleLeft } from '@root/src/web/components/ArticleLeft';
import { ArticleRight } from '@root/src/web/components/ArticleRight';
import { ArticleTitle } from '@root/src/web/components/ArticleTitle';
import { ArticleContainer } from '@root/src/web/components/ArticleContainer';
import { ArticleMeta } from '@root/src/web/components/ArticleMeta';
import { Hide } from '@root/src/web/components/Hide';
import { GuardianLines } from '@root/src/web/components/GuardianLines';
import { SubMeta } from '@root/src/web/components/SubMeta';

import { palette } from '@guardian/src-foundations';

import { Header } from '@root/src/web/components/Header/Header';
import { Footer } from '@root/src/web/components/Footer';
import { SubNav } from '@root/src/web/components/SubNav/SubNav';
import { CookieBanner } from '@root/src/web/components/CookieBanner';
import { OutbrainContainer } from '@root/src/web/components/Outbrain';
import { Section } from '@root/src/web/components/Section';
import { Nav } from '@root/src/web/components/Nav/Nav';
import { HeaderAdSlot } from '@root/src/web/components/HeaderAdSlot';
import { StandardHeader } from './StandardHeader';
// import GE2019 from '@frontend/static/badges/general-election-2019.svg';

const badgeSvgs: any = {
    'world/series/the-new-arrivals': require('@frontend/static/badges/new-arrivals.png'),
    'uk-news/series/the-brexit-gamble': require('@frontend/static/badges/EUReferendumBadge.svg'),
    'politics/series/road-to-the-vote': require('@frontend/static/badges/EUReferendumBadge.svg'),
    'politics/series/brexit-frontline': require('@frontend/static/badges/EUReferendumBadge.svg'),
    'politics/series/brexit-divided-generations': require('@frontend/static/badges/EUReferendumBadge.svg'),
    'politics/series/brexit-how-it-came-to-this': require('@frontend/static/badges/EUReferendumBadge.svg'),
    'uk-news/series/london-versus': require('@frontend/static/badges/london-versus.svg'),
    'membership/series/beyond-the-blade': require('@frontend/static/badges/beyondthebladebadge.svg'),
    'politics/2019-european-parliamentary-elections': require('@frontend/static/badges/eu_election.svg'),
    'news/series/paradise-papers': require('@frontend/static/badges/pp_web.svg'),
    'news/series/cambridge-analytica-files': require('@frontend/static/badges/calock.svg'),
    'society/series/nhs-at-70': require('@frontend/static/badges/nhs-70.svg'),
    'sport/cricket-world-cup-2019': require('@frontend/static/badges/cricket-world-cup.svg'),
    'football/womens-world-cup-2019': require('@frontend/static/badges/womens-world-cup.svg'),
    'environment/series/green-blood': require('@frontend/static/badges/green-blood.svg'),
    'us-news/us-elections-2020': require('@frontend/static/badges/us-elections-2020.svg'),
    'australia-news/australian-election-2019': require('@frontend/static/badges/australian-election-2019.svg'),
    'us-news/us-midterm-elections-2018': require('@frontend/static/badges/midterm.svg'),
    'world/series/the-new-populism': require('@frontend/static/badges/the-new-populism.svg'),
    'society/series/the-implant-files': require('@frontend/static/badges/the-implant-files.svg'),
    'politics/series/the-real-boris-johnson': require('@frontend/static/badges/the-real-boris-johnson.svg'),
    'uk-news/series/johnsons-promises': require('@frontend/static/badges/johnsons-promises.svg'),
    'sport/rugby-world-cup-2019': require('@frontend/static/badges/rugby-world-cup.svg'),
    'uk-news/series/behind-the-lines': require('@frontend/static/badges/behind-the-lines.svg'),
    'cities/series/the-empty-doorway': require('@frontend/static/badges/the-empty-doorway.svg'),
    'world/series/yemen-at-war': require('@frontend/static/badges/yemen-at-war.svg'),
    'environment/series/the-polluters': require('@frontend/static/badges/the-polluters.svg'),
    'society/youthjustice': require('@frontend/static/badges/childrenInTheDocks-Icon1.svg'),
    'politics/general-election-2019': require('@frontend/static/badges/ge2019-badge.svg'),
    'politics/series/lost-in-politics': require('@frontend/static/badges/lost-in-politics-badge.svg'),
};

/* tslint:disable */
function getArticleBadge(tags: TagType[]): any {
    for (let i = 0; i < tags.length; i++) {
        if (badgeSvgs[tags[i].id]) {
            return {
                linkTo: tags[i].id,
                svgSrc: badgeSvgs[tags[i].id],
            };
        }
    }
}
/* tslint:enable */

interface Props {
    CAPI: CAPIType;
    config: ConfigType;
    NAV: NavType;
}

export const StandardLayout = ({ CAPI, config, NAV }: Props) => {
    const tagBadge = getArticleBadge(CAPI.tags);
    return (
        <>
            <Section
                showTopBorder={false}
                showSideBorders={false}
                padded={false}
            >
                <HeaderAdSlot
                    config={config}
                    isAdFreeUser={CAPI.isAdFreeUser}
                    shouldHideAds={CAPI.shouldHideAds}
                />
            </Section>
            <Section
                showTopBorder={false}
                showSideBorders={false}
                padded={false}
                backgroundColour={palette.brand.main}
            >
                <Header
                    nav={NAV}
                    pillar={CAPI.pillar}
                    edition={CAPI.editionId}
                />
            </Section>

            <Section
                islandId="nav-root"
                showSideBorders={true}
                borderColour={palette.brand.pastel}
                showTopBorder={false}
                padded={false}
                backgroundColour={palette.brand.main}
            >
                <Nav pillar={CAPI.pillar} nav={NAV} />
            </Section>

            <Section backgroundColour={palette.neutral[100]} padded={false}>
                <SubNav
                    subnav={NAV.subNavSections}
                    currentNavLink={NAV.currentNavLink}
                    pillar={CAPI.pillar}
                />
            </Section>

            <Section showTopBorder={false}>
                <Flex>
                    <ArticleLeft>
                        <ArticleTitle
                            CAPI={CAPI}
                            badge={tagBadge}
                            inLeftCol={true}
                        />
                        <ArticleMeta CAPI={CAPI} config={config} />
                    </ArticleLeft>
                    <ArticleContainer>
                        <StandardHeader CAPI={CAPI} badge={tagBadge} />
                        <Hide when="above" breakpoint="leftCol">
                            <ArticleMeta CAPI={CAPI} config={config} />
                        </Hide>
                        <main
                            className={css`
                                max-width: 630px;
                            `}
                        >
                            <ArticleBody CAPI={CAPI} config={config} />
                            <GuardianLines pillar={CAPI.pillar} />
                            <SubMeta
                                pillar={CAPI.pillar}
                                subMetaKeywordLinks={CAPI.subMetaKeywordLinks}
                                subMetaSectionLinks={CAPI.subMetaSectionLinks}
                                pageId={CAPI.pageId}
                                webUrl={CAPI.webURL}
                                webTitle={CAPI.webTitle}
                                showBottomSocialButtons={
                                    CAPI.showBottomSocialButtons
                                }
                                badge={tagBadge}
                            />
                        </main>
                    </ArticleContainer>
                    <ArticleRight>
                        <StickyAd config={config} />
                        <div data-island="most-viewed-right" />
                    </ArticleRight>
                </Flex>
            </Section>

            <Section showTopBorder={false}>
                <OutbrainContainer config={config} />
            </Section>

            <Section islandId="most-viewed-footer" />

            <Section padded={false}>
                <SubNav
                    subnav={NAV.subNavSections}
                    pillar={CAPI.pillar}
                    currentNavLink={NAV.currentNavLink}
                />
            </Section>

            <Section
                padded={false}
                backgroundColour={palette.brand.main}
                borderColour={palette.brand.pastel}
            >
                <Footer
                    nav={NAV}
                    edition={CAPI.editionId}
                    pageFooter={CAPI.pageFooter}
                    pillar={CAPI.pillar}
                    pillars={NAV.pillars}
                />
            </Section>

            <CookieBanner />
        </>
    );
};
