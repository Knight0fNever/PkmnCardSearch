import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    search: {},
    cards: [],
    types: [],
    selectedCard: {}
  },
  mutations: {
    setTypes: (state, types) => {
      state.types = types;
    },
    setCards: (state, cards) => {
      state.cards = cards;
    },
    setSelectedCard: (state, card) => {
      state.selectedCard = card;
    },
    setSearch: (state, search) => {
      state.search = search;
    }
  },
  actions: {
    loadTypes: ({ commit, state }) => {
      return new Promise((resolve, reject) => {
        fetch('https://api.pokemontcg.io/v1/types')
          .then(response => {
            return response.json();
          })
          .then(data => {
            resolve(data.types);
          });
      });
    },
    loadCards: ({ commit, dispatch }, paramArray) => {
      // console.log('cards: ', paramArray.cards);
      // console.log('search: ', paramArray.search);
      // console.log('page: ', paramArray.page);
      let uri = `https://api.pokemontcg.io/v1/cards?name=${paramArray.search.name}&nationalPokedexNumber=${
        paramArray.search.number
      }&types=${paramArray.search.type}&hp=${paramArray.search.hp}&number=${paramArray.search.setNumber}&weaknesses=${
        paramArray.search.weakness
      }&resistances=${paramArray.search.resistance}&abilityName=${paramArray.search.ability}&attackDamage=${
        paramArray.search.attackDamage
      }&page=${paramArray.page}`;
      fetch(uri)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const cardsLocal = paramArray.cards.concat(data.cards);
          // console.log(cardsLocal);
          let paramArrayLocal = {
            cards: cardsLocal,
            search: paramArray.search,
            page: paramArray.page + 1,
            resolve: paramArray.resolve,
            reject: paramArray.reject
          };
          if (data.cards.length >= 100) {
            dispatch('loadCards', paramArrayLocal);
          } else {
            paramArray.resolve(cardsLocal);
          }
        })
        .catch(error => {
          console.log(error);
          paramArray.reject('ERROR');
        });
    }
  }
});
