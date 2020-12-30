<template>
  <div>
    <el-form>
      <el-form-item>
        信息分类112d233222:
        <el-select v-model="infoDetail.categoryId" placeholder="请选择分类">
          <el-option
            v-for="item in category"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        >新闻标题:<el-input v-model="infoDetail.title" style="width: 280px"
      /></el-form-item>
      <el-form-item
        >缩略图：
        <el-upload
          class="avatar-uploader"
          action="http://up-z2.qiniup.com"
          :data="qiniuToken"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item
        >发布日期：
        <el-date-picker
          v-model="time"
          type="datetime"
          placeholder="选择日期时间"
          @change="timeChange($event)"
        >
        </el-date-picker
      ></el-form-item>
      <el-form-item
        >内容:
        <quill-editor
          ref="myQuillEditor"
          v-model="infoDetail.content"
          :options="editorOption"
        />
      </el-form-item>

      <el-form-item> <button @click="edit()">修改</button></el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postFormAPI, editInfo, qiniuToken } from "../../api/api";
import { addQuillTitle } from "../../utils/quill-title";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "",
  data() {
    return {
      imageUrl: "",
      row: {},
      category: [],
      categoryId: "",
      infoDetail: {},
      time: "",
      editorOption: {},
      qiniuToken: {
        token: "",
        key: ""
      }
    };
  },
  props: {},
  components: { quillEditor },
  watch: {
    time() {
      this.unixTimeToDateTime(this.time);
      console.log(this.time);
    }
  },
  computed: {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      let suffix = file.name;
      let key = encodeURI(`%{suffix}`);
      this.qiniuToken.key = key;
      console.log(this.qiniuToken.key);

      return isJPG && isLt2M;
    },
    getQiNiuToken() {
      let data = {
        ak: "Avh-EZZAa4TxqPQZsEW42fxBUbTMFi-RKSZTRKJj",
        sk: "19AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
        buckety: "webjshtml"
      };
      postFormAPI(qiniuToken, data)
        .then((res) => {
          console.log(res.data.data.token);
          this.qiniuToken.token = res.data.data.token;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    timeChange(e) {
      console.log(e);
    },
    edit() {
      let data = {
        id: this.infoDetail.id,
        categoryId: this.infoDetail.categoryId,
        title: this.infoDetail.title,
        updateDate: this.time,
        content: this.infoDetail.content,
        imgUrl: this.infoDetail.imgUrl
      };

      console.log(this.row);
      postFormAPI(editInfo, data).then((res) => {
        console.log(res.data.message);
        this.$message.success(res.data.message);
        this.$router.push("infoList");
      });
    }
  },
  created() {},
  mounted() {
    let category = sessionStorage.getItem("category");
    this.category = JSON.parse(category);
    console.log(this.category);
    let detail = sessionStorage.getItem("detail");
    this.infoDetail = JSON.parse(detail);
    addQuillTitle();
    this.getQiNiuToken();
  }
};
</script>
<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
