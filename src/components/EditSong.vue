<template>
    <div id="edit-song">
        <h3>Edit Song</h3>
        <div class="row">
            <form @submit.prevent="updateSong" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input disabled type="text" v-model="song_id" required>        
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <form @submit.prevent="saveSong" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="name" required>
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <form @submit.prevent="saveSong" class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" v-model="composer" required>
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
    name:'edit-song',
    data(){
        return{
            song_id:null,
            name:null,
            composer:null
        }
    },
    beforeRouteEnter(to, from, next){
        db.collection('songs').where('song_id', '==', to.params.song_id).get().then(querySnapshot=>{
            querySnapshot.forEach(doc=>{
                next(vm=>{
                    vm.song_id = doc.data().song_id
                    vm.name = doc.data().name
                    vm.composer = doc.data().composer
                })
            })
        })
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData(){
            db.collection('songs').where('song_id','==',this.$route.params.song_id).get().then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    this.song_id=doc.data().song_id
                    this.name=doc.data().name
                    this.composer=doc.data().composer
                })
            })
        },
        updateSong(){
            db.collection('songs').where('song_id','==',this.$route.params.song_id).get().then(querySnapshot=>{
                querySnapshot.forEach(doc=>{
                    doc.ref.update({
                        song_id:this.song_id,
                        name:this.name,
                        composer:this.composer
                    }).then(() => {
                        this.$router.push({name:'view-song', 
                        params:{song_id:this.song_id}})
                    })
                })
            })
        }
    }
}

</script>