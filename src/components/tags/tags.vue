<template lang="html">
  <div class="tags_wrap">
    <transition-group enter-active-class="animated shake" tag="ul" class="tags_list">
      <li v-for='(item,index) in items' :key="index">
        <a class="tag_btn" :to="`/tags/${item.id}`" @click.prevent="getArticleListByTag(item.name)" :class="{'active':index==selected}">{{item.name}}</a>
      </li>
    </transition-group>
    <transition-group enter-active-class="animated lightSpeedIn">
      <article v-for='(item,index) in articleLists' :key="index">
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
  import api from "@/api";
  export default {
    name: "Tags",
    data() {
      return {
        items: [{
            _id: 1,
            classify: "css"
          },
          {
            _id: 2,
            classify: "vue"
          }
        ],
        //标签列表
        articleLists: [{
          id: null,
          title: null,
          classification: null,
          content: ''
        }],
        // 文章列表
        selected: 9,
        show: true, //是否显示
        loading: false, //加载框
        list_show: true
      };
    },
    methods: {
      markedToHtml(md) {
        return marked(md.slice(0, 100))
      },
      getClassify() {
        api.getClassify().then(res => {
          setTimeout(() => {
            this.items = res.data.result;
          }, 500);
        });
      },
      getArticleListByTag(tag){
        api.getArticleListByTag({tag:tag}).then(res => {
          this.articleLists = res.data
        })
      },
      getArticleList(){
        api.getArticleList().then(res => {
        if (res.data.success) {
          this.articleLists = res.data.result;
        } else {
          console.error(res);
        }
      });
      }
    },
    mounted() {
      this.getClassify();
      this.getArticleList();
    }
  };

</script>

<style lang="stylus" scoped>
h2, h4 {
  margin: 0;
}

p, .tags_main p {
  margin: 0;
}

.tags_list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;

  li {
    margin: 0.4rem;

    a {
      display: block;
      padding: 0.6rem 1.6rem;
      border: 1px solid #d2d2d2;
      border-radius: 0.6rem;
      color: rgba(0, 0, 0, 0.8);
      font-size: 1.8rem;
      background-color: #f7f7f7;
      transition: all 0.4s;
      cursor: pointer;
    }
  }
}

.tags_list li a:hover, .tags_list li .active {
  background-color: #555555;
  color: #fff;
}

.tags_wrap {
  min-height: 500px;
  margin: auto;
  list-style: none;

  article {
    padding-bottom: 1rem;
    border-bottom: 1px solid #d2d2d2;
  }
}

.tags_title {
  display: block;
  font-size: 3rem;
  font-weight: 400;
  color: #404040;
  padding: 1rem 0;
}

.tags_creatAt {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; // 限制快级元素的文本行数
  overflow: hidden;
  font-family: 'Comic Sans MS', curslve, sans-serif; // padding: 0.6rem 0;
  font-size: 1.8rem;
  color: #7f8c8d;
}

.tags_main {
  font-size: 1.6rem;
  color: #34495e;
  line-height: 1.6em;
  padding: 1rem 0;
}

footer {
  text-align: right;
}

.tags_readMore {
  font-size: 2rem;
  color: #919191;
  font-weight: 600;
}

@media screen and (max-width: 786px) {
  .tags_title {
    font-size: 2.4rem;
  }

  .tags_creatAt {
    font-size: 1.6rem;
  }

  .tags_list li {
    margin: 0.2rem;
  }

  .tags_list li a {
    font-size: 1.4rem;
  }
}

@media screen and (max-width: 480px) {
  .tags_main {
    font-size: 1.4rem;
  }

  .tags_readMore {
    font-size: 1.8rem;
  }
}
</style>
