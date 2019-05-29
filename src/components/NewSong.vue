<template>
    <div id="new-song">
        <h3>New Song</h3>
        <div class="row">
            <form @submit.prevent="saveSong" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="song_id" required>
                        <label>Enter song ID...</label>
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <form @submit.prevent="saveSong" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                        <label>Enter song name...</label>
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <form @submit.prevent="saveSong" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="composer" required>
                        <label>Enter composer name...</label>
                    </div>
                </div>
                <button type="submit" class="btn">Submit</button>
                <router-link to="/" class="btn grey">Cancel</router-link>
            </form>
        </div>
    </div>
    
</template>


<script>
import db from './firebaseinit'
export default{
    name:'new-song',
    data(){
        return{
            song_id:null,
            name:null,
            composer:null
        }
    },
    methods:{
        saveSong(){
            db.collection('songs').add({
                song_id:this.song_id,
                name:this.name,
                composer:this.composer
            }).then(docRef => this.$router.push('/')).catch(error=>console.log(err))
        }
    }
}

</script>