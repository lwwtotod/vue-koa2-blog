<template>
  <div>
    <div class="demo-split">
      <Split v-model="split1">
        <div slot="left" class="demo-split-pane">
          <!-- <i-editor v-model="content"></i-editor> -->
          <Input v-model="article.content" type="textarea" :rows="22" placeholder="Enter something..." />
        </div>
        <div slot="right" class="demo-split-pane">
          <div style="background:#fff;margin:0 0 0 20px;height:480px;overflow-y:auto;" v-html="markedToHtml"></div>
        </div>
      </Split>
    </div>
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
import api from "@/api";
import marked from "marked";
import hlj from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
export default {
  data() {
    return {
      split1: 0.5,
      content: '',
      article: {
        id: null,
        classification: null, //文章所属分类
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
      // console.log(this.article.content);
      return marked(this.article.content);
    }
  },
}
</script>

<style scoped>
.demo-split {
  height: 500px;
  border: 1px solid #dcdee2;
}
.demo-split-pane {
  padding: 10px;
}
</style>