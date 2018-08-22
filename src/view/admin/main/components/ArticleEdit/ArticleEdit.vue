<template>
  <div>
    <Content :style="{padding: '0 16px 16px'}">
      <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Article</BreadcrumbItem>
        <BreadcrumbItem>Article List</BreadcrumbItem>
      </Breadcrumb>
      <Form ref="article" :model="article" :rules="ruleInline">
        <div class="main">
          <Row>
            <div class="main-title">
              <Col span="7">
              <FormItem label="标题" prop="founder">
                <Input v-model="article.founder" placeholder="Enter something..." style="width: 300px" />
              </FormItem>
              </Col>
              <Col span="15">
              <FormItem label="分类" prop="classification">
                <Select v-model="article.classification" style="width:200px">
                  <Option v-for="item in tabList" :value="item.name" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
              </Col>
            </div>
            <Col span="2">
            <Button class="main-btn" type="primary" shape="circle" icon="md-filing" @click="saveArticle('article')">save</Button>
            </Col>
          </Row>
        </div>
        <FormItem prop="content">
          <Spin size="large" fix v-if="spinShow"></Spin>
          <div class="main-split">
            <markdown-editor v-model="article.content" :value="article.content" :isNewContent="isNewContent" v-if="flag" />
          </div>
        </FormItem>
      </Form>
    </Content>
  </div>
</template>

<script>
  import MarkdownEditor from '@/components//markdown'
  import jwt from "jsonwebtoken";
  import api from "@/api";
  export default {
    components: {
      MarkdownEditor
    },
    data() {
      return {
        spinShow: true,
        flag: false,
        isNewContent: true,
        tabList: [], //分类列表
        article: {
          id: null,
          classification: '', //文章所属分类
          founder: null, //文章标题
          content: "" //文章内容
        },
        ruleInline: {
          founder: [{
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          }],
          classification: [{
            required: true,
            message: '请选择分类.',
            trigger: 'change'
          }, ],
          content: [{
            required: true,
            message: '请选择分类.',
            trigger: 'blur'
          }, ]
        }
      }
    },
    computed: {},
    methods: {
      getClassList() {
        api.getClassify().then(res => {
          this.tabList = res.data.result;
        });
      },
      getDetail() {
        api.getOneArticle({
          id: this.$route.params.id
        }).then(res => {
          if (res.status === 200) {
            this.article = res.data;
            this.flag = true
          }
        });
      },
      saveArticle(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.$route.params.id) {
              this.editArticle()
            } else {
              this.createArticle()
            }
          } else {
            this.$Message.error('你好像傻!');
          }
        })

      },
      createArticle() {
        let params = {
          user_id: this.userInfo.id,
          user_name: this.userInfo.name,
          classification: this.article.classification,
          content: this.article.content,
          founder: this.article.founder
        };
        api.createArticle(params)
          .then(res => {
            if (res.data.success) {
              this.$Message.success('保存成功');
            } else {
              this.$Message.error('保存失败');
            }
            this.$router.go(-1);
          })
          .catch(err => {
            this.$Message.error('保存失败');
            console.log(err);
          });;
      },
      editArticle() {
        api.editArticle(this.article)
          .then(res => {
            if (res.data.success) {
              this.$Message.success('保存成功');
            } else {
              this.$Message.error('保存失败');
            }
            this.$router.go(-1);
          })
          .catch(err => {
            this.$Message.error('保存失败');
            console.log(err);
          });
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
    created() {
      this.userInfo = this.getUserInfo();
    },
    mounted() {
      this.getClassList();
      if (this.$route.params.id) {
        this.isNewContent = false;
        this.getDetail();
        setTimeout(() => {
          this.spinShow = false;
        }, 500)
      } else {
        this.flag = true
        this.spinShow = false;
      }
    }
  }

</script>

<style scoped lang="stylus">
  .main-split {
    height: 500px;
    border: 1px solid #dcdee2;

    .main-split-pane {
      padding: 10px;

      .markdown-view {
        position: relative;
        width: 100%;
        height: 485px;
        overflow-x: auto; // overflow-y: auto;
      }
    }
  }

</style>
