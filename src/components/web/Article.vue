<template lang="html">
  <article v-loading="loading"  element-loading-text="加载中" class="article_wrap article">
    <header>
      <div class="home_title">{{oneArticle.title}}</div>
    <div>
      <p class="home_creatAt" v-html="markedToHtml"></p>
    </div>
  </header>
  <section v-html="oneArticle.contentToMark" class="home_main"></section>
</article>
</template>

<script>
import marked from "marked";
import hlj from "highlight.js";
import api from "../../api";
export default {
  data() {
    return {
      oneArticle: {}, //文章列表
      loading: true //加载框
    };
  },
  computed: {
    markedToHtml: function() {
      marked.setOptions({
        highlight: function(code) {
          return hlj.highlightAuto(code).value;
        }
      });
      // console.log(this.article.content);
      return marked(this.oneArticle.content);
    }
  },
  created() {
    // 在这里调用获取一篇文章的api
    api.getOneArticle({ id: this.$route.params.id }).then(res => {
      if (res.status === 200) {
        this.oneArticle = res.data;
        this.loading = false;
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
article {
  margin: auto;
}

.home_title {
  font-size: 3rem;
  font-weight: 400;
  color: #404040;
  padding: 1rem 0;
}

.home_creatAt {
  font-family: 'Comic Sans MS', curslve, sans-serif;
  padding: 0.6rem 0;
  font-size: 1.8rem;
  color: #7f8c8d;
  margin: 0;
}

.home_main {
  font-size: 1.6rem;
  line-height: 1.6em;
}

@media screen and (max-width: 786px) {
  .home_title {
    font-size: 2.2rem;
  }

  .home_creatAt {
    font-size: 1.6rem;
  }
}

@media screen and (max-width: 480px) {
  .home_main {
    font-size: 1.4rem;
    line-height: 1.6em;
  }
}
</style>