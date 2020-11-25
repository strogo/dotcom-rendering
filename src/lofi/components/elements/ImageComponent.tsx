import React from 'react';
import { css } from 'emotion';
import { Caption } from '@root/src/lofi/components/Caption';
import { LofiTextAlternative } from '@root/src/lofi/components/LofiTextAlternative';

type Props = {
    element: ImageBlockElement;
};

export const ImageComponent = ({ element }: Props) => (
    <>
        <LofiTextAlternative
            altText={element.data.alt}
            elementTypeShownToUser="Image"
        >
            <Caption
                captionText={element.data.caption || ''}
                credit={element.data.credit}
                displayCredit={element.displayCredit}
            />
        </LofiTextAlternative>
    </>
);
