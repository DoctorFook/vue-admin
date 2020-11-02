<template>
<div class="wrap">
<Head></Head>
<Main></Main>
<Nav></Nav>
</div>
</template>

<script>
import Head from "./Components/Head";
import Main from "./Components/Main";
import Nav from "./Components/Nav";
export default {
  name: "",
  data() {
    return {};
  },
  props: {},
  components: {
    Head,
    Main,
    Nav
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
 .wrap{
   background-color: rosybrown;
 }
</style>
