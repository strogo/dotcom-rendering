import React from 'react';
import { LofiTextAlternative } from '@root/src/lofi/components/LofiTextAlternative';
import { BlockquoteBlockComponent } from '@root/src/lofi/components/elements/BlockquoteBlockComponent';
import { CaptionBlockComponent } from '@root/src/lofi/components/elements/CaptionBlockComponent';
import { CommentBlockComponent } from '@root/src/lofi/components/elements/CommentBlockComponent';
import { DisclaimerBlockComponent } from '@root/src/lofi/components/elements/DisclaimerBlockComponent';
import { DividerBlockComponent } from '@root/src/lofi/components/elements/DividerBlockComponent';
import { EmbedBlockComponent } from '@root/src/lofi/components/elements/EmbedBlockComponent';
import { UnsafeEmbedBlockComponent } from '@root/src/lofi/components/elements/UnsafeEmbedBlockComponent';
import { HighlightBlockComponent } from '@root/src/lofi/components/elements/HighlightBlockComponent';
import { ImageBlockComponent } from '@root/src/lofi/components/elements/ImageBlockComponent';
import { InstagramBlockComponent } from '@root/src/lofi/components/elements/InstagramBlockComponent';
import { MapEmbedBlockComponent } from '@root/src/lofi/components/elements/MapEmbedBlockComponent';
import { MultiImageBlockComponent } from '@root/src/lofi/components/elements/MultiImageBlockComponent';
import { PullQuoteBlockComponent } from '@root/src/lofi/components/elements/PullQuoteBlockComponent';
import { SubheadingBlockComponent } from '@root/src/lofi/components/elements/SubheadingBlockComponent';
import { TableBlockComponent } from '@root/src/lofi/components/elements/TableBlockComponent';
import { TextBlockComponent } from '@root/src/lofi/components/elements/TextBlockComponent';

import {
    ExplainerAtom,
    InteractiveAtom,
    QandaAtom,
    GuideAtom,
    ProfileAtom,
    TimelineAtom,
} from '@guardian/atoms-rendering';
import { Display } from '@root/src/lib/display';

import { GuVideoBlockComponent } from '@root/src/lofi/components/elements/GuVideoBlockComponent';

import { RichLink } from '../components/RichLink';

export const ArticleRenderer: React.FC<{
    elements: CAPIElement[];
    pillar: Pillar;
    designType: DesignType;
    host?: string;
}> = ({ elements, pillar, designType }) => {
    // const cleanedElements = elements.map(element =>
    //     'html' in element ? { ...element, html: clean(element.html) } : element,
    // );
    // ^^ Until we decide where to do the "isomorphism split" in this this code is not safe here.
    //    But should be soon.

    const output = elements
        .map((element, i) => {
            switch (element._type) {
                case 'model.dotcomrendering.pageElements.AudioAtomBlockElement':
                    return (
                        <LofiTextAlternative
                            altText={element.title}
                            elementTypeShownToUser="Audio"
                        />
                    );
                case 'model.dotcomrendering.pageElements.BlockquoteBlockElement':
                    return (
                        <BlockquoteBlockComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.CaptionBlockElement':
                    return (
                        <CaptionBlockComponent
                            key={i}
                            display={Display.Standard}
                            designType={designType}
                            pillar={pillar}
                            captionText={element.captionText}
                            padCaption={element.padCaption}
                            credit={element.credit}
                            displayCredit={element.displayCredit}
                            shouldLimitWidth={element.shouldLimitWidth}
                            isOverlayed={element.isOverlayed}
                        />
                    );
                case 'model.dotcomrendering.pageElements.CommentBlockElement':
                    return (
                        <CommentBlockComponent
                            body={element.body}
                            avatarURL={element.avatarURL}
                            profileURL={element.profileURL}
                            profileName={element.profileName}
                            dateTime={element.dateTime}
                            permalink={element.permalink}
                        />
                    );
                case 'model.dotcomrendering.pageElements.DisclaimerBlockElement':
                    return (
                        <DisclaimerBlockComponent
                            html={element.html}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.DividerBlockElement':
                    return <DividerBlockComponent />;
                case 'model.dotcomrendering.pageElements.CalloutBlockElement':
                    return null;
                case 'model.dotcomrendering.pageElements.ChartAtomBlockElement':
                    return (
                        <LofiTextAlternative elementTypeShownToUser="Chart" />
                    );
                case 'model.dotcomrendering.pageElements.DocumentBlockElement':
                    return (
                        <LofiTextAlternative
                            altText={element.title}
                            elementTypeShownToUser="Document"
                        />
                    );
                case 'model.dotcomrendering.pageElements.EmbedBlockElement':
                    if (!element.safe) {
                        return (
                            <UnsafeEmbedBlockComponent
                                key={i}
                                html={element.html}
                                alt={element.alt || ''}
                                index={i}
                            />
                        );
                    }
                    return (
                        <EmbedBlockComponent
                            key={i}
                            html={element.html}
                            alt={element.alt}
                        />
                    );
                case 'model.dotcomrendering.pageElements.ExplainerAtomBlockElement':
                    return (
                        <ExplainerAtom
                            key={i}
                            id={element.id}
                            title={element.title}
                            html={element.body}
                        />
                    );
                case 'model.dotcomrendering.pageElements.GuideAtomBlockElement':
                    return (
                        <div id={`guide-atom-${i}`}>
                            <GuideAtom
                                id={element.id}
                                title={element.title}
                                html={element.html}
                                image={element.img}
                                credit={element.credit}
                                pillar={pillar}
                                likeHandler={() => {}}
                                dislikeHandler={() => {}}
                                expandCallback={() => {}}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.GuVideoBlockElement':
                    return (
                        <GuVideoBlockComponent
                            html={element.html}
                            pillar={pillar}
                            designType={designType}
                            display={Display.Standard}
                            credit={element.source}
                            caption={element.caption}
                        />
                    );
                case 'model.dotcomrendering.pageElements.HighlightBlockElement':
                    return (
                        <HighlightBlockComponent key={i} html={element.html} />
                    );
                case 'model.dotcomrendering.pageElements.ImageBlockElement':
                    return (
                        <ImageBlockComponent
                            display={Display.Standard}
                            designType={designType}
                            key={i}
                            element={element}
                            pillar={pillar}
                            title={element.title}
                        />
                    );
                case 'model.dotcomrendering.pageElements.InstagramBlockElement':
                    return (
                        <InstagramBlockComponent key={i} element={element} />
                    );
                case 'model.dotcomrendering.pageElements.InteractiveAtomBlockElement':
                    return (
                        <InteractiveAtom
                            id={element.id}
                            html={element.html}
                            js={element.js}
                            css={element.css}
                        />
                    );
                case 'model.dotcomrendering.pageElements.MapBlockElement':
                    return (
                        <MapEmbedBlockComponent
                            pillar={pillar}
                            embedUrl={element.embedUrl}
                            height={element.height}
                            width={element.width}
                            caption={element.caption}
                            credit={element.source}
                            title={element.title}
                            display={Display.Standard}
                            designType={designType}
                        />
                    );
                case 'model.dotcomrendering.pageElements.MultiImageBlockElement':
                    return (
                        <MultiImageBlockComponent
                            designType={designType}
                            key={i}
                            images={element.images}
                            caption={element.caption}
                            pillar={pillar}
                        />
                    );
                case 'model.dotcomrendering.pageElements.ProfileAtomBlockElement':
                    return (
                        <div id={`profile-atom-${i}`}>
                            <ProfileAtom
                                id={element.id}
                                title={element.title}
                                html={element.html}
                                image={element.img}
                                credit={element.credit}
                                pillar={pillar}
                                likeHandler={() => {}}
                                dislikeHandler={() => {}}
                                expandCallback={() => {}}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.PullquoteBlockElement':
                    return (
                        <PullQuoteBlockComponent
                            key={i}
                            html={element.html}
                            pillar={pillar}
                            designType={designType}
                            attribution={element.attribution}
                            role={element.role}
                        />
                    );
                case 'model.dotcomrendering.pageElements.QABlockElement':
                    return (
                        <div id={`qanda-atom-${i}`}>
                            <QandaAtom
                                id={element.id}
                                title={element.title}
                                html={element.html}
                                image={element.img}
                                credit={element.credit}
                                pillar={pillar}
                                likeHandler={() => {}}
                                dislikeHandler={() => {}}
                                expandCallback={() => {}}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.RichLinkBlockElement':
                    return (
                        <RichLink
                            headlineText={element.text}
                            url={element.url}
                        />
                    );
                case 'model.dotcomrendering.pageElements.SoundcloudBlockElement':
                    return (
                        <LofiTextAlternative elementTypeShownToUser="Soundcloud" />
                    );
                case 'model.dotcomrendering.pageElements.SpotifyBlockElement':
                    return (
                        <LofiTextAlternative
                            altText={element.title}
                            elementTypeShownToUser="Spotify"
                        />
                    );
                case 'model.dotcomrendering.pageElements.SubheadingBlockElement':
                    return (
                        <SubheadingBlockComponent key={i} html={element.html} />
                    );
                case 'model.dotcomrendering.pageElements.TableBlockElement':
                    return <TableBlockComponent element={element} />;
                case 'model.dotcomrendering.pageElements.TextBlockElement':
                    return (
                        <>
                            <TextBlockComponent
                                key={i}
                                isFirstParagraph={i === 0}
                                html={element.html}
                                pillar={pillar}
                                display={Display.Standard}
                                designType={designType}
                                forceDropCap={element.dropCap}
                            />
                        </>
                    );
                case 'model.dotcomrendering.pageElements.TweetBlockElement':
                    return (
                        <LofiTextAlternative elementTypeShownToUser="Tweet" />
                    );
                case 'model.dotcomrendering.pageElements.VideoFacebookBlockElement':
                    return (
                        <LofiTextAlternative
                            altText={element.caption}
                            elementTypeShownToUser="Facebook Video"
                        />
                    );
                case 'model.dotcomrendering.pageElements.VideoVimeoBlockElement':
                case 'model.dotcomrendering.pageElements.VideoYoutubeBlockElement':
                    return (
                        <LofiTextAlternative
                            altText={element.title}
                            elementTypeShownToUser="Video"
                        />
                    );
                case 'model.dotcomrendering.pageElements.YoutubeBlockElement':
                    return (
                        <LofiTextAlternative
                            altText={element.mediaTitle}
                            elementTypeShownToUser="Video"
                        />
                    );
                case 'model.dotcomrendering.pageElements.TimelineBlockElement':
                    return (
                        <div id={`timeline-atom-${i}`}>
                            <TimelineAtom
                                id={element.id}
                                title={element.title}
                                pillar={pillar}
                                events={element.events}
                                likeHandler={() => {}}
                                dislikeHandler={() => {}}
                                expandCallback={() => {}}
                            />
                        </div>
                    );
                case 'model.dotcomrendering.pageElements.MediaAtomBlockElement':
                    return (
                        <LofiTextAlternative elementTypeShownToUser="Video" />
                    );
                case 'model.dotcomrendering.pageElements.AudioBlockElement':
                case 'model.dotcomrendering.pageElements.CodeBlockElement':
                case 'model.dotcomrendering.pageElements.ContentAtomBlockElement':
                case 'model.dotcomrendering.pageElements.GenericAtomBlockElement':
                case 'model.dotcomrendering.pageElements.VideoBlockElement':
                    return null;
            }
        })
        .filter((_) => _ != null);

    return <div>{output}</div>;
};
