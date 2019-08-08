import { TextBlockComponent } from '@frontend/web/components/elements/TextBlockComponent';
import { ImageBlockComponent } from '@frontend/web/components/elements/ImageBlockComponent';
import { TweetBlockComponent } from '@frontend/web/components/elements/TweetBlockComponent';
import React from 'react';
// import { clean } from '@frontend/model/clean';
export const ArticleRenderer: React.FC<{
    elements: CAPIElement[];
    pillar: Pillar;
}> = ({ elements, pillar }) => {
    // const cleanedElements = elements.map(element =>
    //     'html' in element ? { ...element, html: clean(element.html) } : element,
    // );
    // ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
    //    But should be soon.

    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.dotcomrendering.pageElements.TextBlockElement':
                    return <TextBlockComponent key={i} html={element.html} />;
                case 'model.dotcomrendering.pageElements.ImageBlockElement':
                    return (
                        <ImageBlockComponent
                            key={i}
                            element={element}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.TweetBlockElement':
                    return (
                        <TweetBlockComponent
                            key={i}
                            element={element}
                            pillar={pillar}
                        />
                    );
                default:
                    return null;
            }
        })
        .filter(_ => _ != null);
    return <>{output}</>;
};
