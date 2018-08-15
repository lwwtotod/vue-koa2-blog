<template>
  <div>
    <span>文章标题</span>
    <Input v-model="article.founder" placeholder="Enter something..." style="width: 300px" />
    <span>选择分类</span>
    <Select v-model="article.classification" style="width:200px">
      <Option v-for="item in tabList" :value="item.name" :key="item.id">{{ item.name }}</Option>
    </Select>
    <Button type="primary" shape="circle" icon="md-filing"></Button>
    <div class="demo-split">
      <markdown-editor v-model="article.content" :value="article.content" :isNewContent="isNewContent" v-if="flag" />
      <!-- <Split v-model="split1">
        <div slot="left" class="demo-split-pane">
          <Input v-model="article.content" type="textarea" :rows="22" placeholder="Enter something..." />
        </div>
        <div slot="right" class="demo-split-pane">
          <div class="markdown-view" v-html="markedToHtml"></div>
        </div>
      </Split> -->
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '@/components/admin/markdown'
import jwt from "jsonwebtoken";
import api from "@/api";
import marked from "marked";
import hlj from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
export default {
  components: {
    MarkdownEditor
  },
  data() {
    return {
      flag: false,
      isNewContent: true,
      tabList: [], //分类列表
      // split1: 0.5,
      article: {
        id: null,
        classification: '', //文章所属分类
        founder: null, //文章标题
        content: "" //文章内容
      },
    }
  },
  computed: {
    markedToHtml: function () {
      marked.setOptions({
        highlight: function (code) {
          return hlj.highlightAuto(code).value;
        }
      });
      return marked(this.article.content);
    }
  },
  methods: {
    getClassList() {
      api.getClassify().then(res => {
        this.tabList = res.data.result;
      });
    },
    getDetail() {
      api.getOneArticle({ id: this.$route.params.id }).then(res => {
        if (res.status === 200) {
          this.article = res.data;
          this.flag = true
        }
      });
    },
  },
  mounted() {
    this.getClassList();

    if (this.$route.params.id) {
      this.isNewContent = false;
      this.getDetail();
    }else{
      this.flag = true
    }
  }
}
</script>

<style scoped lang="stylus">
.demo-split {
  height: 500px;
  border: 1px solid #dcdee2;

  .demo-split-pane {
    padding: 10px;

    .markdown-view {
      position: relative;
      width: 100%;
      height: 485px;
      overflow-x: auto;
      // overflow-y: auto;
    }
  }
}
</style>