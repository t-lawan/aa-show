export const EnvironmentFilter = {
    CONTEXT: 'CONTEXT',
    ANNOTATIONS: 'ANNOTATIONS',
    DATA: 'DATA',
    FUTURE_STORIES: 'FUTURE_STORIES',
    NOW_STORIES: 'NOW_STORIES',
}

export const PageURls = {
    BEDFORD_SQUARE: {
        id: 'BEDFORD_SQUARE',
        url: '/bedford-square',
    },
    AR_AT_HOME: {
        id: 'AR_AT_HOME',
        url: '/ar-at-home',
    },
    GEOLOCATION_TEST: {
        id: 'GEOLOCATION_TEST',
        url: '/location',
    },
    HOME: {
        id: 'HOME',
        url: '/',
    }
}


export const IsPage = (page_id, pathname) => {
    let response = false;
    switch(page_id) {
        case PageURls.BEDFORD_SQUARE.id:
            response = (pathname === PageURls.BEDFORD_SQUARE.url)
            break;
        case PageURls.AR_AT_HOME.id:
            response = (pathname === PageURls.AR_AT_HOME.url)
            break;     
        case PageURls.HOME.id:
            response = (pathname === PageURls.HOME.url)
            break;  
        case PageURls.GEOLOCATION_TEST.id:
            response = (pathname === PageURls.GEOLOCATION_TEST.url)
            break;  
    }
    return response;
}