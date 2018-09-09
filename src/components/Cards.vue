<template>
  <div>
    <div class="row pt-3">
      <div class="col-12">
        <span v-for="card in $store.state.cards" v-bind:key="card.id" v-bind:card="card">
          <router-link to="/card"><img @click="selectCard(card)" :src="card.imageUrl" :alt="card.name" class="img-fluid p-2"></router-link>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cards',
  methods: {
    selectCard: function(card) {
      this.$store.commit('setSelectedCard', card);
    }
  }
};
</script>

<style>
</style>


