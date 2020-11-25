import React from 'react';
import { css } from 'emotion';

import { headline } from '@guardian/src-foundations/typography';
import { until } from '@guardian/src-foundations/mq';

type Props = {
    headlineString: string;
};

const standardFont = css`
    ${headline.small()};
`;

export const ArticleHeadline = ({ headlineString }: Props) => (
    <h1 className={standardFont}>{headlineString}</h1>
);
