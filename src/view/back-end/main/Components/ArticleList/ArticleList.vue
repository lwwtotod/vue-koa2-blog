<template>
  <div>
    <Content :style="{padding: '0 16px 16px'}">
      <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>Home</BreadcrumbItem>
        <BreadcrumbItem>Components</BreadcrumbItem>
        <BreadcrumbItem>Layout</BreadcrumbItem>
      </Breadcrumb>
      <Row>
        <Col span="24">
        <div class="new-Article-Button">
          <Button type="primary" shape="circle" icon="md-add"></Button>
        </div>
        </Col>
      </Row>
      <div>
        <Table :loading="loading" :columns="columns" :data="data"></Table>
      </div>
      <div class="page-paging">
        <Page :total="40" size="small" show-elevator show-sizer />
      </div>
    </Content>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '文章标题',
          key: 'name'
        },
        {
          title: '所属分类',
          key: 'age'
        },
        {
          title: '创建时间',
          key: 'date'
        },
        {
          title: '创建人',
          key: 'address'
        },
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
      data: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        },
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
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