import { joinUrl } from '@root/src/lofi/lib/joinUrl';
import { callApi } from '@root/src/lofi/lib/api';

export const getBrazeUuid = async (ajaxUrl: string): Promise<string> => {
    const url = joinUrl([ajaxUrl, 'user/me']);
    return callApi(url, {
        credentials: 'include',
    })
        .then((json) => json.user.privateFields.brazeUuid)
        .catch((error) => {
            window.guardian.modules.sentry.reportError(error, 'getBrazeUuid');
        });
};
