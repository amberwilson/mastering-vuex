import EventService from '@/services/EventService';
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const Mutations = {
  ADD_EVENT: 'ADD_EVENT',
  SET_EVENT: 'SET_EVENT',
  SET_EVENTS: 'SET_EVENTS',
  SET_EVENTS_TOTAL: 'SET_EVENTS_TOTAL',
};

export const Actions = {
  addEvent: 'addEvent',
  fetchEvent: 'fetchEvent',
  fetchEvents: 'fetchEvents',
};

export const Stored = {
  user: 'user',
  event: 'event',
  events: 'events',
  eventsTotal: 'eventsTotal',
  categories: 'categories',
};

export const Getters = {
  getEventById: 'getEventById',
  hasMoreEventPages: 'hasMoreEventPages',
};

export default new Vuex.Store({
  state: {
    [Stored.user]: { id: 'ab123', name: 'Adam Jahr' },
    [Stored.event]: {},
    [Stored.events]: [],
    [Stored.eventsTotal]: 0,
    [Stored.categories]: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
  mutations: {
    [Mutations.ADD_EVENT](state, payload) {
      state.events.push(payload);
    },
    [Mutations.SET_EVENT](state, payload) {
      state.event = payload;
    },
    [Mutations.SET_EVENTS](state, payload) {
      state.events = payload;
    },
    [Mutations.SET_EVENTS_TOTAL](state, payload) {
      state.eventsTotal = payload;
    },
  },
  actions: {
    [Actions.addEvent]({ commit }, event) {
      return EventService.postEvent(event).then((response) => {
        if (response.status === 201) {
          commit(Mutations.ADD_EVENT, event);
        } else {
          console.error('Could not save event', event);
        }
      });
    },
    [Actions.fetchEvent]({ commit }, { id }) {
      const event = this.getters.getEventById(id);
      if (event) {
        commit(Mutations.SET_EVENT, event);
        return;
      }
      EventService.getEvent(id)
        .then((response) => {
          if (response.status === 200) {
            commit(Mutations.SET_EVENT, response.data);

            return;
          }

          console.error('Unable to retrieve event.');
        })
        .catch((error) => {
          console.error('There was an error:', error.response);
        });
    },
    [Actions.fetchEvents]({ commit }, { perPage, page }) {
      EventService.getEvents(perPage, page)
        .then((response) => {
          if (response.status === 200) {
            commit(Mutations.SET_EVENTS, response.data);
            commit(
              Mutations.SET_EVENTS_TOTAL,
              response.headers['x-total-count'],
            );
            return;
          }

          console.error('Unable to retrieve events.');
        })
        .catch((error) => {
          console.error('There was an error:', error.response);
        });
    },
  },
  getters: {
    [Getters.getEventById]:
      (state) => (id) => state[Stored.events].find((event) => event.id === id),
    [Getters.hasMoreEventPages]: (state) => (perPage, currentPage) => {
      const currentPageMaxRecord = perPage * currentPage;

      return currentPageMaxRecord < state[Stored.eventsTotal];
    },
  },
});
