import React from 'react';
import { css } from 'emotion';
import { textSans } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { SubMetaLinksList } from '@root/src/lofi/components/SubMetaLinksList';
import { Badge } from '@root/src/lofi/components/Badge';
import { until } from '@guardian/src-foundations/mq';

const subMetaLabel = css`
    ${textSans.xsmall()};
    display: block;
    color: ${neutral[60]};
`;

const badgeWrapper = css`
    float: right;
    margin-top: 6px;
`;

const bottomPadding = css`
    padding-bottom: 72px;
    ${until.desktop} {
        padding-bottom: 58px;
    }
`;

type Props = {
    pillar: Pillar;
    subMetaSectionLinks: SimpleLinkType[];
    subMetaKeywordLinks: SimpleLinkType[];
};

export const SubMeta = ({
    pillar,
    subMetaKeywordLinks,
    subMetaSectionLinks,
}: Props) => {
    const hasSubMetaSectionLinks = subMetaSectionLinks.length > 0;
    const hasSubMetaKeywordLinks = subMetaKeywordLinks.length > 0;
    return (
        <div className={bottomPadding}>
            {(hasSubMetaSectionLinks || hasSubMetaKeywordLinks) && (
                <span className={subMetaLabel}>Topics</span>
            )}
            {hasSubMetaSectionLinks && (
                <SubMetaLinksList
                    links={subMetaSectionLinks}
                    isSectionLinkList={true}
                    pillar={pillar}
                />
            )}
            {hasSubMetaKeywordLinks && (
                <SubMetaLinksList
                    links={subMetaKeywordLinks}
                    isSectionLinkList={false}
                    pillar={pillar}
                />
            )}
        </div>
    );
};
