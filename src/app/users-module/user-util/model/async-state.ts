export enum AsyncItemState {
    UNINITIALIZED = 'uninitailized',
    LOADING = 'loading',
    POLLING = 'refreshing',
    LOADED = 'loaded',
    ERROR = 'error'
}

/**
 * Generic type interface
 */

export interface AsyncItem<T> {

    state: AsyncItemState;
    error?: Error;
    cachedAt?: Date;
    isPolling: boolean;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
    data?: T;
}


/**
 * Wrapper function
 */

export function queryState<T>(item: AsyncItem<T>) {
    return {
        isPolling: (item.state === AsyncItemState.POLLING),
        isLoading: (item.state === AsyncItemState.LOADING),
        isLoaded: (item.state === AsyncItemState.LOADED)
    };
}

/**
 * construction function...
 */
export function makeAsyncItem<T>(data: T = null, state = AsyncItemState.LOADING) {
    return { state, data };
}

