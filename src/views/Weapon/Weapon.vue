<template>
  <div class="weapon">
    weapon
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'weapon',
  components: {
    
  }
}
</script>

<style scoped lang="scss">
.weapon{
  width: rem(750);
  font-size: rem(16);
}
</style>
