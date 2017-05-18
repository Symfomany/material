<template>
  <v-row>
    <v-snackbar :top="true" :right="true" v-model="snackbar">
      Votre article a bien été ajouté
      <v-btn flat class="pink--text" @click.native="snackbar = false">Fermer</v-btn>
    </v-snackbar>

    <v-col xs12 md6>
      <v-card>
        <v-toolbar class="cyan">
          <v-toolbar-title>
            <v-toolbar-side-icon class="grey--text text--darken-4" /> Gestion des Articles de Presse</v-toolbar-title>

          <v-btn @click.native="changeVisibility" icon="icon" slot="activator" dark>
            <v-icon v-html="iconVisible"></v-icon>
          </v-btn>


          <v-menu bottom right>
            <v-btn icon="icon" slot="activator" dark>
              <v-icon>more_vert</v-icon>

            </v-btn>
            <v-list>
              <v-list-item>
                <v-list-tile @click.native="changeVisibles">
                  <v-list-tile-title>Activer la selection</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
              <v-list-item>
                <v-list-tile>
                  <v-list-tile-title>Supprimer la selection</v-list-tile-title>
                </v-list-tile>
              </v-list-item>
            </v-list>
          </v-menu>


        </v-toolbar>
        <v-progress-linear v-if="posts.length == 0" v-bind:indeterminate="true"></v-progress-linear>

        <v-list three-line>
          <v-subheader v-text="posts.length + ' articles visibles'" />
          <template v-for="item in posts">
            <v-list-item :key="item.id">
              <v-list-tile>

                <v-list-tile-action v-if="item.visible === false">
                  <v-checkbox v-model="visibles" :value="item.id" />
                </v-list-tile-action>

                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title" />
                  <v-list-tile-sub-title v-html="item.description" />
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn @click.native="remove(item)" icon ripple>
                    <v-icon class="pink--text text--lighten-1">delete</v-icon>
                  </v-btn>
                </v-list-tile-action>

              </v-list-tile>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-col>

    <v-col xs12 md6>

      <v-card>
        <v-card-row class="purple">
          <v-card-title>
            <span class="white--text">Création d'article</span>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-card-row>


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
            <v-col xs4>
              <v-subheader>Date de publication</v-subheader>
            </v-col>
            <v-col xs8>
              <v-dialog v-model="newPost.datePublication" persistent lazy>
                <v-text-field slot="activator" label="Choisir une date" prepend-icon="event"></v-text-field>
                <v-date-picker v-model="newPost.datePicker" scrollable></v-date-picker>
              </v-dialog>
            </v-col>
          </v-row>

          <v-row row>
            <v-col xs4>
              <v-subheader v-text="'Standard'" />
            </v-col>
            <v-col xs8>
              <v-select :items="categories" v-model="newPost.categorie" label="Select" light single-line auto />
            </v-col>
          </v-row>


          <v-row row>
            <v-col xs4>
              <v-subheader>Note sur 5</v-subheader>
            </v-col>
            <v-col xs8>
              <v-slider v-model="newPost.note" :max="5" :min="1" step="1" light />
            </v-col>
          </v-row>
          <v-row row>
            <v-col xs4>
              <v-subheader>Visible sur le site</v-subheader>
            </v-col>
            <v-col xs8>
              <v-checkbox success v-model="newPost.visible" light />
            </v-col>
          </v-row>

          <v-card-row actions>
            <v-btn @click.native="save" primary large>
              <v-icon>edit</v-icon> Ajouter cette Article</v-btn>
          </v-card-row>

        </v-container>
      </v-card>

    </v-col>
  </v-row>

</template>

<script>

  export default {
    name: 'list',
    components: {},
    data() {
      return {
        visibles: [],
        iconVisible: 'visibility_off',
        snackbar: false,
        categories: ['Sport', 'Politique', 'Finance', 'Actualité', 'Insolite', 'Santé', 'Technologie', 'Amour'],
        newPost: {
          title: "",
          note: 3,
          visible: true,
          categorie: "",
          description: "",
          datePublication: null,
          datePicker: null
        },
        posts: []
      }
    },
    created() {
      this.$http.get('http://localhost:3000/visible').then(response => {
        this.posts = response.body;
      });
    },
    filters: {
      truncate(text) {
        return text.split(" ").splice(0, 10).join(" ") + "...";
      }
    },
    methods: {
      changeVisibles() {
        if (this.visibles.length >= 1) {
          this.$http.post('http://localhost:3000/activation', { visibles: this.visibles }).then(response => {
            this.posts = response.body;
          });
        }
      },
      changeVisibility() {
        if (this.iconVisible == 'visibility_off') {
          this.iconVisible = 'visibility';
          this.$http.get('http://localhost:3000/invisible').then(response => {
            this.posts = response.body;
          });
        } else {
          this.iconVisible = 'visibility_off';
          this.$http.get('http://localhost:3000/visible').then(response => {
            this.posts = response.body;
          });
        }
      },
      save() {
        this.$http.post(`http://localhost:3000/save`, this.newPost).then(response => {
          if (response.body) {
            this.snackbar = true;

            this.posts.push(response.body);
            this.newPost = {
              title: "",
              note: 3,
              visible: true,
              categorie: "",
              description: "",
              datePublication: null,
              datePicker: null
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