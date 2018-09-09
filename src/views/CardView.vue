<template>
  <div class="container pt-4">
    <div class="card">
      <div class="row">
        <div class="col-4">
          <img :src="$store.state.selectedCard.imageUrlHiRes" :alt="$store.state.selectedCard.name" class="card-img-top p-2">
        </div>
        <div class="col-8">
          <div class="card-block pt-2">
            <h4 class="card-title">{{$store.state.selectedCard.name}}</h4>
            <p class="card-text"><strong>Pokedex Number:</strong> {{$store.state.selectedCard.nationalPokedexNumber}}</p>
            <p class="card-text"><strong>HP:</strong> {{$store.state.selectedCard.hp}}</p>
            <p class="card-text"><strong>Retreat Cost:</strong> {{$store.state.selectedCard.retreatCost.length}}</p>
            <p class="card-text"><strong>Rarity:</strong> {{$store.state.selectedCard.rarity}}</p>
            <p class="card-text"><strong>Set:</strong> {{$store.state.selectedCard.set}}</p>
            <p class="card-text"><strong>Set Number:</strong> {{$store.state.selectedCard.number}}</p>
            <p class="card-text">
              <strong>Type: </strong> <span v-for="type in $store.state.selectedCard.types" v-bind:key="type">{{type}}</span>
            </p>
            <p class="card-text">
              <strong>Weakness: </strong> <span v-for="weakness in $store.state.selectedCard.weaknesses" v-bind:key="weakness.type">{{weakness.type}} {{weakness.value}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cardview',
  components: {}
};
</script>

<style>
</style>


