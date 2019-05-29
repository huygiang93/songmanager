<template>
    <div id="view-song">
        <ul class="collection with-h">
            <li class="collection-header"><h4>{{name}}</h4></li>
            <li class="collection-item">Song ID:{{song_id}}</li>
            <li class="collection-item">Composer: {{composer}}</li>

        </ul>
        <router-link to="/" class="btn grey">Back</router-link>
        <button @click="deleteSong" class="btn red">Delete</button>

        <div class="fixed-action-btn">
            <router-link v-bind:to="{
                name: 'edit-song',
                params:{song_id:song_id}}"
                class="btn-floating btn-large red">
                <i class="fa fa-pencil"></i>
            </router-link>
        </div>

    </div>
    
</template>


<script>
import db from './firebaseinit'
export default{
    name:'view-song',
    data(){
        return{
            song_id:null,
            name:null,
            composer:null,
            
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
            deleteSong(){
                if(confirm('Are you sure?')){
                    db.collection('songs').where('song_id','==',this.$route.params.song_id).get().then(querySnapshot=>{
                    querySnapshot.forEach(doc=>{
                        doc.ref.delete()
                        this.$router.push('/')
                    })
                })
                }
            }
        }

}

</script>