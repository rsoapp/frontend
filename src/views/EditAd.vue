<template>
    <div class="createAd">
        <hr>
        <div v-if="message" class="container alert alert-info infoDiv">
           {{ message }}
        </div>
        <h2>Urejanje oglasa</h2>
        <br>
        <b-form v-if="this.ad" @submit.prevent class="adForm container border rounded bg-light">
            <b-form-group label="Naslov:">
                <b-form-input v-model="ad.title" placeholder="Vpišite ime oglasa" required id="title"></b-form-input>
            </b-form-group>
            <b-form-group label="Cena:" class="priceField">
                <b-form-input v-model="ad.price" type="number" placeholder="Vpišite ceno v evrih" required id="price"></b-form-input>
            </b-form-group>
            <b-form-group label="Opis:">
                <b-form-textarea v-model="ad.desc" placeholder="Podroben opis oglasa" required id="desc"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Kategorija:">
                <b-form-select v-model="ad.category" :options="categories" required id="category"></b-form-select>
            </b-form-group>
            <b-form-group label="Stanje:">
                <b-form-select v-model="ad.cond" :options="conditions" required id="cond"></b-form-select>
            </b-form-group>
            <b-form-group label="Slike:">
                <b-form-file @change="onFileSelected" id="images" multiple placeholder="Izberi slike..." drop-placeholder="Drop file here..."></b-form-file>
            </b-form-group>
            <b-button @click="submitEditedAd" type="submit" variant="info" class="alert-info">Shrani</b-button>
        </b-form>
    </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: "createAd",
    data() {
        return {
            categories: ['Brenkala', 'Tolkala', 'Godala', 'Pihala', 'Inštrumenti s tipkami', 'Trobila', 'Drugo'],
            conditions: ['Novo', 'Rabljeno'],
            message: "",
            title: null,
            price: null,
            desc: null,
            category: null,
            cond: null,
            images: null,
            ad: null
        }
    },
    mounted: function() {
        axios.get('http://localhost:8080/v1/ads/' + this.$route.params.id)
        .then((response) => {
            this.ad = response.data;
        }).catch(e => {
            console.log('Error', e)
        })
    },
    methods: {
        submitEditedAd() {
            let formData = new FormData()
            let url = "http://localhost:8080/v1/ads/" + this.ad.id
            
            if (this.images != null) {
                for (var i = 0; i < this.images.length; i++) {
                    formData.append("images", this.images[i], this.images[i].name)
                }
            }
            else {
                formData.append("images", null)
            }

            formData.append('title', this.ad.title)
            formData.append('price', this.ad.price)
            formData.append('description', this.ad.desc)
            formData.append('cond', this.ad.cond)
            formData.append('category', this.ad.category)

            fetch(url, {
                method: 'PUT',
                headers: {
                    'token': this.$store.state.loggedUserId
                },
                body: formData
            }).then(res => {
                this.message = "Oglas uspešno posodobljen!"
            }).catch(err => {
                console.log(err)
                this.message = "Napaka. Prosimo poskusite znova."
            })
        },
        onFileSelected(event) {
            this.images = event.target.files
        }
    }
}
</script>

<style scoped>
.adForm {
    width: 50%;
    padding: 30px;
}

.infoDiv {
    width: 400px;
}
</style>