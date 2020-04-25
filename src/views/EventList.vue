<template>
  <div>
    <h1>Events Listing</h1>
    <EventCard
      v-for="event in events"
      :key="event.id"
      :event="event"
    />
    <template v-if="page !== 1">
      <router-link
        :to="{name: Routes.EventList, query: {page: page - 1}}"
        rel="prev"
      >
        👈 Prev Page
      </router-link>
    </template>
    <template v-if="page !== 1 && hasMoreEventPages">
      |
    </template>
    <template v-if="hasMoreEventPages">
      <router-link
        :to="{name: Routes.EventList, query: {page: page + 1}}"
        rel="next"
      >
        Next Page 👉
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Routes from '@/routes';
import { Actions, Getters, Stored } from '@/store';
import EventCard from '@/components/EventCard.vue';

export default {
  data() {
    return {
      perPage: 3,
      Routes,
    };
  },
  components: {
    EventCard,
  },
  created() {
    this.$store.dispatch(Actions.fetchEvents, { perPage: this.perPage, page: this.page });
  },
  computed: {
    page() {
      return +this.$route.query.page || 1;
    },
    hasMoreEventPages() {
      return this.$store.getters[Getters.hasMoreEventPages](this.perPage, this.page);
    },
    ...mapState([Stored.events]),
  },
};
</script>

// TODO: Start at 6:11 in part 2
