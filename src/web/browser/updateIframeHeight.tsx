export const updateIframeHeight = (queryString: string): Promise<void> => {
    const iframes: HTMLIFrameElement[] = [].slice.call(
        document.querySelectorAll(queryString),
    );
    type heightEvent = { source: { name: string } };

    window.addEventListener('message', (event) => {
        const iframe: HTMLIFrameElement | undefined = iframes.find((i) => {
            try {
                return i.name === (event as heightEvent).source.name;
            } catch (e) {
                return false;
            }
        });
        if (iframe) {
            try {
                const message = JSON.parse(event.data);
                switch (message.type) {
                    case 'set-height':
                        iframe.height = message.value;
                        break;
                    default:
                }
                // eslint-disable-next-line no-empty
            } catch (e) {}
        }
    });

    iframes.forEach((iframe) => {
        const src = (iframe.getAttribute('srcdoc') || '')
            .replace(/<gu-script>/g, '<script>')
            // eslint-disable-next-line no-useless-concat
            .replace(/<\/gu-script>/g, '<' + '/script>');
        iframe.setAttribute('srcdoc', src);
    });
    return Promise.resolve();
};
