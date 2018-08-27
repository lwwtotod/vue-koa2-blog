<template>
  <div>
    <Content :style="{padding: '0 16px 16px'}">
      <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Article</BreadcrumbItem>
        <BreadcrumbItem>Article List</BreadcrumbItem>
      </Breadcrumb>
      <div style="height:26px;">
        <Tag v-for="item in classlist"
             :key="item.id"
             :color="item.color"
             :name="item.name">{{ item.name}}</Tag>
      </div>
      <Row>
        <Col span="24">
        <div class="new-Article-Button">
          <Button type="primary"
                  shape="circle"
                  icon="md-add"
                  to="/admin/articleCreate"></Button>
        </div>
        </Col>
      </Row>
      <div>
        <Table :loading="loading"
               :columns="columns"
               :data="articleLists"></Table>
      </div>
      <div class="page-paging">
        <Page :total="40"
              size="small"
              show-elevator
              show-sizer />
      </div>
    </Content>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      color: [
        'success',
        'primary',
        'error',
        'warning',
        'magenta',
        'red',
        'orange',
        'gold',
        'yellow',
        'cyan',
        'green',
        'blue',
        'geekblue'
      ],
      classlist: [],
      loading: false,
      columns: [
        {
          title: '文章标题',
          key: 'founder'
        },
        {
          title: '所属分类',
          key: 'classification'
        },
        {
          title: '创建时间',
          key: 'Creation_time'
        },
        {
          title: '创建人',
          key: 'user_name'
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 140,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  icon: 'md-eye',
                  type: 'success',
                  size: 'small',
                  shape: 'circle'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: `/article/${params.row.id}` })
                  }
                }
              }),
              h('Button', {
                props: {
                  icon: 'md-brush',
                  type: 'primary',
                  size: 'small',
                  shape: 'circle'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: `/admin/articleEdit/${params.row.id}`
                    })
                  }
                }
              }),
              h('Button', {
                props: {
                  icon: 'md-close',
                  type: 'error',
                  size: 'small',
                  shape: 'circle'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.delete(params.row.id)
                  }
                }
              })
            ])
          }
        }
      ],
      articleLists: []
    }
  },
  methods: {
    delete(id) {
      console.log(id, 111)
      this.$Modal.confirm({
        title: '提示',
        content: '<p>是否删除</p>',
        onOk: () => {
          api
            .removeOneArticle({ id })
            .then(res => {
              if (res.data.success) {
                this.$Message.success('删除成功')
              } else {
                this.$Message.error('删除失败')
              }
            })
            .catch(err => {
              this.$Message.error('删除失败')
            })
          this.getLists()
        },
        onCancel: () => {
          this.$Message.info('取消删除')
        }
      })
    },
    getLists() {
      this.loading = true
      api
        .getArticleList()
        .then(res => {
          if (res.data.success) {
            this.articleLists = res.data.result
          } else {
            console.error(res)
          }
          this.loading = false
        })
        .catch(err => {
          console.error(err)
          this.loading = false
        })
    },

    getClassLists() {
      this.loading = true
      api
        .getClassify()
        .then(result => {
          setTimeout(() => {
            this.loading = false
            this.classlist = result.data.result
            this.classlist.map(item => {
              item.color = this.color[parseInt(Math.random() * 10)]
            })
          }, 500)
        })
        .catch(err => {
          console.error(err)
        })
    }
  },
  created() {
    this.getLists()
    this.getClassLists()
  }
}
</script>

<style scoped>
.new-Article-Button {
  float: right;
  margin: 5px;
}
.page-paging {
  float: right;
  margin: 5px;
}
</style>