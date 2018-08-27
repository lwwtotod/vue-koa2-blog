<template>
  <div>
    <Content :style="{padding: '0 16px 16px'}">
      <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Class</BreadcrumbItem>
        <BreadcrumbItem>Class List</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col span="24">
        <div class="new-Article-Button">
          <Button type="primary"
                  shape="circle"
                  icon="md-add"
                  @click="update()"></Button>
        </div>
        </Col>
      </Row>
      <div>
        <Modal v-model="addModel"
               :title="formTitle"
               @on-ok="ok"
               @on-cancel="cancel">
          <Input v-model="classifyInf.classify"
                 placeholder="Enter something..."
                 style="width: 300px" />
        </Modal>
        <Table :loading="loading"
               :columns="columns"
               :data="classlist"></Table>
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
      formTitle: '',
      addModel: false,
      isInpue: false,
      loading: false,
      classifyInf: {
        id: 0,
        classify: ''
      },
      columns: [
        {
          title: '分类名称',
          key: 'name',
          render: (h, params) => {
            if (this.isInpue) {
              return h('Input', {
                props: {
                  value: params.row.name
                },
                style: {
                  width: '300px'
                },
                on: {
                  inpue: val => {
                    params.row.name = val
                  }
                }
              })
            } else {
              return h(
                'span',
                {
                  style: {
                    width: '300px'
                  }
                },
                params.row.name
              )
            }
          }
        },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 100,
          render: (h, params) => {
            return h('div', [
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
                    this.update(params)
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
                on: {
                  click: () => {
                    this.remove(params)
                  }
                }
              })
            ])
          }
        }
      ],
      classlist: []
    }
  },
  methods: {
    getLists() {
      this.loading = true
      api
        .getClassify()
        .then(result => {
          setTimeout(() => {
            this.loading = false
            this.classlist = result.data.result
          }, 500)
        })
        .catch(err => {
          console.error(err)
        })
    },
    update(params) {
      this.addModel = true
      if (!params) {
        this.classifyInf.classify = ''
        this.formTitle = '新增分类'
      } else {
        this.formTitle = '编辑分类'
        this.classifyInf.classify = params.row.name
        this.classifyInf.id = params.row.id
      }
    },
    ok() {
      if (this.formTitle === '新增分类') {
        api
          .addClassify({
            name: this.classifyInf.classify
          })
          .then(res => {
            if (res.data.success) {
              this.$Message.success('新增分类成功')
            } else {
              this.$Message.error('新增分类失败了')
            }
            this.getLists()
          })
          .catch(err => {
            this.$Message.error('新增分类失败了')
          })
      } else {
        api
          .editClassfy({
            id: this.classifyInf.id,
            name: this.classifyInf.classify
          })
          .then(res => {
            if (res.data.success) {
              this.$Message.success('编辑分类成功')
            } else {
              this.$Message.error('编辑分类失败了')
            }
            this.getLists()
          })
          .catch(err => {
            this.$Message.error('编辑分类失败了')
          })
      }
    },
    cancel() {
      this.$Message.info('取消添加')
    },
    remove(params) {
      api
        .removeClassifyList({ id: params.row.id })
        .then(res => {
          if (res.data.success) {
            this.$Message.success('删除分类成功')
          } else {
            this.$Message.error('删除分类失败')
          }
          this.getLists()
        })
        .catch(err => {
          // 这里可以跳转到错误页面
        })
    }
  },
  created() {
    this.getLists()
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