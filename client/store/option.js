/**
 * @desc Option store module
 * @author Jooger <zzy1198258955@163.com>
 * @date 21 Sep 2017
 */

import Service from '~/service'

const FETCH_OPTION_REQUEST = 'FETCH_OPTION_REQUEST'
const FETCH_OPTION_SUCCESS = 'FETCH_OPTION_SUCCESS'
const FETCH_OPTION_FAILURE = 'FETCH_OPTION_FAILURE'

export const state = () => ({
  fetching: false,
  data: null
})

export const getters = {
  option: state => state.data || {}
}

export const mutations = {
  [FETCH_OPTION_REQUEST]: state => (state.fetching = true),
  [FETCH_OPTION_FAILURE]: state => (state.fetching = false),
  [FETCH_OPTION_SUCCESS]: (state, data) => {
    state.fetching = false
    state.data = data
  }
}

export const actions = {
  async fetchData ({ state, commit }) {
    if (state.fetching) {
      return
    }
    commit(FETCH_OPTION_REQUEST)
    const { success, data } = await Service.option.fetchData().catch(err => commit(FETCH_OPTION_FAILURE, err))
    if (success) {
      commit(FETCH_OPTION_SUCCESS, data)
    } else {
      commit(FETCH_OPTION_FAILURE)
    }
    return success
  }
}
