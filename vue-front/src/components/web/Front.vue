<template>
  <div class="wrapper">
    <base-head class="head"></base-head>
    <router-view class="content"></router-view>
    <base-footer class="foot"></base-footer>
  </div>
</template>

<script>
import BaseHead from "./BaseHeader";
import BaseFooter from "./BaseFooter";
// import api from '../../api'
export default {
  components: {
    BaseHead,
    BaseFooter
  },
  data() {
    return {
      items:[],
      loading:false
    };
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.head, .foot {
  flex: 0 0 auto;
}

.content {
  width: 80%;
  padding: 2rem;
  padding-bottom: 0;
  max-width: 800px;
  flex: 1 0 auto;
  background: #fff;

  .fade-enter-active, .fade-leave-active {
    transition: all 0.3s;
  }

  .fade-enter {
    transform: translateY(2rem);
    opacity: 0;
  }

  .fade-leave-active {
    transform: translateX(2rem);
    opacity: 0;
  }

  @media screen and (max-width: 480px) {
    .content {
      width: 100%;
      padding: 1rem 2rem;
    }
  }
}
</style>
