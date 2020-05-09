import * as types from './types'

export default {
    [types.TOKEN]({commit}, data) {
        commit(types.TOKEN, data)
    },
    [types.loadingPage]({commit},bl) {
        commit(types.loadingPage, bl)
    },
    [types.oneClickImportSelectedDevices]: ({commit}, arr) => {
        commit(types.oneClickImportSelectedDevices, arr)
    }
}


