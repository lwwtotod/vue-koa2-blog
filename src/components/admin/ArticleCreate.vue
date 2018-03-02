<template lang="html">
  <el-row>
    <el-col :span="24">
      <el-form ref="articleCreate" :model="article" :rules="createRules" >
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="founder">
              <el-input v-model="article.founder" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3" >
            <el-form-item label="所属分类" label-width="90px" prop="classification">
              <el-select v-model="article.classification" placeholder="请选择分类">
                <el-option v-for="item in classifyList" :label="item.name" :value="item.name"></el-option>
            </el-select>
            </el-form-item>
          </el-col>
      </el-row>
        <el-row style="margin-top:20px">
          <el-col :span='12'>
            <!-- 编辑区 -->
            <el-form-item class="show" prop="content" >
               <el-input type="textarea" v-model="article.content" :rows="25" placeholder="请在此处编辑文章"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <!-- 展示区 -->
            <div style="background:#fff;margin:0 0 0 20px;height:526px;overflow-y:auto;" v-html="markedToHtml"></div>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 " >
          <el-button type="primary" style="float:right;" size='small' @click="createArticle" :loading="load">{{btnText}}</el-button>
            <el-button style="float:right;margin-right:10px" size='small' @click="cancle" :loading="load">取消</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import jwt from "jsonwebtoken";
import api from "../../api/index";
import marked from "marked";
import hlj from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import NProgress from "nprogress";
export default {
  data() {
    return {
      userInfo: null,
      article: {
        id: null,
        classification: null, //文章所属分类
        founder: null, //文章标题
        content: "" //文章内容
      },
      classifyList: [],
      createRules: {
        founder: [{ required: true, message: "请填写标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
        classification: [
          { required: true, message: "请选择分类", trigger: "change" }
        ]
      },
      load: false,
      btnText: "立即发布"
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
      return marked(this.article.content);
    }
  },
  methods: {
    // 发布文章
    createArticle() {
      this.$refs.articleCreate.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗?", "提示", {})
            .then(() => {
              NProgress.start();
              this.load = true;
              this.btnText = "发布中";
              // 发送的文章信息
              let params = {
                user_id: this.userInfo.id,
                user_name: this.userInfo.name,
                classification: this.article.classification,
                content: this.article.content,
                founder: this.article.founder
              };
              api.createArticle(params).then(res => {
                this.btnText = "立即发布";
                this.editLoading = false;
                if (res.data.success) {
                  this.formVisible = false;
                  this.$message({
                    message: "恭喜你，更新成功！",
                    type: "success"
                  });
                } else {
                  this.$message({
                    message: "更新失败！",
                    type: "warning"
                  });
                }
                this.$router.go(-1);
              });
            })
            .catch(error => {});
        }
      });
    },
    // 取消
    cancle() {
      this.$router.push({ path: "/admin/articleList" });
    },
    getUserInfo() {
      const token = sessionStorage.getItem("jwt");
      if (token !== null && token !== "null") {
        let decode = jwt.decode(token);
        return decode;
      } else {
        return null;
      }
    }
  },
  mounted() {
    this.userInfo = this.getUserInfo();
    api.getClassify().then(res => {
      this.classifyList = res.data.result;
    });
  }
};
</script>

<style lang="css" >

</style>
