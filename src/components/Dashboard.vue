<template>
    <div id="dashboard">
        <ul class="collection with-header">
            <li class="collection-header"><h4>Songs</h4>
            </li>

            <li v-for="song in songs" 
            v-bind:key="song.id" 
            class="collection-item">
                <div class="chip">
                {{song.name}} - {{song.composer}}
                </div>
                
                <router-link class="secondary-content" 
                v-bind:to="{name:'view-song', params:{song_id:song.song_id}}">
                <i class="fa fa-eye"></i>
                </router-link>

            </li>

        </ul>

        <div class="fixed-action-btn">
            <router-link to="/new" class="btn-floating btn-large red">
                <i class="fa fa-plus"></i>
            </router-link>
        </div>

    </div>
    
</template>

<script>
import db from './firebaseinit'
export default{
    name:'dashboard',
    data(){
        return{
            songs:[]
        }
    },
    created(){
        db.collection('songs').orderBy('name').get().then(querySnapshot=>{
            querySnapshot.forEach(doc =>{
                const data =  {
                    'id':doc.id,
                    'song_id':doc.data().song_id,
                    'name':doc.data().name,
                    'composer':doc.data().composer,
                }
                this.songs.push(data)
            })
        })

    }
}

</script>


