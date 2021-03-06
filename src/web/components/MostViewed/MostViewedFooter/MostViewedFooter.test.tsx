import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {
    responseWithTwoTabs,
    responseWithOneTab,
} from '@root/fixtures/mostViewed';
import { useApi as useApi_ } from '@root/src/web/lib/api';
import { MostViewedFooterData } from './MostViewedFooterData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useApi: any = useApi_;

jest.mock('../../../lib/api', () => ({
    useApi: jest.fn(),
}));

const VISIBLE = 'display: grid';
const HIDDEN = 'display: none';

describe('MostViewedFooterData', () => {
    beforeEach(() => {
        useApi.mockReset();
    });

    it('should call the api and render the response as expected', async () => {
        useApi.mockReturnValue({ data: responseWithTwoTabs });

        const { getByText, getAllByText, getByTestId } = render(
            <MostViewedFooterData
                sectionName="Section Name"
                pillar="news"
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
            />,
        );

        // Calls api once only
        expect(useApi).toHaveBeenCalledTimes(1);

        // Renders all 20 items
        expect(getAllByText(/LINKTEXT/).length).toBe(20);

        // First tab defaults to visible
        expect(getByTestId(responseWithTwoTabs.tabs[0].heading)).toHaveStyle(
            VISIBLE,
        );

        // Prefixes live articles correctly
        expect(getAllByText(/Live/).length).toBe(3);

        // Renders appropriate number of age warnins
        expect(getAllByText(/This article is more than/).length).toBe(3);

        // Handles &nbsp char
        expect(getByText('Across The Guardian')).toBeInTheDocument();
    });

    it('should change the items shown when the associated tab is clicked', async () => {
        useApi.mockReturnValue({ data: responseWithTwoTabs });

        const { getByTestId, getByText } = render(
            <MostViewedFooterData
                sectionName="Section Name"
                pillar="news"
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
            />,
        );

        const firstHeading = responseWithTwoTabs.tabs[0].heading;
        const secondHeading = responseWithTwoTabs.tabs[1].heading;

        expect(getByTestId(firstHeading)).toHaveStyle(VISIBLE);
        expect(getByTestId(secondHeading)).toHaveStyle(HIDDEN);

        fireEvent.click(getByText(secondHeading));

        expect(getByTestId(firstHeading)).toHaveStyle(HIDDEN);
        expect(getByTestId(secondHeading)).toHaveStyle(VISIBLE);

        // Hardcode this text here because the actual raw data contains $nbsp; which is removed during rendering
        fireEvent.click(getByText('Across The Guardian'));

        expect(getByTestId(firstHeading)).toHaveStyle(VISIBLE);
        expect(getByTestId(secondHeading)).toHaveStyle(HIDDEN);
    });

    it('should not show the tab menu when there is only one group of tabs', async () => {
        useApi.mockReturnValue({ data: responseWithOneTab });

        const { queryByText } = render(
            <MostViewedFooterData
                sectionName="Section Name"
                pillar="news"
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
            />,
        );

        expect(
            queryByText(responseWithOneTab.tabs[0].heading),
        ).not.toBeInTheDocument();
    });

    it("should display the text 'Live' for live blogs", () => {
        useApi.mockReturnValue({
            data: [
                {
                    heading: 'Section header',
                    trails: [
                        {
                            url: '',
                            headline: 'Headline',
                            showByline: false,
                            byline: '',
                            image: '',
                            isLiveBlog: true,
                            pillar: 'news',
                        },
                    ],
                },
            ],
        });

        const { getByText } = render(
            <MostViewedFooterData
                sectionName="Section Name"
                pillar="news"
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
            />,
        );

        expect(getByText('Live')).toBeInTheDocument();
    });

    it("should NOT display the text 'Live' when isLiveBlog is false", () => {
        useApi.mockReturnValue({
            data: [
                {
                    heading: 'Section header',
                    trails: [
                        {
                            url: '',
                            headline: 'Headline',
                            showByline: false,
                            byline: '',
                            image: '',
                            isLiveBlog: false,
                            pillar: 'news',
                        },
                    ],
                },
            ],
        });

        const { queryByText } = render(
            <MostViewedFooterData
                sectionName="Section Name"
                pillar="news"
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
            />,
        );

        expect(queryByText('Live')).not.toBeInTheDocument();
    });

    it('should render the Ophan data link names as expected', async () => {
        useApi.mockReturnValue({ data: responseWithTwoTabs });

        const { asFragment } = render(
            <MostViewedFooterData
                sectionName="Section Name"
                pillar="news"
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
            />,
        );

        // Renders tab data link name
        expect(
            asFragment().querySelectorAll('[data-link-name="in Music"]').length,
        ).toBe(1); // Should add the data-link-name for Section Name tab

        // Renders Trail data-link-names
        expect(
            asFragment().querySelectorAll('[data-link-name*="| text"]').length,
        ).toBe(20); // Total stories in Related Footer (*= selector contains) (both tabs)

        expect(
            asFragment().querySelectorAll('[data-link-name="1 | text"]').length,
        ).toBe(2); // 1 indexed so should start at 1, one for each tab

        expect(
            asFragment().querySelectorAll('[data-link-name="0 | text"]').length,
        ).toBe(0); // 1 indexed so should start at 1

        // most commented
        expect(
            asFragment().querySelectorAll(
                '[data-link-name="comment | group-0 | card-@1"]',
            ).length,
        ).toBe(1);

        // most shared
        expect(
            asFragment().querySelectorAll(
                '[data-link-name="news | group-0 | card-@1"]',
            ).length,
        ).toBe(1);
    });
});
