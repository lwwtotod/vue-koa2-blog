<template lang="html">
  <el-row>
    <el-col :span="24">
      <el-form ref="articleCreate" :model="article" :rules="createRules"  v-loading="listLoading">
        <el-row style="margin-top:20px">
          <el-col :span='10' :push="1">
            <el-form-item label="文章标题" label-width="90px" prop="founder">
              <el-input v-model="article.founder" style="width:260px" placeholder="请在此处输入标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :push="3" >
            <el-form-item label="所属分类" label-width="90px" prop="classify">
              <el-select v-model="article.classification" placeholder="请选择分类">
                <el-option  v-for="item in classifyList" :label="item.name" :value="item.name"></el-option>
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
            <div style="background:#fff;margin:0 0 0 20px;height:526px;overflow-y:auto;" :v-html="markedToHtml" class="article"></div>
          </el-col>
        </el-row>
        <el-form-item style="padding:20px 20px 0 0 " >
          <el-button type="primary" style="float:right;" size='small' @click="editArticle" :loading="load">{{btnText}}</el-button>
            <el-button style="float:right;margin-right:10px" size='small' @click="cancle" >返回</el-button>
      </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import api from "../../api/index";
import marked from "marked";
import hlj from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import NProgress from "nprogress";
export default {
  data() {
    return {
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
      btnText: "立即更新",
      listLoading: false
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
    // 更新文章
    editArticle() {
      this.$refs.articleCreate.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗?", "提示", {})
            .then(() => {
              NProgress.start();
              this.load = true;
              // 换成真实API的时候可以直接提交this.article
              this.btnText = "更新中";
              api
                .editArticle(this.article)
                .then(res => {
                  this.btnText = "立即更新";
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
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(error => {
              // 这里数据在换成真实api的时候要替换掉,直接用this.article
            });
        }
      });
    },
    initial() {
      this.listLoading = true;
      NProgress.start();
      setTimeout(() => {
        NProgress.done();
        this.listLoading = false;
        api.getOneArticle({ id: this.$route.params.id }).then(res => {
          if (res.status === 200) {
            this.article = res.data;
          }
        });
        api.getClassify().then(res => {
          this.classifyList = res.data.result;
        });
      }, 500);
    },
    // 取消
    cancle() {
      this.$router.push({ path: "/admin/articleList" });
    }
  },
  mounted() {
    this.initial();
  }
};
</script>


<style scoped>

</style>