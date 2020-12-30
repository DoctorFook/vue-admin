<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog
      @open="open"
      :append-to-body="true"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      @close="close"
    >
      <el-form-item label="类型:">
        <el-select v-model="value" placeholder="请选择" @change="event($event)">
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题:">
        <el-input
          placeholder="请输入内容"
          v-model="input"
          style="width:480px"
        ></el-input>
      </el-form-item>

      <el-form-item label="概况:">
        <el-input
          style="width:480px"
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="textarea"
        >
        </el-input>
      </el-form-item>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button size="small" type="danger" @click="submit()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postFormAPI, addInfo, editInfo } from "../../api/api";
export default {
  name: "",
  data() {
    return {
      dialogTitle: "新增",
      input: "",
      value: "",
      textarea: "",
      dialogVisible: false,
      createDate: "2020年12月16日20:09:21",
      type: [],
      categoryId: "",
      editRow: {}
    };
  },
  props: {
    category: {
      type: Array
    }
  },
  components: {},
  watch: {},
  computed: {},
  methods: {
    close() {},
    open() {
      this.editRow = this.$store.state.app.editRow;
      // this.value = this.editRow.categoryname
      this.input = this.editRow.title;
      this.textarea = this.editRow.content;
      // this.value = this.editRow.categoryId;
    },
    submit() {
      this.dialogVisible = false;
      if (this.dialogTitle == "新增") {
        let data = {
          categoryId: Number(this.categoryId),
          title: this.input,
          imgUrl: this.createDate,
          createDate: this.createDate,
          status: 1,
          content: this.textarea
        };

        postFormAPI(addInfo, data).then((res) => {
          console.log(res);
          this.$message.success(res.data.message);
        this.$emit("getList");
        });
      } else {
        let data = {
          id: this.editRow.id,
          categoryId: this.editRow.categoryId,
          title: this.editRow.title,
          updateDate: this.editRow.updateDate,
          content: this.editRow.content,
          imgUrl: this.editRow.imgUrl
        };

        console.log(this.editRow);
        postFormAPI(editInfo, data).then((res) => {
          console.log(res.data.message);
          this.$message.success(res.data.message);
        this.$emit("getList");
        });
      }
    },

    event(e) {
      this.categoryId = e;
      console.log(Number(this.categoryId));
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
.el-dialog__footer {
  text-align: center;
  button {
    width: 6.208vw;
  }
}
</style>
