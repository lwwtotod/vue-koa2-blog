<template>
  <header>
    <div class="header-bg">
      <div style="margin:0 auto">
        <div class="title"
             @click="routeJump()">
          <span>记录</span>
        </div>
      </div>
      <div class="drop-down">
        <Dropdown @on-click="routeJump"
                  trigger="click">
          <i-button type="text"
                    style="margin-top: 3rem">
            <Icon type="md-funnel"
                  size="30" />
          </i-button>
          <Dropdown-menu slot="list">
            <Dropdown-item name="home">home</Dropdown-item>
            <Dropdown-item name="tags">tags</Dropdown-item>
            <Dropdown-item name="about">about</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </div>

    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    routeJump(name) {
      switch (name) {
        case 'home':
          this.$router.push({
            path: '/'
          })
          break;
        case 'tags':
          this.$router.push({
            path: '/tags'
          })
          break;
        case 'about':
          this.$router.push({
            path: '/about'
          })
          break;
        default:
          this.$router.push({
            path: '/'
          })
      }
      console.log(name)
    },
  }
};

</script>

<style lang="stylus" scoped>
header
  height 10rem
  display flex
  flex-direction column
  border-radius 25px

.header-bg
  display flex
  justify-content flex-end
  position fixed
  height 10rem
  width 100%
  left 0
  top 0
  background-color #fff
  box-shadow 0px 1px 40px #888

  .title
    margin-left 62px
    display flex
    justify-content center
    width 20rem
    background-color #d6d6d6
    height 10rem
    color #000
    font-size 50px
    cursor pointer

  .drop-down
    justify-content flex-end
</style>
