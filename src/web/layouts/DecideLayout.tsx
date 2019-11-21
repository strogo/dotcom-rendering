import React from 'react';
import { designTypeDefault } from '@root/src/lib/designTypes';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';

import { hasShowcase } from './layoutHelpers';

// import badgeNewArrivals from '@frontend/static/badges/new-arrivals.png';
import badgeEUReferendum from '@frontend/static/badges/EUReferendumBadge.svg';
import badgeLondonVersus from '@frontend/static/badges/london-versus.svg';
import badgeBeyondTheBlade from '@frontend/static/badges/beyondthebladebadge.svg';
import badgeEUElection from '@frontend/static/badges/eu_election.svg';
import badgeParadisePapers from '@frontend/static/badges/pp_web.svg';
import badgeCAFiles from '@frontend/static/badges/calock.svg';
import badgeNHS70 from '@frontend/static/badges/nhs-70.svg';
import badgeCricketWorldCup2019 from '@frontend/static/badges/cricket-world-cup.svg';
import badgeWomensWorldCup2019 from '@frontend/static/badges/womens-world-cup.svg';
import badgeGreenBlood from '@frontend/static/badges/womens-world-cup.svg';
import badgeUSElections2020 from '@frontend/static/badges/us-elections-2020.svg';
import badgeAustralianElections2019 from '@frontend/static/badges/australian-election-2019.svg';
import badgeMidtermElections2018 from '@frontend/static/badges/midterm.svg';
import badgeNewPopulism from '@frontend/static/badges/the-new-populism.svg';
import badgeImplantFiles from '@frontend/static/badges/the-implant-files.svg';
import badgeRealBoJo from '@frontend/static/badges/the-real-boris-johnson.svg';
import badgeBoJoPromises from '@frontend/static/badges/johnsons-promises.svg';
import badgeRugbyWorldCup2019 from '@frontend/static/badges/rugby-world-cup.svg';
import badgeBehindTheLines from '@frontend/static/badges/behind-the-lines.svg';
import badgeEmptyDoorway from '@frontend/static/badges/the-empty-doorway.svg';
import badgeYemenAtWar from '@frontend/static/badges/yemen-at-war.svg';
import badgeThePolluters from '@frontend/static/badges/the-polluters.svg';
import badgeYouthJustice from '@frontend/static/badges/childrenInTheDocks-Icon1.svg';
import badgeGE2019 from '@frontend/static/badges/ge2019-badge.svg';
import badgeLostInPolitics from '@frontend/static/badges/lost-in-politics-badge.svg';

type Props = {
    designType: DesignType;
    CAPI: CAPIType;
    config: ConfigType;
    NAV: NavType;
};

type badgeMapType = Record<string, () => JSX.Element>;
const badgeSvgs: badgeMapType = {
    // 'world/series/the-new-arrivals': badgeNewArrivals,
    'uk-news/series/the-brexit-gamble': badgeEUReferendum,
    'politics/series/road-to-the-vote': badgeEUReferendum,
    'politics/series/brexit-frontline': badgeEUReferendum,
    'politics/series/brexit-divided-generations': badgeEUReferendum,
    'politics/series/brexit-how-it-came-to-this': badgeEUReferendum,
    'uk-news/series/london-versus': badgeLondonVersus,
    'membership/series/beyond-the-blade': badgeBeyondTheBlade,
    'politics/2019-european-parliamentary-elections': badgeEUElection,
    'news/series/paradise-papers': badgeParadisePapers,
    'news/series/cambridge-analytica-files': badgeCAFiles,
    'society/series/nhs-at-70': badgeNHS70,
    'sport/cricket-world-cup-2019': badgeCricketWorldCup2019,
    'football/womens-world-cup-2019': badgeWomensWorldCup2019,
    'environment/series/green-blood': badgeGreenBlood,
    'us-news/us-elections-2020': badgeUSElections2020,
    'australia-news/australian-election-2019': badgeAustralianElections2019,
    'us-news/us-midterm-elections-2018': badgeMidtermElections2018,
    'world/series/the-new-populism': badgeNewPopulism,
    'society/series/the-implant-files': badgeImplantFiles,
    'politics/series/the-real-boris-johnson': badgeRealBoJo,
    'uk-news/series/johnsons-promises': badgeBoJoPromises,
    'sport/rugby-world-cup-2019': badgeRugbyWorldCup2019,
    'uk-news/series/behind-the-lines': badgeBehindTheLines,
    'cities/series/the-empty-doorway': badgeEmptyDoorway,
    'world/series/yemen-at-war': badgeYemenAtWar,
    'environment/series/the-polluters': badgeThePolluters,
    'society/youthjustice': badgeYouthJustice,
    'politics/general-election-2019': badgeGE2019,
    'politics/series/lost-in-politics': badgeLostInPolitics,
};

function getArticleBadge(tags: TagType[]): BadgeType | undefined {
    const tagsWithBadge = Object.keys(badgeSvgs);
    const badgeForTag = tags.find(tag => tagsWithBadge.includes(tag.id));

    if (badgeForTag) {
        const { id } = badgeForTag;
        return {
            linkTo: id,
            svgSrc: badgeSvgs[id],
        };
    }
}

export const DecideLayout = ({ designType, CAPI, config, NAV }: Props) => {
    const badge = getArticleBadge(CAPI.tags);
    // console.log('badge > ', badge);

    if (hasShowcase(CAPI.mainMediaElements)) {
        return (
            <ShowcaseLayout
                CAPI={CAPI}
                config={config}
                NAV={NAV}
                badge={badge}
            />
        );
    }

    // Otherwise, switch based on designType
    const designTypeContent: DesignTypesObj = designTypeDefault(
        <StandardLayout CAPI={CAPI} config={config} NAV={NAV} badge={badge} />,
    );

    return designTypeContent[designType];
};
