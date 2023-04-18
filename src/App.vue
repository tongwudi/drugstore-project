<template>
  <div id="app" :class="isWebsite ? 'website' : 'backend'">
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
