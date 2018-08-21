<template>
  <header>
    <div class="header-bg">
      <div class="title" @click="routeJump()">
        test
      </div>
      <Dropdown @on-click="routeJump">
        <i-button type="text" style="margin-top: 3rem">
          <Icon type="md-funnel" size="30" />
        </i-button>
        <Dropdown-menu slot="list">
          <Dropdown-item name="home">home</Dropdown-item>
          <Dropdown-item name="tags">tags</Dropdown-item>
          <Dropdown-item name="about">about</Dropdown-item>
        </Dropdown-menu>
      </Dropdown>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    routeJump(name) {
      switch (name) {
        case 'home':
          this.$router.push({ path: '/' })
          break;
        case 'tags':
          this.$router.push({ path: '/tags' })
          break;
        case 'about':
          this.$router.push({ path: '/about' })
          break;
        default:
          this.$router.push({ path: '/' })
      }
      console.log(name)
    },
  }
};
</script>

<style lang="stylus" scoped>
header {
  height: 10rem;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
}

.header-bg {
  display: flex;
  // justify-content:center;
  // align-items:center;
  position: fixed;
  height: 10rem;
  width: 100%;
  left: 0;
  top: 0;
  background-color: #fff;
  box-shadow: 0px 1px 40px #888;
}

.title {
  display: inline-block;
  width: 20rem;
  background-color: #000;
  height: 10rem;
  color: red;
  font-size: 50px;
  cursor: pointer;
}
</style>
