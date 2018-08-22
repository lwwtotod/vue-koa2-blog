<template lang="html">
  <div class="home_wrapper">
    <transition-group enter-active-class="animated lightSpeedIn">
      <article v-for='item in items' :key="item.id">
        <header>
          <p class="home_creatAt" v-html="markedToHtml(item.content)" @click="routrJump(item.id)"></p>
        </header>
        <footer>
          <router-link class="home_readMore" :to="{path:`/article/${item.id}`}">阅读全文</router-link>
        </footer>
      </article>
    </transition-group>
  </div>
</template>

<script>
  import marked from 'marked'
  import hlj from 'highlight.js'
  import api from '@/api'
  export default {
    name: 'Home',
    data() {
      return {
        items: [{
          id: null,
          founder: null,
          classification: null,
          content: ''
        }],
        loading: false,
        loadMoreFlag: false,
        loadMoreText: '加载更多',
        loadMoreShow: false, //加载更多
        page: 1,
        limit: 10
      }
    },
    components: {},
    filters: {

    },
    methods: {
      routrJump(id) {
        this.$router.push({
          path: `/article/${id}`
        })
      },
      markedToHtml(md) {
        return marked(md.slice(0, 100))
      },
      loadData() {
        api.getArticleList().then(res => {
          if (res.data.success) {
            for (let i = 0; i < res.data.result.length; i++) {
              this.items.push(res.data.result[i])
            }
          } else {
            console.error(res)
          }
          this.loadMoreShow = false
        })
      }
    },
    mounted() {
      this.loadData()
    }
  }

</script>

<style lang="stylus" scoped>
  h2,
  h4 {
    margin: 0;
  }

  .home_wrapper {
    margin: 3rem auto;
    list-style: none;

    article {
      padding: 1rem 3rem; // border: 1px solid #d2d2d2;
      margin-bottom: 2rem;
      border-radius: 5rem;
      background-color: rgba(100, 100, 100, .2);
    }
  }

  .home_title {
    display: block;
    font-size: 2.6rem;
    font-weight: 400;
    color: #404040;
    padding: 0.8rem 0;

    &:hover {
      opacity: 0.5;
    }
  }

  .home_creatAt {
    cursor: pointer;
    max-height 11rem;
    overflow: hidden;
    font-family: 'Comic Sans MS', curslve, sans-serif;
    font-size: 1.6rem;
    color: #7f8c8d;
    margin: 0;
  }

  .home_main {
    font-size: 1.6rem;
    color: #34495e;
    line-height: 1.6em;
  }

  footer {
    text-align: right;
  }

  .home_readMore {
    font-size: 2rem;
    color: #919191;
    font-weight: 600;

    &:hover {
      opacity: 0.6;
    }
  }

  .loadMore {
    margin: 4rem 0 0 0;
    display: flex;
    display: webkit-flex;

    button {
      cursor: pointer;
      outline: none;
      padding: 1rem;
      margin: auto;
      border-radius: 0.5rem;
      color: rgba(0, 0, 0, 1);
      border: 1px solid #bfcbd9;
      background-color: #f7f7f7;
    }
  }

  @media screen and (max-width: 786px) {
    .home_title {
      font-size: 1.8rem;
      line-height: 1.5em;
    }

    .home_creatAt {
      font-size: 1.4rem;
    }

    .loadMore {
      margin: 3rem 0 0.8rem 0;
    }
  }

  @media screen and (max-width: 480px) {
    .home_main {
      font-size: 1.4rem;
    }

    .home_readMore {
      font-size: 1.8rem;
    }
  }

</style>
