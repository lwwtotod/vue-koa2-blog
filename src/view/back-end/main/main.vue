
<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <MenuGroup :title="item.name" v-for="(item,index) in $router.options.routes" v-if='!item.hidden'>
            <MenuItem :name="item.name" v-for="(item,index) in item.children" :index="index" v-if='!item.hidden' :to="item">
            <Icon :type="item.icon"></Icon>
            <span>{{item.name}}</span>
            </MenuItem>
          </MenuGroup>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
          <div class="user-avatar">
            <Poptip width="150" trigger="hover">
              <Avatar>USER</Avatar>
              <div slot="content" class="content">
                <span>编辑信息</span>
                <span>账户注销</span>
              </div>
            </Poptip>

          </div>
        </Header>
        <router-view></router-view>
      </Layout>
    </Layout>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  computed: {
    menuitemClasses: function () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  methods: {
    routerGo(item) {
      console.log(item, 111)
    }
  },
  created() {
    console.log(this.$router.options);

  }
}
</script>
<style scoped lang="stylus">

.layout-con {
  height: 100%;
  width: 100%;
}

.menu-item {
  span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }

  i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
}

.collapsed-menu {
  span {
    width: 0px;
    transition: width 0.2s ease;
  }

  i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
}

.user-avatar {
  float: right;
  margin-right: 20px;

  .content {
    span {
      display: block;
      font-size: 16px;
      text-align: center;
      margin: 4px auto;

      &:hover {
        background: #e4e7ed;
        cursor: pointer;
      }
    }
  }

  &:hover {
    cursor: pointer;
  }
}
</style>