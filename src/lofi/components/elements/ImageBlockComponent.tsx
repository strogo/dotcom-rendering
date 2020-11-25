import React from 'react';
import { css } from 'emotion';

type Props = {
    element: ImageBlockElement;

    title?: string;
};

export const ImageBlockComponent = ({
    element,

    title,
}: Props) => {
    // The src here is almost certainly incorrect
    return <img alt={title} src={element.imageSources[0].srcSet[0].src} />;
};
