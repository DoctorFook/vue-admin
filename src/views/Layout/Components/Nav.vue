<template>
  <div class="nav-wrap">
     <el-menu
    default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      background-color="transparent"
      text-color="#fff"
      active-text-color="yellow"
      @close="handleClose"
      router

    >
      <template v-for="(item, index) in routers">
        <el-submenu :index="index+''" v-if="!item.hidden" :key="item.id">
          <template slot="title">
            <!-- <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.meta.icon"></use>
              </svg> -->
              <i :class="item.meta.icon"></i>
            <span class="metaName">{{ item.meta.name }}</span>
          </template>
            <el-menu-item
              :index="subItem.path+''"
              v-for="(subItem, index) in item.children"
              :key="subItem.id"
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
  computed: {},
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
/* @import "../../../styles/config.scss"; */
.nav-wrap {
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  position: fixed;
  top: 0;
  left: 0;
  
}
.el-menu {
    padding-left: 0;
  }
  .metaName{
    margin-left: 5px;
  }
</style>
