<template>
  <div class="head-wrap">头部</div>
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
  @import "../../../styles/main.scss";
.head-wrap{
  position: fixed;
  top: 0;
  left: $navMenu ;
  height: 75px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 3px  16px 0 rgba(0, 0, 0, .2);
}
</style>
