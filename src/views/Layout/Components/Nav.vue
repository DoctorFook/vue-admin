<template>
  <div class="nav-wrap">
    <img src="../../../assets/vue-logo.png" alt="" />
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      background-color="transparent"
      text-color="#fff"
      active-text-color="yellow"
      @close="handleClose"
      router
      :collapse="isCollapse"
    >
      <template v-for="(item, index) in routers">
        <el-submenu :index="index + ''" v-if="!item.hidden" :key="item.id">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span class="metaName">{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            :index="subItem.path + ''"
            v-for="(subItem, index) in item.children"
            :key="index"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      routers: this.$router.options.routes
    };
  },
  props: {},
  components: {},
  watch: {},
  computed: {
    isCollapse() {
      return this.$store.state.app.isCollapse;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.nav-wrap {
  height: 100vh;
  background-color: #344a5f;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  // transition: all 0.3s ease;
  @include webkit(transition, all 0.3s ease);
}
.nav-wrap img {
  margin-top: 50px;
  width: 40%;
}
.el-menu {
  padding-left: 0;
  width: 250px;
}
.el-menu--collapse {
  width: 3.4vw;
}
.el-submenu__title {
  padding: 0 22px;
  i {
    padding-left: 5px;
  }
}
.metaName {
  margin-left: 5px;
}
.open {
  .nav-wrap {
    width: $navMenu;
  }
}
.close {
  .nav-wrap {
    width: 64px;
  }
}
</style>
