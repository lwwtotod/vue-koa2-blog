<template>
  <div id="app"
       v-cloak>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

}

</script>
<style>
[v-cloak] {
  display: none;
}

html {
  margin: 0;
  padding: 0;
  background: #222;
}
</style>
