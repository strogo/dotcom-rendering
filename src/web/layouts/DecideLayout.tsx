import React from 'react';
import { designTypeDefault } from '@root/src/lib/designTypes';

import { StandardLayout } from './StandardLayout';
import { ShowcaseLayout } from './ShowcaseLayout';

import { hasShowcase } from './layoutHelpers';

type Props = {
    designType: DesignType;
    CAPI: CAPIType;
    config: ConfigType;
    NAV: NavType;
};

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
