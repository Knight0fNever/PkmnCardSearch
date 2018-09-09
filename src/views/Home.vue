<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row headerRow align-items-center">
        <div class="col-md-12 text-center text-white">
          <p class="h3">Pokemon Card Library</p>
          <p class="">Use the filters below to find the desired card.</p>
        </div>
      </div>
    </div>
    <div class="container pt-2">
      <Search></Search>
    </div>
    <div class="container">
      <cards></cards>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue';
import cards from '@/components/Cards.vue';

export default {
  name: 'home',
  components: {
    Search,
    cards
  }
};
</script>
<style>
.headerRow {
  height: 20em;
  background-color: #313131;
}
</style>

