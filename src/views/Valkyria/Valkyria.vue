<template>
  <div class="valkyria">
    <router-link to="/valkyria/overview">概览</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'valkyria',
  components: {
    
  }
}
</script>

<style scoped lang="scss">
.valkyria{
  width: rem(750);
  font-size: rem(16);
}
</style>
