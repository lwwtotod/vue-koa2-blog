<template lang="html">
  <div class="about" v-loading="loading" element-loading-text="加载中">
    <div v-if="shows">
      <h2>about</h2>
      <!-- <p>xxxxxxxxxxx</p> -->
      <!-- <p><a href="" target="_blank">Github</a></p> -->
      <h2>关于我</h2>
      <p>王同学，程序员，就读于渤海大学，14年入学，主修计算机
略宅…日常爱好刷FCC,刷推，看动漫，追美剧
搭个博客记录一下学习前端的过程与踩过的坑
</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      shows: true, //是否显示信息
      loading: false //加载框
    };
  },
  mounted() {
    // this.$store.dispatch('changeHeadLine','关于')
    // setTimeout(()=>{
    //   this.$store.dispatch('showProgress', 100)
    //   this.shows = true;
    //   this.loading = false
    // },300)
  }
};
</script>

<style lang="stylus" scoped>
.about {
  margin: auto;

  a {
    color: #4078c0;
    display: inline-block;
    padding: 0.2rem 0.4rem;
    font-size: 1.6rem;

    &:first-child {
      padding-left: 0;
    }
  }

  p {
    font-size: 1.6rem;
    line-height: 1.6em;
  }

  h2 {
    font-weight: 400;
    font-size: 3rem;
    align-self: center;
    margin-top: 2rem;
  }
}

.about a, .about p, .about h2 {
  margin: 1rem auto;

  @media screen and (max-width: 480px) {
    .about a, .about p {
      font-size: 1.4rem;
    }

    .about h2 {
      margin-top: auto;
      font-size: 2.2rem;
    }
  }
}
</style>