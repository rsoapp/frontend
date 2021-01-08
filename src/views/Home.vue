<template>
  <div class="home">
    <div class="searchBar">
      <b-nav-form>
        <b-form-input v-model="searchField" aria-label="Input" class="mr-1" placeholder="Išči po oglasniku"></b-form-input>
        <b-button @click="searchAds(searchField)">Išči</b-button>
      </b-nav-form>
    </div>
    <hr>
    <div v-if="message" class="container alert alert-info infoDiv">
      {{ message }}
    </div>
    <router-link
        :to="`/ads/${ad.id}`"
        tag="div"
        class="ad container alert alert-info btn-link"
        role="alert"
        v-for="ad in ads" :key="ad.id">
      <p class="lead">{{ ad.title }}</p>
      <hr>
      Cena: {{ ad.price }}€<br>
      Opis: {{ ad.description }}
    </router-link>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      ads: [],
      message: ""
    }
  },
  methods: {
    searchAds(searchKeyword) {
      axios.post('http://localhost:8080/v1/ads/search?keyword=' + searchKeyword)
      .then((response) => {
        this.ads = response.data
        if(this.ads.length == 0) {
          this.message = "Ni oglasov z ujemajočo besedo"
        }
        else {
          this.message = ""
        }
      }).catch(e => {
        console.log('Error', e)
      })
    }
  }
}
</script>

<style scoped>
.btn-link:hover {
    opacity: 0.8;
    cursor: pointer;
    text-decoration: none;
}

.ad {
    max-width: 60%;
}

.searchBar {
  display: inline-block;
  float: none;
  vertical-align: top;
}

.infoDiv {
    width: 400px;
}
</style>