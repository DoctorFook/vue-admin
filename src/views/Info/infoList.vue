<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-row :gutter="10">
        <el-col :span="5">
          <el-form-item label="分类:">
            <el-select
              v-model="value"
              placeholder="请选择"
              @change="changeCategory"
            >
              <el-option
                v-for="item in category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="日期:">
            <el-date-picker
              v-model="value2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy年MM月dd日"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label="关键字:">
            <el-select v-model="key" style="width:115px">
              <el-option
                v-for="item in keyWord"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="3">
          <el-input placeholder="请输入内容" v-model="input"></el-input>
        </el-col>

        <el-col :span="1">
          <el-button
            size="small"
            type="danger"
            class="searchBtn"
            @click="search()"
            >搜索</el-button
          >
        </el-col>
        <el-col :span="1">
          <el-button
            size="small"
            type="danger"
            class="searchBtn newAdd"
            @click="add()"
            >新增</el-button
          >
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        style="width: 100%"
        border
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45"> </el-table-column>

        <el-table-column prop="title" label="标题" width="800">
        </el-table-column>
        <el-table-column
          prop="id"
          label="类别"
          width="130"
          :formatter="toCategory"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="日期"
          width="237"
          :formatter="toData"
        >
        </el-table-column>
        <el-table-column prop="user" label="管理人" width="115">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-row style="margin-top:30px">
        <el-col :span="12">
          <el-button @click="deleteAll" :disabled="disabled"
            >批量删除</el-button
          >
        </el-col>
        <el-col :span="12">
          <el-pagination
            class="pull-right"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            background
            :page-sizes="[10, 20, 50, 100]"
            layout="total,sizes,prev, pager, next,jumper"
            :total="total"
          >
          </el-pagination>
        </el-col>
      </el-row>
      <Dialog ref="dialog" :category="category" @getList="getList"></Dialog>
    </el-form>
  </div>
</template>

<script>
import { postFormAPI, getList, deleteInfo, editInfo } from "../../api/api";
// import { postFormAPI, getCategory } from "../../api/api";
// import { getCategoryAll } from "../Info/infoCategory";
import Dialog from "./dialog";
// eslint-disable-next-line no-unused-vars
// import unixTimeToDateTime from "../../utils/formatData";
// import { getCategoryAll, category } from "../../utils/global";
export default {
  name: "InfoList",
  data() {
    return {
      tableData: [],
      timeDefaultShow: "",
      input: "",
      rowEdit: {},
      total: 0,
      disabled: true,
      keyWord: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "title",
          label: "标题"
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      key: "id",
      value: "",
      value1: "",
      value2: "",
      multipleSelection: [],
      page: {
        pageNumber: 1,
        pageSize: 10
      }
    };
  },
  props: {},
  components: { Dialog },
  watch: {
    category(newValue) {
      // console.log(newValue);
    }
  },
  computed: {
    category() {
      return this.$store.state.app.category;
    }
  },
  methods: {
    search() {
      console.log(this.value); //id
      console.log(this.value2); //time
      console.log(this.key); //title/id
      console.log(this.input); //word
      let data = {
        categoryId: this.value,
        startTiem: this.value2[0],
        endTime: this.value2[1],
        title: this.input,
        id: "",
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      this.getList(data);
    },
    getList(searchData) {
      if (this.input != 0) {
        postFormAPI(getList, searchData).then((res) => {
          // console.log(res.data.data.data);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        });
      } else {
        let data = {
          categoryId: "",
          startTiem: "",
          endTime: "",
          title: "",
          id: "",
          pageNumber: this.page.pageNumber,
          pageSize: this.page.pageSize
        };
        postFormAPI(getList, data).then((res) => {
          // console.log(res.data.data.data);
          this.tableData = res.data.data.data;
          this.total = res.data.data.total;
        });
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val) {
        this.disabled = false;
      }
      // console.log(val);
    },
    changeCategory(e) {
      console.log(e);
    },
    // 编辑
    handleEdit(index, row) {
      console.log(index, row);
      let edit = "编辑";
      this.dialogVisible(edit);
      this.$store.commit("app/sendRow", row);
    },
    // 删除
    handleDelete(index, row) {
      console.log(index);
      console.log(row);
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            id: [row.id]
          };
          postFormAPI(deleteInfo, data).then((res) => {
            console.log(res);
            // this.$message({
            //   type: "success",
            //   message: "删除成功!"
            // });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 全部删除
    deleteAll() {
      this.$confirm("此操作将永久删除这些信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(this.multipleSelection[0].id);
          let id = this.multipleSelection.map((item) => {
            return item.id;
          });
          this.multipleSelection = id;
          console.log(id);
          let data = {
            id: this.multipleSelection
          };
          postFormAPI(deleteInfo, data).then((res) => {
            console.log(res);
            // this.$message({
            //   type: "success",
            //   message: "删除成功!"
            // });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 改变页码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page.pageSize = val;
      this.getList();
    },
    // 改变页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page.pageNumber = val;
      this.getList();
    },
    add() {
      let add = "新增";
      this.dialogVisible(add);
    },
    dialogVisible(edit, row) {
      this.$nextTick(() => {
        this.$refs.dialog.dialogVisible = true;
        this.$refs.dialog.dialogTitle = edit;
        this.$refs.dialog.editRow = row;
      });
    },

    toData(row) {
      return this.unixTimeToDateTime(row.createDate);
    },
    toCategory(row) {
      let categoryId = row.categoryId;
      let categoryIds = this.category.filter(
        (item) => item.id == categoryId
      )[0];
      return categoryIds.category_name;
    }
  },
  created() {},
  mounted() {
    this.$store.commit("app/getCategoryAll");
    this.getList();
  }
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.searchBtn {
  padding: 8px 30px;
}
.newAdd {
  margin-left: 100px;
}
</style>
<style>
.el-table td,
.el-table th {
  text-align: center;
}
.el-table .cell {
  color: black;
}
</style>
