<template>
  <div>
    <h2>Posts</h2>
    <p>{{ posts.length }} posts</p>
    <md-list class="md-dense">
      <md-list-item v-for="post in posts" :key="post.id">
        <md-icon>move_to_inbox</md-icon> <span>{{ post.title }}</span>
      </md-list-item>
    </md-list>
  </div>
</template>

<script>
export default {
  name: 'hello',
  created(){
      this.$http.get('http://localhost:3000/').then(response => {
        this.posts =  response.body
      });
  },
  data () {
    return {
      posts: []
    }
  }
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