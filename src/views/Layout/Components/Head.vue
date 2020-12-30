<template>
  <div class="head-wrap">
    <div class="iconsForHead">
      <span
        class="head-icon iconfont icon-webicon03 menuBtn"
        @click="changeIsCollapse()"
      ></span>
      <div class="name ">
        <img src="@/assets/logo.png" alt="" />
        <div>{{userName}}</div>
      </div>
      <span
        class="head-icon iconfont icon-ai240 closeBtn"
        @click="logout"
      ></span>
    </div>
  </div>
</template>

<script>
import {getUserName} from '../../../utils/saveToken'
export default {
  name: "",
  data() {
    return {
      userName:""
    };
  },
  props: {},
  components: {},
  watch: {},
  computed: {},
  methods: {
    changeIsCollapse() {
      this.$store.commit("Collapse");
    },
    // 登出
    logout() {
      this.$confirm("您确定退出当前用户吗", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          this.$store.commit("login/logout");
          this.$router.push("/login");
          // location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消"
          });
        });
    },
    getUsernameStorage(){
      if(getUserName()){
        this.userName = sessionStorage.getItem("userName");
      }
    }
  },
  created() {},
  mounted() {
    this.getUsernameStorage()
  }
};
</script>
<style lang="scss" scoped>
.head-wrap {
  position: fixed;
  top: 0;
  left: $navMenu;
  height: 75px;
  width: 100%;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.2));
  @include webkit(transition, all 0.3s ease);
}
.close {
  .head-wrap {
    position: fixed;
    top: 0;
    left: 64px;
    height: 75px;
    width: 100%;
    background-color: #fff;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.2));
    @include webkit(transition, all 0.3s ease);
  }
}
.iconsForHead {
  position: relative;
}
.head-icon {
  font-size: 30px;
  line-height: 75px;
  cursor: pointer;
}
.menuBtn {
  position: absolute;
  left: 1.208vw;
}
.closeBtn {
  position: absolute;
  right: 16.417vw;
  border-left: 1px solid #f3f3f3;
  padding-left: 1.121vw;
}
.close {
  .name {
    display: flex;
    align-items: center;
    position: absolute;
    right: 10.417vw;
    line-height: 75px;
    padding-left: 20px;
    div {
      font-size: 16px;
    }
    img {
      display: inline-block;
      width: 30px;
      border-radius: 50%;
      border: 1px solid #f3f3f3;
      margin-right: 10px;
    }
  }
  .closeBtn {
    position: absolute;
    right: 6.417vw;
    border-left: 1px solid #f3f3f3;
    padding-left: 1.121vw;
  }
}
.name {
  display: flex;
  align-items: center;
  position: absolute;
  right: 20.417vw;
  line-height: 75px;
  padding-left: 20px;
  span {
    font-size: 16px;
  }
  img {
    display: inline-block;
    width: 30px;
    border-radius: 50%;
    border: 1px solid #f3f3f3;
    margin-right: 10px;
  }
}
</style>
