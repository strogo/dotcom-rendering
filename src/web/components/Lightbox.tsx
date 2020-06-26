import React, { useLayoutEffect, useState, useRef } from 'react';
import { css } from 'emotion';

const wrapper = css`
    display: flex;
    width: 100vw;
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    /* Remove scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const imageContainer = css`
    width: 100vw;
    display: block;
    display: inline-block;
    scroll-snap-align: start;
`;

const imageCss = css`
    width: 100vw;
`;

export interface Image {
    src: string;
}

type Props = {
    images: Image[];
};

export const Lightbox = ({ images }: Props) => {
    // const imageCount = images.length;
    const numItems = images.length + 1;
    const [itemPosition, setItemPosition] = useState(1);
    const [prevScrollLeft, setPrevScrollLeft] = useState(0);
    const [scrollDirection, setScrollDirection] = useState('left');
    const scroller = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (scroller && scroller.current !== null) {
            scroller.current.scrollTo({
                left: Math.floor(
                    scroller.current.scrollWidth * (itemPosition / numItems),
                ),
                behavior: 'smooth',
            });
        }
    }, [itemPosition, numItems]);

    const updateItemPos = () => {
        console.log(itemPosition);
        if (scrollDirection === 'left') {
            if (itemPosition > 1) {
                setItemPosition(itemPosition - 1);
            }
        } else if (scrollDirection === 'right') {
            if (itemPosition < numItems) {
                setItemPosition(itemPosition + 1);
            }
        }
    };

    const scrollEvent = (e: React.UIEvent<HTMLDivElement>) => {
        const currentScrollLeft = e.currentTarget.scrollLeft;
        // eslint-disable-next-line no-console
        if (currentScrollLeft < prevScrollLeft) {
            setScrollDirection('left');
        } else {
            setScrollDirection('right');
        }
        // eslint-disable-next-line no-console
        console.log(scrollDirection);
        updateItemPos();
        setPrevScrollLeft(currentScrollLeft);
    };

    return (
        <>
            <div className={wrapper} ref={scroller} onScroll={scrollEvent}>
                {images.map((img, i) => {
                    return (
                        <div key={i} className={imageContainer}>
                            <img
                                className={imageCss}
                                alt="test alt"
                                src={img.src}
                            />
                        </div>
                    );
                })}
            </div>
            <button onClick={updateItemPos}>Next {itemPosition}</button>
            <p>
                {itemPosition} / {numItems}
            </p>
        </>
    );
};
