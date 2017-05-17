<template>
  <div>
    <h2>Posts: {{ posts.length }} posts</h2>

    <md-layout md-gutter>

      <md-layout md-flex="50">

        <md-list class="md-double-line">
          <md-list-item v-for="post in posts" :key="post.id">
            <span>{{ post.title }}</span>
            <span>{{ post.categorie }}</span>
            <md-button class="md-icon-button md-list-action">
              <md-icon @click.native="remove(post)" class="md-primary">delete_forever</md-icon>
            </md-button>
          </md-list-item>
        </md-list>


      </md-layout>

      <md-layout :md-gutter="60">

        <form novalidate @submit.stop.prevent="save" style="width: 80%">

<md-input-container>
  <label>Un long et joli titre</label>
  <md-input v-model="newPost.title" placeholder="Un titre"></md-input>
</md-input-container>

<md-input-container>
  <label>Une catégorie associée</label>
  <md-select v-model="newPost.categorie" name="movie" id="movie">
    <md-option value="sport">Sport</md-option>
    <md-option value="insolite">Insolite</md-option>
    <md-option value="politique">Politique</md-option>
    <md-option value="finance">Finance</md-option>
  </md-select>
</md-input-container>

<md-checkbox id="my-test1" v-model="newPost.visible" name="my-test1">Visble ?</md-checkbox>

<md-input-container>
  <label>Note</label>
  <md-input v-model="newPost.note"></md-input>
</md-input-container>

<md-button @click.native="save" class="md-raised md-primary">
  <md-icon>add</md-icon> Ajouter cet article</md-button>
</form>

</md-layout>
</md-layout>


</div>
</template>

<script>
  export default {
    name: 'list',
    data() {
      return {
        newPost: {
          title: "",
          note: 3,
          visible: true,
          categorie: ""
        },
        posts: []
      }
    },
    created() {
      this.$http.get('http://localhost:3000/').then(response => {
        this.posts = response.body
      });
    },
    methods: {
      save() {
        this.$http.post(`http://localhost:3000/save`, this.newPost).then(response => {
          if (response.body) {
            this.posts.push(response.body);
            this.newPost = {
              title: "",
              note: 3,
              visible: true,
              categorie: ""
            };
          }
        });
      },
      remove(post) {
        this.$http.delete(`http://localhost:3000/delete/${post.id}`).then(response => {
          if (response.body == 'ok') {
            this.posts.splice(this.posts.indexOf(post), 1);
          }
        });
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    display: inline-block;
    margin: 0 10px;
  }
  
  a {
    color: #42b983;
  }
</style>