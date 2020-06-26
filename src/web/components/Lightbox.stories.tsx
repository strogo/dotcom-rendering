import React from 'react';
import { Section } from '@frontend/web/components/Section';

import { Lightbox, Image } from '@frontend/web/components/Lightbox';

export default {
    component: Lightbox,
    title: 'Components/Lightbox',
};

/**

 */

const images: Image[] = [
    {
        src:
            'https://i.guim.co.uk/img/media/620d30e1471c2340280f025d7c413f2e5d304315/0_0_5597_3731/master/5597.jpg?width=1920&quality=85&auto=format&fit=max&s=26c5e1772bcb1d2833aea22760249dd2',
    },
    {
        src:
            'https://i.guim.co.uk/img/media/89a9bad0081fa3dbe86b320ac74862e99eb27afe/0_0_5472_3648/master/5472.jpg?width=1920&quality=85&auto=format&fit=max&s=e6bc781a113ec02e717ffb7a6ce25138',
    },
    {
        src:
            'https://i.guim.co.uk/img/media/5aacf5d8a1dc0be52bc69ae57c15d114d316930d/0_0_4722_3148/master/4722.jpg?width=1920&quality=85&auto=format&fit=max&s=7ffd79356de68c0196902d02d99e8157',
    },
    {
        src:
            'https://i.guim.co.uk/img/media/2c2cfc9c3f2d34cec93e8cb92b688293677be0d1/0_0_3500_2329/master/3500.jpg?width=1920&quality=85&auto=format&fit=max&s=3783c3ca6d30b39980e910f7b3136e6a',
    },
];

export const Article = () => (
    <Section showTopBorder={false} showSideBorders={false}>
        <Lightbox images={images} />
    </Section>
);
Article.story = { name: 'Article' };
