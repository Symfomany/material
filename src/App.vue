<template>
  <v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar>

    <v-toolbar class="pink">
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
      <v-toolbar-title class="hidden-sm-and-down">App Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark>
        <v-icon>add_alert</v-icon>
      </v-btn>
      <v-btn icon dark>
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn icon dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>

    <main>
      <v-sidebar class="blue" v-model="sidebar" left fixed drawer height="100%"></v-sidebar>

      <v-content>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
    <v-footer>Wild Code School 2017</v-footer>
  </v-app>

</template>

<script>
  import Navbar from '@/components/Navbar'
  import BottomBar from '@/components/BottomBar'

  export default {
    name: 'app',
    data() {
      return {
        sidebar: false
      }
    },
    methods: {
      openSidebar() {
        this.sidebar = !this.sidebar;
      }
    },
    components: {}
  }
</script>

<style scoped>

</style>