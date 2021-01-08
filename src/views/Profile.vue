<template>
    <div>
        <hr>
        <div v-if="message != ''" class="container alert alert-info infoDiv">
           {{ message }}
        </div>
        <div class="ad container-lg alert bg-light">
            Elektronska pošta: {{ userData.email }}
            <br>
            Naslov: {{ userData.address }}€
            <br>
            Tel. št.: {{ userData.phoneNumber }}
        </div>

        <h2 v-if="userAds && userAds.length == 0">Nimate objavljenih oglasov</h2>
        <h2 v-if="userAds && userAds.length > 0">Vaši oglasi:</h2>
        <hr v-if="userAds && userAds.length > 0">

        <div class="ad container-lg alert bg-light" v-for="ad in userAds" :key="ad.id">
            <router-link :to="`/ads/${ad.id}`" tag="p" class="lead adlink">{{ ad.title }}</router-link>
            <hr>
            Cena: {{ ad.price }}€
            <br>
            Opis: {{ ad.description }}
            <br>
            <b-form-group style="text-align: center">
                <b-button @click="deleteAd(ad.id)" class="btn-sm changeButton" variant="danger">Izbriši</b-button>
                <router-link :to="`/editAd/${ad.id}`" tag="b-button" class="btn-sm changeButton" variant="info">Uredi</router-link>
            </b-form-group>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'profile',
  data() {
    return {
      userData: null,
      userAds: null,
      message: ''
    }
  },
  methods: {
      deleteAd(adId) {
          axios.delete('http://localhost:8080/v1/ads/' + adId)
          .then((response) => {
            location.reload()
          }).catch(e => {
            this.message = "Pri brisanju vašega oglasa je prišlo do napake."
          })
      }
  },
  mounted: function() {
    axios.get('http://localhost:8080/v1/user/profile/' + this.$store.state.loggedUserId)
    .then((response) => {
      this.userData = response.data.userData
      this.userAds = response.data.userAds.userAds
    }).catch(e => {
      this.message = "Pri pridobivanju vašega profila je prišlo do napake."
      console.log('Error', e)
    })
  }
}
</script>

<style scoped>
.infoDiv {
    width: 500px;
}

.adlink:hover {
    opacity: 0.8;
    cursor: pointer;
    text-decoration: none;
}

.changeButton {
    margin: 5px;
}
</style>