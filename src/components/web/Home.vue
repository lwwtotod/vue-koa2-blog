<template lang="html">
      <div>
        <article  class="home_wrapper">
          <header>
            <div>
              <router-link :to="{path:`/article/${item.id}`}" class="home_title">
              {{item.title}}
            </router-link>
          </div>
          <div>
            <p class="home_creatAt">{{item.content}}</p>
          </div>
        </header>
        <section v-html="item.contentToMark" class="home_main"></section>
        <footer>
            <router-link class="home_readMore" :to="{path:`/article/${item.id}`}">阅读全文>></router-link>
         </footer>
      </article>
      <footer class='loadMore' v-if='loadMoreShow'><el-button type="primary" :loading="loadMoreFlag" @click='loadMore' >{{loadMoreText}}</el-button></footer>
    </div>
</template>

<script>
import marked from 'marked'
import hlj from 'highlight.js'
import BaseFooter from './BaseFooter'
import api from '../../api'
import BaseHeader from './BaseHeader'
export default {
  name: 'Home',
  data() {
    return {
      items: [
        {
          id: null,
          title: null,
          classification: null,
          content: null
        }
      ],
      loading: false,
      loadMoreFlag: false,
      loadMoreText: '加载更多',
      loadMoreShow: false, //加载更多
      page: 1,
      limit: 10
    }
  },
  components: {
    BaseHeader,
    BaseFooter
  },
  computed: {
    markedToHtml: function() {
      marked.setOptions({
        highlight: function(code) {
          return hlj.highlightAuto(code).value
        }
      })
      // console.log(this.article.content);
      return marked(this.oneArticle.content)
    }
  },
  methods: {
    // loadMore(){
    //   this.loadMoreText = '加载中'
    //   this.loadMoreFlag = true
    //   this.page++
    //   this.loadData(this.page,this.limit)
    // },
    loadData() {
      api.getArticleList().then(res => {
        if (res.data.success) {
          this.items = res.data.result
        } else {
          console.error(res)
        }
        this.loadMoreShow = false
      })
    }
  },
  mounted() {
    // 封装成一个方法，与分页获取文章列表类似
    // this.$store.dispatch('changeHeadLine','主页')
    this.loadData()
  }
}
</script>

<style lang="stylus" scoped>
h2, h4 {
  margin: 0;
}

.home_wrapper {
  margin: auto;
  list-style: none;

  article {
    padding-bottom: 1rem;
    border-bottom: 1px solid #d2d2d2;
    margin-bottom: 2rem;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; // 限制快级元素的文本行数
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