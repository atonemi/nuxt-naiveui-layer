import { createDiscreteApi, type LoadingBarApi } from 'naive-ui';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:mounted', () => {
        const { message, loadingBar } = createDiscreteApi(['message', 'loadingBar'], {
            loadingBarProviderProps: {
                loadingBarStyle: {
                    loading: {
                        background: '#2172f1',
                        height: '4px',
                    },
                    error: {
                        background: '#D60E11FF',
                        height: '4px',
                    },
                },
            },
        });
        nuxtApp.provide('message', message);

        nuxtApp.provide('loadingBar', loadingBar);
    });

    nuxtApp.hook('page:loading:start', () => {
        (nuxtApp.$loadingBar as LoadingBarApi)?.start();
    });

    nuxtApp.hook('page:loading:end', () => {
        setTimeout(() => (nuxtApp.$loadingBar as LoadingBarApi)?.finish(), 150);
    });

    nuxtApp.hook('app:error', () => {
        if (import.meta.client) {
            setTimeout(() => (nuxtApp.$loadingBar as LoadingBarApi)?.error(), 150);
        }
    });
});
