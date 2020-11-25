import React from 'react';
import { css, cx } from 'emotion';
import { until } from '@guardian/src-foundations/mq';

const articleContainer = css`
    ${until.leftCol} {
        /* below 1140 */
        padding-left: 0;
    }

    flex-grow: 1;

    /* Due to MainMedia using position: relative, this seems to effect the rendering order
    To mitigate we use z-index
    TODO: find a cleaner solution */
    z-index: 1;
`;

type Props = {
    children: JSXElements;
};

export const ArticleContainer = ({ children }: Props) => {
    return <main className={cx(articleContainer)}>{children}</main>;
};
