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
          <Button type="primary" shape="circle" icon="md-add"></Button>
        </div>
        </Col>
      </Row>
      <div>
        <Table :loading="loading" :columns="columns" :data="classlist"></Table>
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
          title: '分类名称',
          key: 'name'
        },
        // {
        //   title: '创建时间',
        //   key: 'date'
        // },
        // {
        //   title: '创建人',
        //   key: 'address'
        // },
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'success',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
              }, 'View'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
              }, 'Edit'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, 'Delete')
            ]);
          }
        }
      ],
      classlist: []
    }
  },
  methods: {
    getLists() {
      this.listLoading = true;
      api.getClassify()
        .then(result => {
          setTimeout(() => {
            this.listLoading = false;
            this.classlist = result.data.result;
          }, 500);
        })
        .catch(err => {
          console.error(err)
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