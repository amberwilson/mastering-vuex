import EventService from '@/services/EventService';
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

const Mutations = {
  ADD_EVENT: 'ADD_EVENT',
  SET_EVENTS: 'SET_EVENTS',
};

export const Actions = {
  addEvent: 'addEvent',
  hydrateStore: 'hydrateStore',
};

export default new Vuex.Store({
  state: {
    user: { id: 'ab123', name: 'Adam Jahr' },
    events: [],
    categories: ['sustainability', 'nature', 'animal welfare', 'housing', 'education', 'food', 'community'],
  },
  mutations: {
    [Mutations.ADD_EVENT](state, payload) {
      state.events.push(payload);
    },
    [Mutations.SET_EVENTS](state, payload) {
      state.events = payload;
    },
  },
  actions: {
    [Actions.addEvent]({ commit }, event) {
      return EventService.postEvent(event)
        .then((response) => {
          if (response.status === 201) {
            commit(Mutations.ADD_EVENT, event);
          } else {
            console.error('Could not save event', event);
          }
        });
    },
    [Actions.hydrateStore]({ commit }) {
      EventService.getEvents()
        .then((response) => {
          if (response.status === 200) {
            commit(Mutations.SET_EVENTS, response.data);
            return;
          }

          console.error('Unable to retrieve events.');
        })
        .catch((error) => {
          console.error('There was an error:', error.response);
        });
    },
  },
});
