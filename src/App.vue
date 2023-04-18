<template>
  <div id="app" :class="{ website: isWebsite }">
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    isWebsite() {
      return this.$route.path.includes('/website')
    }
  }
}
</script>
