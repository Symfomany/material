<template>
  <v-row>


    <v-col xs6>

      <v-list three-line>
        <template>
          <v-subheader v-if="posts.length" v-text="posts.length" />
          <v-list-item v-for="post in posts" :key="post.id">
            <v-list-tile-content>
              <v-list-tile-title v-html="post.title" />
              <v-list-tile-sub-title v-html="post.description" />
            </v-list-tile-content>
          </v-list-item>
        </template>
        <!--<v-list-item v-for="post in posts" :key="post.id">-->
      </v-list>
    </v-col>

    <v-col xs6>
      <v-card class="grey lighten-4 elevation-0">
        <v-card-text>
          <v-container fluid>
            <v-row row>
              <v-col xs4>
                <v-subheader>Titre de la catégorie</v-subheader>
              </v-col>
              <v-col xs8>
                <v-text-field name="input-3" label="Courte(5 mots)" v-model="newPost.title"></v-text-field>
              </v-col>
            </v-row>

            <v-row row>
              <v-col xs4>
                <v-subheader>Description de la catégorie</v-subheader>
              </v-col>
              <v-col xs8>
                <v-text-field name="input-7-1" label="Blablabla..." v-model="newPost.description" multi-line></v-text-field>
              </v-col>
            </v-row>

            <v-row row>
              <v-btn primary default class="btn--light-flat">Ajouter cette Article</v-btn>
            </v-row>


            <v-row row>
              <v-col xs4>
                <v-subheader>Note sur 5</v-subheader>
              </v-col>
              <v-col xs8>
                <v-card class="grey lighten-4 elevation-0">
                  <v-card-text>
                    <v-slider v-model="newPost.note" light />
                  </v-card-text>
                </v-card>

              </v-col>
            </v-row>

          </v-container>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <!--<md-list class="md-double-line">
            <md-list-item v-for="post in posts" :key="post.id">

              <div class="md-list-text-container">
                <md-icon class="md-primary">bookmark_border</md-icon>
                <h3 class="title">{{ post.title|truncate }} - <i>{{ post.categorie }}</i></h3>
                <p>{{ post.description|truncate }}</p>
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon @click.native="remove(post)" class="md-primary">delete_forever</md-icon>
              </md-button>

              <md-divider class="md-inset"></md-divider>

            </md-list-item>
          </md-list>-->


  <!--</md-layout>-->



  <!--<md-layout :md-gutter="60">

        <form novalidate @submit.stop.prevent="save" style="width: 80%">

          <md-input-container>
            <md-icon>edit</md-icon>
            <label>Un long et joli titre</label>
            <md-input v-model="newPost.title" placeholder="Un titre"></md-input>
          </md-input-container>

          <md-input-container>
            <md-icon>edit</md-icon>
            <label>Une petite description</label>
            <md-textarea v-model="newPost.description"></md-textarea>
          </md-input-container>

          <md-input-container>
            <md-icon>view_list</md-icon>
            <label>Une catégorie associée</label>
            <md-select v-model="newPost.categorie" name="movie" id="movie">
              <md-option value="sport">Catégorie Sport</md-option>
              <md-option value="insolite">Catégorie Insolite</md-option>
              <md-option value="politique">Catégorie Politique</md-option>
              <md-option value="finance">Catégorie Finance</md-option>
            </md-select>
          </md-input-container>

          <md-checkbox id="my-test1" v-model="newPost.visible" name="my-test1">
            <label for="">Est t-il visible sur le site ?</label></md-checkbox>

          <range-slider class="slider" min="1" max="5" step="1" v-model="newPost.note">
          </range-slider>-->
  <!--<md-input type="number" v-model="newPost.note"></md-input>-->

  <!--<md-button @click.native="save" class="md-raised md-primary">
            <md-icon>add</md-icon> Ajouter cet article</md-button>
        </form>

      </md-layout>
    </md-layout>-->

</template>

<script>
import RangeSlider from 'vue-range-slider'
import 'vue-range-slider/dist/vue-range-slider.css'


  export default {
    name: 'list',
    components: {
      RangeSlider
    },
    data() {
      return {
        newPost: {
          title: "",
          note: 3,
          visible: true,
          categorie: "",
          description: ""
        },
        posts: []
      }
    },
    created() {
      this.$http.get('http://localhost:3000/').then(response => {
        this.posts = response.body
      });
    },
    filters: {
      truncate(text){
        return text.split(" ").splice(0,10).join(" ") + "...";
      }
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
  .slider {
    /* overwrite slider styles */
    /*width: 200px;*/
  }
</style>