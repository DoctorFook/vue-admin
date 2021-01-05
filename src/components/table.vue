<template>
  <div>
    <el-table
      border
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;margin-top: 30px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="configTable.tSelection"
        type="selection"
        width="55"
      >
      </el-table-column>
      <template v-for="(item, index) in tableConfig.thead">
        <el-table-column
          :key="index"
          :label="item.label"
          :prop="item.field"
          :width="item.width"
          v-if="item.columnType"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"> </slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :key="index"
          :label="item.label"
          :prop="item.field"
          :width="item.width"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { getUserList, postFormAPI, getList } from "../api/api";

export default {
  name: "",
  data() {
    return {
      tableConfig: {
        tSelection: true,
        thead: [],
        recordCheckbox: false
      },
      tableData: [],
      multipleSelection: []
    };
  },
  props: {
    configTable: {
      type: Object
    },
    getUserList: {
      type: Object
    }
  },
  components: {},
  watch: {},
  computed: {},
  methods: {
    initTable() {
      // 传过来的数据给了变量tableConfigFromDad
      let tableConfigFromDad = this.configTable;
      // 把上面的数据的key名给了变量keys
      let keys = Object.keys(this.tableConfig);
      // 遍历穿过来的数据
      for (let key in tableConfigFromDad) {
        // 如果子元素的key包含的话,就把父组件传过来的东西给子元素
        if (keys.includes(key)) {
          // console.log(11111);
          this.tableConfig[key] = tableConfigFromDad[key];
        }
      }
      // console.log(keys);
    },
    getUserLists() {
      let data = {
        username: "",
        truename: "",
        phone: "",
        pageNumber: 1,
        pageSize: 10
      };
      postFormAPI(getUserList, data)
        .then((res) => {
          console.log(res.data.data.data);
          this.tableData = res.data.data.data;
          this.dataToDad(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dataToDad(e) {
      this.$emit("dadMethod", e);
    },
    showScope(scope) {
      // console.log(scope);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let id = this.multipleSelection.map((item) => {
        return item.id;
      });
      console.log(id);
      this.$store.commit("app/getUserId", id.map(Number));
    }
  },
  created() {},
  mounted() {
    // console.log(this.configTable.thead);
    this.initTable();
    this.getUserLists();
  }
};
</script>
<style lang="scss" scoped></style>
