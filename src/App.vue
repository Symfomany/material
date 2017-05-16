<template>
  <div>
    <navbar></navbar>
    <router-view></router-view>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import BottomBar from '@/components/BottomBar'

export default {
  name: 'app',
  components: {navbar: Navbar, bottomBar: BottomBar}
}
</script>

<style scoped>

</style>