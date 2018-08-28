<template lang="html">
  <div class="tags_wrap"  v-loading="loading"  element-loading-text="加载中">
    <ul class="tags_list">
      <li v-for='(item,index) in items'>
        <a class="tag_btn" :to="`/tags/${item.id}`" @click.prevent="gets(index,item.name)" :class="{'active':index==selected}">{{item.name}}</a>
      </li>
    </ul>
    <transition-group name="list" tag="div" >
      
      <article v-for='item in articleLists' v-if='show' :key="item.id" >
        <header>
          <div>
            <router-link :to="{path:`/article/${item.id}`}" class="tags_title" >
            {{item.title}}
          </router-link>
        </div>
        <div>
          <p class="tags_creatAt">{{item.content}}</p>
        </div>
      </header>
      <section v-html="item.contentToMark" class="tags_main" ></section>
      <footer>
          <router-link class="tags_readMore" :to="{path:`/article/${item.id}`}">阅读全文>></router-link>
      </footer>
    </article>
    
    </transition-group>
  </div>
</template>

<script>
import api from "../../api";
import BaseFooter from "./BaseFooter";
export default {
  name: "Tags",
  data() {
    return {
      items: [
        {
          _id: 1,
          classify: "css"
        },
        {
          _id: 2,
          classify: "vue"
        }
      ],
      //标签列表
      articleLists: [
        {
          _id: 1,
          title: "这是一篇文章",
          contentToMark: "css",
          created_at: "这里是内容"
        }
      ],
      // 文章列表
      selected: 9,
      show: true, //是否显示
      loading: false, //加载框
      list_show: true
    };
  },
  components: {
    BaseFooter
  },
  methods: {
    // gets(index,classify){
    //   this.$store.dispatch('changeHeadLine',classify)
    //   this.show = false;
    //   this.selected = index
    //   this.getPage(classify)
    // },
    getPage() {
      api.getClassify().then(result => {
        setTimeout(() => {
          this.items = result.data.result;
        }, 500);
      });
    }
  },
  mounted() {
    this.getPage();
    // this.$store.dispatch('changeHeadLine','标签')
    // 根据标签名获取文章列表
    // api.getNoAuthClass()
    //   .then(({data:{code,lists}})=>{
    //     if(code==200){
    //       setTimeout(()=>{
    //         this.loading=false;
    //         this.items = lists
    //         this.getPage('Vue')
    //       },200)
    //     }
    //   })
    //   .catch(err=>{
    //     alert(err.message);
    //   })
    api.getArticleList().then(res => {
      if (res.data.success) {
        this.articleLists = res.data.result;
      } else {
        console.error(res);
      }
    });
  }
};
</script>

<style lang="stylus" scoped>
.list-enter-active, .list-leave-active {
  transition: all 0.3s;
}

.list-enter, .list-leave-active {
  opacity: 0;
}

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
  font-family: 'Comic Sans MS', curslve, sans-serif;
  // padding: 0.6rem 0;
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