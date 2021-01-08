<template>
    <div class="createAd">
        <hr>
        <div v-if="message" class="container alert alert-info infoDiv">
           {{ message }}
        </div>
        <b-form @submit.prevent class="adForm container border rounded bg-light">
            <b-form-group label="Naslov:">
                <b-form-input v-model="title" placeholder="Vpišite ime oglasa" required id="title"></b-form-input>
            </b-form-group>
            <b-form-group label="Cena:" class="priceField">
                <b-form-input v-model="price" type="number" placeholder="Vpišite ceno v evrih" required id="price"></b-form-input>
            </b-form-group>
            <b-form-group label="Opis:">
                <b-form-textarea v-model="desc" placeholder="Podroben opis oglasa" required id="desc"></b-form-textarea>
            </b-form-group>
            <b-form-group label="Kategorija:">
                <b-form-select v-model="category" :options="categories" required id="category"></b-form-select>
            </b-form-group>
            <b-form-group label="Stanje:">
                <b-form-select v-model="cond" :options="conditions" required id="cond"></b-form-select>
            </b-form-group>
            <b-form-group label="Slike:">
                <b-form-file @change="onFileSelected" id="images" multiple placeholder="Izberi slike..." drop-placeholder="Drop file here..."></b-form-file>
            </b-form-group>
            <b-button @click="submitAd" type="submit" variant="info" class="alert-info">Ustvari oglas</b-button>
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
            images: null
        }
    },
    methods: {
        submitAd() {
            let formData = new FormData()
            let url = "http://localhost:8080/v1/ads/user/" + String(this.$store.state.loggedUserId)
            
            if (this.images != null) {
                for (var i = 0; i < this.images.length; i++) {
                    formData.append("images", this.images[i], this.images[i].name)
                }
            }
            else {
                formData.append("images", null)
            }

            formData.append('title', this.title)
            formData.append('price', this.price)
            formData.append('description', this.desc)
            formData.append('cond', this.cond)
            formData.append('category', this.category)

            fetch(url, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'token': this.$store.state.loggedUserId
                },
                body: formData
            }).then(res => {
                this.message = "Oglas uspešno objavljen!"
            }).catch(err => {
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