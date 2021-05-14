export const HAS_LOADED = 'HAS_LOADED';
export const SET_SELECTED_AR_PROJECT = "SET_SELECTED_AR_PROJECT"

export const hasLoaded = () => {
    return {
        type: HAS_LOADED
    }
}

export const setSelectedArProject = (selected_ar_project) => {
    return {
        type: SET_SELECTED_AR_PROJECT,
        selected_ar_project: selected_ar_project
    }
}
