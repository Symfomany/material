<template>
  <v-app id="sidebar-example-2" class="elevation-1" top-toolbar left-fixed-sidebar sidebar-under-toolbar>

    <v-toolbar class="pink">
      <v-toolbar-side-icon @click.native.stop="sidebar = !sidebar" />
      <v-toolbar-title class="hidden-sm-and-down">App Blog</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark>
        <v-icon>add_alert</v-icon>
      </v-btn>
      <v-btn icon dark slot="activator" @click.native="d3 = true">
        <v-icon>settings</v-icon>
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

      <v-dialog v-model="d3" fullscreen transition="v-dialog-bottom-transition" :overlay=false>

        <v-card>
          <v-card-row>
            <v-toolbar>
              <v-btn icon="icon" @click.native="d3 = false">
                <v-icon>close</v-icon>
              </v-btn>
              <v-toolbar-title>Settings</v-toolbar-title>
              <v-btn class="white--text" flat="flat" @click.native="d3 = false">Save</v-btn>
            </v-toolbar>
          </v-card-row>

          <v-list three-line subheader>
            <v-subheader>User Controls</v-subheader>
            <v-list-item>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Content filtering</v-list-tile-title>
                  <v-list-tile-sub-title>Set the content filtering level to restrict appts that can be downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Password</v-list-tile-title>
                  <v-list-tile-sub-title>Require password for purchase or use password to restrict purchase</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list three-line subheader>
            <v-subheader>General</v-subheader>
            <v-list-item>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox />
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Notifications</v-list-tile-title>
                  <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox />
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Sound</v-list-tile-title>
                  <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
            <v-list-item>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox />
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                  <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-item>
          </v-list>
        </v-card>
      </v-dialog>






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
        sidebar: false,
        d3: false
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