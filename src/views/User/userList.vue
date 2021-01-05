<template>
  <div>
    <!-- 关键字 -->
    <el-row :gutter="20">
      <el-col :span="2"><div class="keyWord">关键字：</div></el-col>
      <el-col :span="3">
        <SelectVue :selectItem="selectItem"></SelectVue>
      </el-col>
      <el-col :span="3"
        ><el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="6"
        ><el-button type="danger" style="width:80px" size="mini"
          >搜索</el-button
        ></el-col
      >
      <el-col :span="10"
        ><el-button
          type="danger"
          style="width:80px"
          size="mini"
          @click="addUser()"
          >新增</el-button
        ></el-col
      >
    </el-row>

    <!-- 表格 -->
    <Table :configTable="configTable" ref="tables">
      <template v-slot:status="slotData">
        <el-switch
          @change="switchChange(slotData, $event)"
          v-model="slotData.data.status"
          inactive-value="1"
          active-value="2"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
        {{ slotData.data.status }}
      </template>
      <template v-slot:operation="slotData">
        <el-button type="danger" @click="deleteBtn(slotData.data)" size="mini"
          >删除</el-button
        >
        <el-button type="success" @click="editBtn(slotData.data)" size="mini"
          >编辑</el-button
        >
      </template>
    </Table>

    <!-- 批量删除按钮 -->
    <div>
      <el-button
        class="pull-left"
        style="margin-top: 30px;"
        @click="deleteAll()"
        >批量删除</el-button
      >
      <el-pagination
        class="pull-right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        style="margin-top: 30px"
      >
      </el-pagination>
    </div>
    <Dialog
      ref="addDialog"
      @getTableList="getTableList"
      :userEdit="userEdit"
    ></Dialog>
  </div>
</template>

<script>
import SelectVue from "../../components/selecti";
import Table from "../../components/table";
import tableLoadData from "../../mixins/globaljs";
import Dialog from "./dialog";
import { deleteUser, postFormAPI, userActive } from "../../api/api";
export default {
  name: "UserList",
  mixins: [tableLoadData],
  data() {
    return {
      input: "",
      currentPage: 0,
      // name:"11111111111111",
      selectItem: ["name", "number"],
      statuss: [],
      userEdit: {},
      configTable: {
        tSelection: true,
        // 表头
        thead: [
          {
            label: "邮箱/用户名",
            field: "username",
            width: 180
          },
          {
            label: "真实姓名",
            field: "truename",
            width: 200
          },
          {
            label: "手机号",
            field: "phone",
            width: 200
          },
          {
            label: "地区",
            field: "region",
            width: 200
          },
          {
            label: "角色",
            field: "role",
            width: 200
          },
          {
            label: "禁启用状态",
            field: "status",
            width: 200,
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            width: 200,
            columnType: "slot",
            slotName: "operation"
          }
        ]
      }
    };
  },
  props: {},
  components: { SelectVue, Table, Dialog },
  watch: {},
  computed: {
    userList() {
      return this.$store.state.app.userList;
    },
    userId() {
      return this.$store.state.app.userId;
    }
  },
  methods: {
    // 编辑用户
    editBtn(e) {
      console.log(e);
      this.userEdit = Object.assign({}, e);
      this.$nextTick(() => {
        this.$refs.addDialog.title = "编辑用户";
        this.$refs.addDialog.dialogVisible = true;
      });
    },
    // 禁启用状态
    switchChange(params, e) {
      console.log(params);
      let data = {
        id: params.data.id,
        status: e
      };
      postFormAPI(userActive, data)
        .then((res) => {
          if (res.data.resCode == 0) {
            this.$message.success("修改状态成功!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 批量删除
    deleteAll() {
      if (this.userId.length == 0) {
        this.$message.error("请勾选角色");
        return false;
      } else {
        this.$confirm("确定删除所选角色?", "提示", {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            let data = {
              id: this.userId
            };
            postFormAPI(deleteUser, data)
              .then((res) => {
                console.log(res);
                if (res.data.resCode == 0) {
                  this.$message.success("删除成功!");
                  this.getTableList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((action) => {});
      }
    },
    // 获取列表
    getTableList() {
      this.$refs.tables.getUserLists();
    },
    // getMounted() {
    //   let arr = this.userList.map((item) => {
    //     return item.status;
    //   });
    //   this.statuss = arr;
    // },
    // 新增用户
    addUser() {
      this.$nextTick(() => {
        this.$refs.addDialog.dialogVisible = true;
        this.$refs.addDialog.title = "新增用户";
      });
    },
    // 删除用户
    deleteBtn(data) {
      this.$confirm("确定删除该角色?", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          let id = data.id.split(",");

          let datas = {
            id: id
          };
          postFormAPI(deleteUser, datas)
            .then((res) => {
              console.log(res);
              if (res.data.resCode == 0) {
                this.$message.success("删除成功!");
                this.getTableList();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((action) => {});
    },
    // 
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {},
  mounted() {
    // console.log(this.name);
    // this.getMounted();
  }
};
</script>
<style lang="scss" scoped>
.el-col.el-col-2 {
  width: 90px;
}
.keyWord {
  line-height: 40px;
  height: 40px;
}
</style>
<style>
.el-table td,
.el-table th {
  text-align: center;
}
</style>
