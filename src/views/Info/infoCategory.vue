<template>
  <div class="category-wrapper">
    <el-button type="danger" class="" @click="addFirst()"
      >添加一级分类</el-button
    >
    <div class="line" style="margin-left: -30px;margin-right: -30px;" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category" v-for="(item, index) in category" :key="index">
            <h4>
              <span class="iconfont icon-jian"></span> {{ item.category_name }}
              <div class="button-grop">
                <el-button
                  type="warning"
                  round
                  size="mini"
                  @click="editCategory(item.id, item.category_name)"
                  >编辑</el-button
                >
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="addChildren(item)"
                  >添加子级</el-button
                >
                <el-button
                  type="danger"
                  round
                  size="mini"
                  @click="deleteCategoryConfirm(item.id)"
                  >删除</el-button
                >
              </div>
            </h4>

            <ul v-if="item.children">
              <li v-for="(items, indexs) in item.children" :key="indexs">
                {{ items.category_name }}
                <div class="button-grop">
                  <el-button
                    type="warning"
                    round
                    size="mini"
                    @click="editChildren(items)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    round
                    size="mini"
                    @click="deleteChildren(items.id)"
                    >删除</el-button
                  >
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="category-edit">
            <h4>一级分类编辑</h4>
            <el-form>
              <el-form-item label="一级分类名称 :" v-if="category_first">
                <el-input
                  :disabled="disabled"
                  style="width:255px"
                  v-model="form.categoryName"
                ></el-input>
              </el-form-item>
              <el-form-item label="二级分类名称 :" v-if="category_second">
                <el-input
                  :disabled="disabled"
                  style="width:255px"
                  v-model="form.secCategoryName"
                ></el-input>
              </el-form-item>

              <el-button
                type="danger"
                size="mini"
                @click="submit()"
                :loading="submit_loading"
                >{{ confirmBtn }}</el-button
              >
              <!-- <el-button
                v-if="showEditBtn"
                type="danger"
                size="mini"
                @click="editSubmit()"
                :loading="submit_loading"
                >修改</el-button
              > -->
            </el-form>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  addFirstCategory,
  postFormAPI,
  deleteCategory,
  editCategory,
  addChild
} from "../../api/api";
export default {
  name: "InfoCategory",
  data() {
    return {
      noDisplay: false,
      submit_loading: false,
      category_first: true,
      category_second: true,
      form: {
        categoryName: "",
        secCategoryName: ""
      },
      // category: [],
      categoryId: [],
      deleteId: "",
      disabled: true,
      submit_button_type: "",
      editId: "",
      confirmBtn: "确定",
      childrenData: {},
      editChild: {}
    };
  },
  props: {},
  components: {},
  watch: {},
  computed: {
    category: {
      get() {
        return this.$store.state.app.category;
      },
      set() {}
    }
  },
  methods: {
    // 编辑子级
    editChildren(e) {
      console.log(e);
      let data = {
        id: e.id,
        categoryName: e.category_name
      };
      this.editChild = data;
      this.form.secCategoryName = e.category_name;
      this.category_first = false;
      this.category_second = true;
      this.disabled = false;
      this.confirmBtn = "修改子级";
    },
    // 修改子级按钮
    editChildBtn() {
      let data = {
        categoryName: this.form.secCategoryName,
        id: this.editChild.id
      };
      postFormAPI(editCategory, data)
        .then((res) => {
          console.log(res);
          this.$store.commit("app/getCategoryAll");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 删除子级
    deleteChildren(e) {
      console.log(e);
      let data = {
        categoryId: e
      };

      this.$confirm("此操作将永久删除该子级分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$message.success("删除成功");
        postFormAPI(deleteCategory, data).then((res) => {
          this.$store.commit("app/getCategoryAll");
        });
      });
    },
    // 添加子级
    addChildren(e) {
      this.category_first = false;
      this.category_second = true;
      this.disabled = false;
      this.confirmBtn = "添加子级";
      let data = {
        categoryName: e.category_name,
        parentId: e.id
      };
      this.childrenData = data;
    },
    // 确认添加子级
    addChildrenConfirm() {
      let data = {
        categoryName: this.form.secCategoryName,
        parentId: this.childrenData.parentId
      };
      postFormAPI(addChild, data).then((res) => {
        console.log(res);
        this.$message.success(res.data.message);
      });
    },
    // 添加分类
    submit() {
      // 按钮是确定
      if (this.confirmBtn == "确定") {
        if (this.form.categoryName == "") {
          this.$message.error("不能为空");
        }
        this.submit_loading = true;
        let data = {
          categoryName: this.form.categoryName
        };
        postFormAPI(addFirstCategory, data)
          .then((res) => {
            if (res.data.resCode == 0) {
              this.$message.success(res.data.message);

              this.form.categoryName = "";
              this.category.push(res.data.data);
              this.submit_loading = false;
              console.log(this.submit_button_type);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.confirmBtn == "修改") {
        this.editCategoryFirst();
      } else if (this.confirmBtn == "添加子级") {
        this.addChildrenConfirm();
        this.$store.commit("app/getCategoryAll");
      } else if (this.confirmBtn == "修改子级") {
        this.editChildBtn();
      }
    },
    // 编辑提交
    editSubmit() {
      this.form.categoryName = "";
      this.disabled = true;
      this.category_second = true;
      this.category_first = true;
    },
    //编辑分类
    editCategoryFirst() {
      // eslint-disable-next-line no-constant-condition
      if (this.form.categoryName.length == 0) {
        this.$message.error("未选择分类");
        return false;
      } else {
        let data = {
          id: this.editId,
          categoryName: this.form.categoryName
        };
        postFormAPI(editCategory, data)
          .then((res) => {
            let ress = res.data.data.data;
            this.$message.success(res.data.message);
            let data = this.category.filter((item) => item.id == this.editId);
            console.log(data);
            data[0].category_name = ress.categoryName;
            this.editSubmit();
          })
          .catch((err) => {});
      }
    },
    // 添加分类
    addFirst() {
      this.category_second = false;
      this.disabled = false;
      this.form.categoryName = "";
      this.category_first = true;
      this.confirmBtn = "确定";
    },

    // 删除分类确认
    deleteCategoryConfirm(id) {
      this.deleteCategory(id);
    },
    // 删除分类
    deleteCategory(id) {
      this.deleteId = id;
      let data = {
        categoryId: id
      };

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          postFormAPI(deleteCategory, data).then((res) => {
            let index = this.category.filter(
              (item) => item.id == this.deleteId
            );
            console.log(index);
            // this.category.push(index);
            // this.category = index;
            this.category.splice(index, 1);
            // this.$forceUpdate()
            // this.$store.commit("app/getCategoryAll");
            // location.reload();
          });

          // location.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改分类
    editCategory(id, category_name) {
      // this.showEditBtn = true;
      // this.showConfirmBtn = false;
      this.editId = id;
      this.disabled = false;
      this.category_second = false;
      this.category_first = true;
      this.form.categoryName = category_name;
      this.submit_button_type = "edit";
      this.confirmBtn = "修改";
    }
  },
  created() {},
  mounted() {
    this.$store.commit("app/getCategoryAll");
  }
};
</script>
<style lang="scss" scoped>
.category-wrapper {
  .line {
    margin-top: 30px;
    border-bottom: 1px solid #ccc;
  }
  .category {
    line-height: 44px;
    position: relative;

    h4 {
      background-color: rgb(244, 243, 244);
      padding-left: 10px;
      position: relative;
      &:hover .button-grop {
        opacity: 1;
        transition: all 0.5s linear;
      }
      .button-grop {
        transition: all 0.5s linear;
        opacity: 0;
        position: absolute;
        right: 11px;
        top: 0;
        .el-button {
          width: 70px;
          height: 30px;
          line-height: 10px;
          padding-left: 0;
          padding-right: 0;
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
    ul {
      li {
        margin-left: 20px;
        list-style-type: decimal;
        position: relative;
        &:hover .button-grop {
          opacity: 1;
          transition: all 0.5s linear;
        }
        .button-grop {
          transition: all 0.5s linear;

          opacity: 0;
          position: absolute;
          right: 11px;
          top: 0;
          .el-button {
            width: 70px;
            height: 30px;
            line-height: 10px;
            padding-left: 0;
            padding-right: 0;
            font-size: 14px;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .category-edit {
    margin-top: 20px;
    line-height: 44px;
    position: relative;
    h4 {
      background-color: rgb(244, 243, 244);
    }
    .el-button {
      position: absolute;
      left: 5.5vw;
    }
  }
}
</style>
