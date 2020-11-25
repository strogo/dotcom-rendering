import React from 'react';
import { css, cx } from 'emotion';
import { between, until } from '@guardian/src-foundations/mq';
import { Contributor } from '@root/src/lofi/components/Contributor';

import { Dateline } from './Dateline';

type Props = {
    pillar: Pillar;
    author: AuthorType;
    tags: TagType[];
    primaryDateline: string;
    secondaryDateline: string;
};

const meta = css`
    ${between.tablet.and.leftCol} {
        order: 1;
    }

    ${until.phablet} {
        padding-left: 10px;
        padding-right: 10px;
    }
    padding-top: 2px;
`;

const metaContainer = css`
    ${until.phablet} {
        margin-left: -20px;
        margin-right: -20px;
    }
    ${until.mobileLandscape} {
        margin-left: -10px;
        margin-right: -10px;
    }
`;

export const ArticleMeta = ({
    pillar,
    author,
    tags,
    primaryDateline,
    secondaryDateline,
}: Props) => {
    return (
        <div className={metaContainer}>
            <div className={cx(meta)}>
                <div>
                    <Contributor author={author} tags={tags} pillar={pillar} />

                    <Dateline
                        primaryDateline={primaryDateline}
                        secondaryDateline={secondaryDateline}
                    />
                </div>
            </div>
        </div>
    );
};
