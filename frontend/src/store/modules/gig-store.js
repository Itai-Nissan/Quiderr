import { gigService } from '../../services/gig.service.js'

export const gigStore = {
  strict: true,
  state: {
    gig: null,
    gigs: null,
    filterBy: null,
    sortBy: null,
  },
  getters: {
    gigsToShow(state) {
      return state.gigs
    },
    filterToShow(state) {
      return state.filterBy.txt
    },
  },
  mutations: {
    setGigs(state, { gigs }) {
      state.gigs = gigs
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },
    sortBy(state, { sortBy }) {
      state.sortBy = sortBy
    },
    saveGig(state, { gig }) {
      state.gig = gig
    },
  },
  actions: {
    async loadGigs(context, filter) {
      try {
        let filterBy = filter ? filter : context.state.filterBy
        // let filterBy = context.state.filterBy ? context.state.filterBy : ''
        const gigs = await gigService.query(filterBy)
        context.commit({ type: 'setGigs', gigs: gigs })
        return gigs
      } catch (err) {
        console.log(err)
      }
    },
    // async onSetGigFilterBy(context, { filter }) {
    //   try {
    //     context.commit({ type: 'setFilterBy', filterBy: filter })
    //     // dispatch({ type: 'loadGames' })

    //     // context.dispatch('loadGigs')

    //     // return filter
    //   } catch (err) {
    //     console.log(err)
    //   }
    // },
    async loadUserGigs(context, { userId }) {
      try {
        const gigs = await gigService.query({ userId })
        context.commit({ type: 'setGigs', gigs: gigs })
        return gigs
      } catch (err) {
        console.log(err)
      }
    },
    getGigById(context, { gigId }) {
      try {
        return gigService.getGigById(gigId)
      } catch (err) {
        console.log(err)
      }
    },
    ////////////////////////////////////////////////////////////
    updateGig(context, { gig }) {
      try {
        return gigService.saveGig(gig)
      } catch (err) {
        console.log(err)
      }
      ////////////////////////////////////////////////////////////
    },
  },
  modules: {
    gigService,
  },
}
