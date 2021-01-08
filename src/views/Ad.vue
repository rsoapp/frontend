<template>
    <div>
        <hr>
        <div v-if="messageSent && message != ''" class="container alert alert-info infoDiv">
           {{ message }}
        </div>
        <div class="ad container-lg alert bg-light">
            <h4>{{ ad.title }}</h4>
            <hr>
            Cena: {{ ad.price }}€
            <br>
            {{ ad. description }}
        </div>
        <div v-if="imagesLoaded && images.length != 0" class="ad container-lg alert bg-light">
            <div v-for="image in images" :key="image.id" class="image">
              <img class="adImage" :src="imageBytes(image)"/>
            </div>
        </div>
        <div class="ad container alert bg-light">
            <h6>Kontaktni podatki</h6>
            <hr>
            Telefonska številka: {{ ad.phoneNumber }} <br>
            Email: {{ ad.email }} <br>
            Naslov: {{ ad.location }}
            <div>
                <b-nav-form class="sendEmailButton">
                    <b-button v-b-modal.modal-1 v-if="ad.email != null" class="btn-sm alert alert-info " variant="info">Pošlji sporočilo</b-button>
                </b-nav-form>

                <b-modal id="modal-1" hide-footer title="Pošlji sporočilo" ref="message-modal">
                  <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group>
                      <b-form-textarea required v-model="userMessage"></b-form-textarea>
                    </b-form-group>
                    <b-form-group style="text-align: center">
                      <b-button @click="sendSms" class="btn-sm alert alert-info" variant="info">Pošlji</b-button>
                    </b-form-group>
                  </form>
                </b-modal>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ad',
  data() {
    return {
      ad: null,
      images: null,
      imagesLoaded: false,
      userMessage: null,
      messageSent: false,
      message: null
    }
  },
  methods: {
    imageBytes(image) {
      return 'data:image/jpeg;base64, ' + image.imageBytes
    },
    sendSms() {
      let formData = new FormData()
      let url = "http://localhost:8080/v1/sms/send"

      formData.append('fromId', this.$store.state.loggedUserId)
      formData.append('toId', this.ad.userId)
      formData.append('message', this.userMessage)

      fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'token': this.$store.state.loggedUserId
        },
        body: formData,
        redirect: 'follow'
      }).then(res => {
          this.message = "Sporočilo je bilo uspešno poslano!"
      }).catch(err => {
          this.message = "Prišlo je do napake."
      })

      this.hideModal()
      this.messageSent = true
      this.userMessage = ""
    },
    hideModal() {
      this.$refs['message-modal'].hide()
    }
  },
  mounted: function() {
    axios.get('http://localhost:8080/v1/ads/' + this.$route.params.id)
    .then((response) => {
      this.ad = response.data;
      this.images = this.ad.adImagesDto.images;
      this.imagesLoaded = true
    }).catch(e => {
      console.log('Error', e)
    })
  }
}
</script>

<style scoped>
.sendEmailButton {
  display: inline-block;
  float: none;
  vertical-align: top;
  text-align: center;
  margin-top: 10px;
}

.adImage {
  max-width: 350px !important;
  height: auto;
}

.image {
  margin: 5px;
}

.infoDiv {
    width: 500px;
}
</style>