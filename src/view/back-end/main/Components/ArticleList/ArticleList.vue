<template>
  <div>
    <Content :style="{padding: '0 16px 16px'}">
      <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Article</BreadcrumbItem>
        <BreadcrumbItem>Article List</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col span="24">
        <div class="new-Article-Button">
          <Button type="primary" shape="circle" icon="md-add" to="/admin/articleCreate"></Button>
        </div>
        </Col>
      </Row>
      <div>
        <Table :loading="loading" :columns="columns" :data="articleLists"></Table>
      </div>
      <div class="page-paging">
        <Page :total="40" size="small" show-elevator show-sizer />
      </div>
    </Content>
  </div>
</template>

<script>
import api from "@/api"
export default {
  data() {
    return {
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
                  icon:'md-eye',
                  type: 'success',
                  size: 'small',
                  shape:'circle'
                },
                style: {
                  marginRight: '10px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: `/article/${params.row.id}` });
                  }
                }
              },),
              h('Button', {
                props: {
                  icon:'md-brush',
                  type: 'primary',
                  size: 'small',
                  shape:'circle'
                },
                style: {
                  marginRight: '10px'
                },
                on:{
                  click: () => {
                    this.$router.push({ path: `/admin/articleEdit/${params.row.id}` });
                  }
                }
              }, ),
              h('Button', {
                props: {
                  icon:'md-close',
                  type: 'error',
                  size: 'small',
                  shape:'circle'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, )
            ]);
          }
        }
      ],
      articleLists: []
    }
  },
  methods: {
    getLists() {
      this.loading = true;
      api.getArticleList()
        .then(res => {
          if (res.data.success) {
            this.articleLists = res.data.result;
          } else {
            console.error(res);
          }
          this.loading = false;
        })
        .catch(err => {
          console.error(err)
          this.loading = false;
        });
    },
  },
  created() {
    this.getLists();
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