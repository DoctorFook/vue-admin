<template>
  <div class="main-wrap">
    <router-view />
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
  position: fixed;
  top: 75px;
  left: $navMenu;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  border: 30px solid #f7f7f7;
  border-bottom: none;
}
</style>
