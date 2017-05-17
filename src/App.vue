<template>
  <!--<navbar></navbar>-->
  <v-app id="example-1">

    <v-toolbar>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-sidebar class="blue darken-3" drawer v-model="sidebar" height="100%">
        <v-list dense>
          <v-list-item>
            <v-list-tile>
              <v-list-tile-title v-text="'dqdsqdq'" />
            </v-list-tile>
          </v-list-item>
        </v-list>
      </v-sidebar>

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
    <v-footer>Footer</v-footer>
  </v-app>

</template>

<script>
  import Navbar from '@/components/Navbar'
  import BottomBar from '@/components/BottomBar'

  export default {
    name: 'app',
    data(){
      return {
        sidebar: false
      }
    },
    components: { }
  }
</script>

<style scoped>

</style>