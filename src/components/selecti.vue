<template>
  <div>
    <el-select v-model="value" placeholder="请选择" @change="change($event)">
      <el-option
        v-for="item in currentOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      currentOptions: [],
      options: [
        {
          value: "number",
          label: "手机号"
        },
        {
          value: "name",
          label: "姓名"
        },
        {
          value: "email",
          label: "邮箱"
        }
      ],
      value: "name"
    };
  },
  props: {
    selectItem: {
      type: Array
    }
  },
  components: {},
  watch: {
    selectItem(newValue) {
      console.log(newValue, "11");
    }
  },
  computed: {},
  methods: {
    change(e) {
      console.log(e);
    },
    iniOption() {
      let initData = this.selectItem;
    //   console.log(initData);
      let optionArr = [];
      if (initData.length == 0) return false;
      initData.forEach((item) => {
        let arr = this.options.filter((elem) => elem.value == item);
        optionArr.push(arr[0]);
      });
    //   console.log(optionArr);
      this.currentOptions = optionArr;
    }
  },
  created() {},
  mounted() {
    this.iniOption();
  }
};
</script>
<style lang="scss" scoped></style>
