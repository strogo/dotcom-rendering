import { _ } from './boot';
import { getRaven as getRaven_ } from '@frontend/web/browser/raven';
import { loadScript as loadScript_ } from '@frontend/web/browser/loadScript';
import {
    init as initGa_,
    sendPageView as sendGaPageView_,
} from '@frontend/web/browser/ga';
import { sendOphanPlatformRecord as sendOphanPlatformRecord_ } from '@frontend/web/browser/ophan';
import { reportError as reportError_ } from '@frontend/web/browser/reportError';

const getRaven: any = getRaven_;
const loadScript: any = loadScript_;
const initGa: any = initGa_;
const sendGaPageView: any = sendGaPageView_;
const sendOphanPlatformRecord: any = sendOphanPlatformRecord_;
const reportError: any = reportError_;

jest.mock('ophan-tracker-js', jest.fn());
jest.mock('@frontend/web/browser/raven', () => ({
    getRaven: jest.fn(),
}));
jest.mock('@frontend/web/browser/loadScript', () => ({
    loadScript: jest.fn(),
}));
jest.mock('@frontend/web/browser/ga', () => ({
    init: jest.fn(),
    sendPageView: jest.fn(),
}));
jest.mock('@frontend/web/browser/ophan', () => ({
    sendOphanPlatformRecord: jest.fn(),
}));

jest.mock('@frontend/web/browser/reportError', () => ({
    reportError: jest.fn(),
}));

describe('boot', () => {
    interface MockWindow extends Window {
        addEventListener: jest.Mock<{}> & typeof window.addEventListener;
        removeEventListener: jest.Mock<{}> & typeof window.removeEventListener;
    }
    interface MockRaven {
        context: jest.Mock<{}>;
        captureException: jest.Mock<{}>;
    }
    const mockWindow = (): MockWindow => {
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
        return window as MockWindow;
    };
    const mockRaven = (): MockRaven => {
        const raven: MockRaven = {
            context: jest.fn((config, callback) => {
                callback();
            }),
            captureException: jest.fn(),
        };

        return raven;
    };
    let windowMock: MockWindow;
    let ravenMock: MockRaven;
    const commercialBundleUrl = 'http://foo.bar';
    const { onPolyfilled, polyfilled, app } = window.guardian;

    beforeEach(() => {
        windowMock = mockWindow();
        ravenMock = mockRaven();

        window.guardian = Object.assign({}, window.guardian, {
            polyfilled: true,
            app: {
                data: {
                    config: {
                        commercialBundleUrl,
                    },
                },
                cssIDs: ['foo', 'bar'],
            },
            config: {},
        });

        getRaven.mockImplementation(() => Promise.resolve(ravenMock));
        loadScript.mockImplementation(() => Promise.resolve());
    });

    afterEach(() => {
        windowMock.addEventListener.mockClear();

        getRaven.mockReset();
        loadScript.mockReset();
        initGa.mockReset();
        sendGaPageView.mockReset();
        sendOphanPlatformRecord.mockReset();

        window.guardian = Object.assign({}, window.guardian, {
            onPolyfilled,
            polyfilled,
            app,
        });
    });

    test('does not call onPollyfilled when window.guardian.polyfilled is false', () => {
        const onPolyfilledMock = jest.fn();

        window.guardian.polyfilled = false;
        window.guardian.onPolyfilled = onPolyfilledMock;

        _.run();

        expect(onPolyfilledMock).not.toBeCalled();
    });

    test('if getRaven successful initAppWithRaven', () => {
        return _.onPolyfilled().then(() => {
            expect(ravenMock.context).toHaveBeenCalledTimes(1);
            expect(ravenMock.context).toHaveBeenCalledWith(
                {
                    tags: {
                        feature: 'initApp',
                    },
                },
                expect.any(Function),
            );
            expect(loadScript).toHaveBeenCalledTimes(1);
            expect(loadScript).toHaveBeenCalledWith(commercialBundleUrl);
            expect(windowMock.addEventListener).toHaveBeenCalledTimes(2);
            expect(windowMock.addEventListener).toHaveBeenCalledWith(
                'error',
                expect.any(Function),
            );
            expect(windowMock.addEventListener).toHaveBeenCalledWith(
                'unhandledrejection',
                expect.any(Function),
            );
        });
    });

    test('if getRaven unsuccessful initApp without Raven', () => {
        getRaven.mockReturnValueOnce(Promise.reject());

        return _.onPolyfilled().then(() => {
            expect(ravenMock.context).not.toHaveBeenCalled();
            expect(loadScript).toHaveBeenCalledTimes(1);
            expect(loadScript).toHaveBeenCalledWith(commercialBundleUrl);
            expect(windowMock.addEventListener).not.toHaveBeenCalled();
        });
    });

    describe('enhances application', () => {
        const container = document.createElement('div');
        container.id = 'app';

        beforeEach(() => {
            process.env.NODE_ENV = 'production';
            document.body.appendChild(container);
        });

        afterEach(() => {
            expect(initGa).toHaveBeenCalledTimes(1);
            expect(sendGaPageView).toHaveBeenCalledTimes(1);
            expect(sendOphanPlatformRecord).toHaveBeenCalledTimes(1);
            document.body.removeChild(container);
        });

        test('if loadCommercial successful enhanceApp', () => {
            return _.onPolyfilled();
        });

        test('if loadCommercial unsuccessful reportError and enhanceApp', () => {
            const errMessage = 'load script fail';
            loadScript.mockReturnValueOnce(Promise.reject(errMessage));

            return _.onPolyfilled().then(() => {
                expect(reportError).toHaveBeenCalledTimes(1);
                expect(reportError).toHaveBeenCalledWith(
                    errMessage,
                    {
                        feature: 'commercial',
                    },
                    false,
                );
            });
        });
    });
});
