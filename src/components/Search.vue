<template>
  <div id="search" class="row">
    <div class="col-12">
      
      <div class="form-group">
        <label for="name">Pokemon Name:</label>
        <input type="text" name="name" id="name" class="form-control" ref="name" :value="$store.state.search.name">

        <div class="row" v-show="showAdvanced">
          <div class="col">
            <div id="advanced">
            <!-- Pokemon # -->
            <label for="pokedexNumber">National Pokedex Number:</label>
            <input type="number" name="pokedexNumber" id="pokedexNumber" class="form-control" ref="idNumber" :value="$store.state.search.number">
            <!-- Types -->
            <label for="types">Types: </label>
            <select name="types" id="types" class="form-control" ref="types">
              <option value="">-</option>
              <option :value="type" v-for="type in $store.state.types" v-bind:key="type">{{type}}</option>
            </select>
            <!-- HP -->
            <label for="hp">HP (Increments of 10): </label>
            <input type="number" name="hp" id="hp" class="form-control" ref="hp" :value="parseInt($store.state.search.hp)">
            <!-- Set # -->
            <label for="setNumber">Number in Set:</label>
            <input type="number" name="setNumber" id="setNumber" class="form-control" ref="setNumber" :value="$store.state.search.setNumber">
            <!-- Attack Damage -->
            <label for="attackDamage">Attack Damage: </label>
            <input type="number" name="attackDamage" id="attackDamage" class="form-control" ref="attackDamage" :value="$store.state.search.attackDamage">
            <!-- Weaknesses -->
            <label for="weakness">Weaknesses: </label>
            <select name="weakness" id="weakness" class="form-control" ref="weakness">
              <option value="">-</option>
              <option :value="type" v-for="type in $store.state.types" v-bind:key="type">{{type}}</option>
            </select>
            <!-- Resistance -->
            <label for="resistances">Resistances: </label>
            <select name="resistances" id="resistances" class="form-control" ref="resistance">
              <option value="">-</option>
              <option :value="type" v-for="type in $store.state.types" v-bind:key="type">{{type}}</option>
            </select>
            <!-- Ability -->
            <label for="abilityName">Ability Name: </label>
            <input type="text" name="abilityName" id="abilityName" class="form-control" ref="ability" :value="$store.state.search.ability">
          </div>
        </div>
      </div>
      </div>
    <div id="advancedBtn" class="text-center pt-3 pb-3">
          <button class="btn btn-primary" @click="toggleAdvanced()">Advanced Search</button>
        </div>
    <button class="btn btn-primary" @click="loadCards(); showAdvanced = false;">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      showAdvanced: false
    };
  },
  mounted: function() {
    this.loadTypes();
  },
  methods: {
    loadTypes: function() {
      this.$store.dispatch('loadTypes').then(data => {
        this.$store.commit('setTypes', data);
      });
    },
    loadCards: function() {
      let search = {
        name: this.$refs.name.value,
        number: this.$refs.idNumber.value,
        type: this.$refs.types.value,
        hp: this.$refs.hp.value,
        setNumber: this.$refs.setNumber.value,
        attackDamage: this.$refs.attackDamage.value,
        weakness: this.$refs.weakness.value,
        resistance: this.$refs.resistance.value,
        ability: this.$refs.ability.value
      };
      this.$store.commit('setSearch', search);
      new Promise((resolve, reject) => {
        // console.log(search);
        let paramArray = {
          cards: [],
          search: search,
          page: 1,
          resolve: resolve,
          reject: reject
        };
        this.$store.dispatch('loadCards', paramArray);
      }).then(data => {
        console.log('final:', data);
        this.$store.commit('setCards', data);
      });
    },
    toggleAdvanced: function() {
      this.showAdvanced = !this.showAdvanced;
    }
  }
};
</script>

<style>
</style>


