import React from 'react';
import { css } from 'emotion';
import { ImageComponent } from './ImageComponent';

type Props = {
    element: ImageBlockElement;

    title?: string;
};

export const ImageBlockComponent = ({
    element,

    title,
}: Props) => {
    // The src here is almost certainly incorrect
    return <ImageComponent element={element} />;
};
