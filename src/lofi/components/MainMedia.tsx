import React from 'react';
import { css, cx } from 'emotion';

import { until } from '@guardian/src-foundations/mq';

import { LofiTextAlternative } from '@root/src/lofi/components/LofiTextAlternative';

const mainMedia = css`
    min-height: 1px;
    /*
    Thank you IE11, broken in stasis for all eternity.

    https://github.com/philipwalton/flexbugs/issues/75#issuecomment-161800607
    */

    ${until.tablet} {
        margin: 0;
        order: -1;
    }

    img {
        flex: 0 0 auto; /* IE */
        width: 100%;
        height: 100%;
    }
`;

function renderElement(element: CAPIElement) {
    switch (element._type) {
        case 'model.dotcomrendering.pageElements.ImageBlockElement':
            return (
                <LofiTextAlternative
                    altText={element.data.alt}
                    elementTypeShownToUser="Main article image"
                />
            );

        // <ImageComponent
        //     display={display}
        //     designType={designType}
        //     key={i}
        //     element={element}
        //     pillar={pillar}
        //     hideCaption={hideCaption}
        //     isMainMedia={true}
        //     role={element.role}
        //     starRating={starRating}
        // />
        case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
            return (
                <LofiTextAlternative
                    altText={element.mediaTitle}
                    elementTypeShownToUser="Main article video"
                />
            );

        default:
            return null;
    }
}

export const MainMedia: React.FC<{
    elements: CAPIElement[];
    pillar: Pillar;
    hideCaption?: boolean;
    adTargeting?: AdTargeting;
    starRating?: number;
}> = ({ elements }) => (
    <div className={cx(mainMedia)}>
        {elements.map((element) => renderElement(element))}
    </div>
);
