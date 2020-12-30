<template>
  <div class="main-wrap">
    <div class="content"><router-view /></div>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  components: {},
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.main-wrap {
  overflow: auto;
  position: fixed;
  top: 75px;
  left: $navMenu;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  @include webkit(transition, all 0.3s ease);
}
.close {
  .main-wrap {
    position: fixed;
    top: 75px;
    left: 64px;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    border: 30px solid #f7f7f7;
    border-bottom: none;
    @include webkit(transition, all 0.3s ease);
  }
}
.content {
  padding: 30px;
}
</style>
