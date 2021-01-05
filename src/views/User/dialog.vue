<template>
  <div>
    <el-dialog
      @open="openDialog()"
      @close="closeDialog()"
      :title="title"
      :visible.sync="dialogVisible"
      width="600px"
      :modal-append-to-body="false"
    >
      <el-form :model="form">
        <el-form-item
          label="用户名:"
          :label-width="formLabelWidth"
          prop="username"
        >
          <el-input
            type="text"
            style="width:180px"
            placeholder="请输入用户名"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码:"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="form.password"
            show-password
            style="width:180px"
            placeholder="请输入6~20位密码"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="真实姓名:"
          :label-width="formLabelWidth"
          prop="truename"
        >
          <el-input
            style="width:180px"
            placeholder="请输入真实姓名"
            v-model="form.truename"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号:"
          :label-width="formLabelWidth"
          prop="phone"
        >
          <el-input
            v-model="form.phone"
            style="width:180px"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="地区:" prop="region" :label-width="formLabelWidth">
          <div class="city">
            <el-row :gutter="10">
              <el-col :span="6">
                <el-select
                  v-model="provinceValue"
                  @change="changeProvince($event)"
                >
                  <el-option
                    v-for="item in province"
                    :key="item.PROVINCE_NAME"
                    :value="item.PROVINCE_CODE"
                    :label="item.PROVINCE_NAME"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="cityValue" @change="changeCity($event)">
                  <el-option
                    v-for="item in city"
                    :key="item.CITY_CODE"
                    :value="item.CITY_CODE"
                    :label="item.CITY_NAME"
                  ></el-option>
                </el-select>
              </el-col>

              <el-col :span="6">
                <el-select v-model="areaValue" @change="changeArea($event)">
                  <el-option
                    v-for="item in area"
                    :key="item.AREA_CODE"
                    :value="item.AREA_CODE"
                    :label="item.AREA_NAME"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <el-select v-model="streetValue" @change="changeStreet($event)">
                  <el-option
                    v-for="item in street"
                    :key="item.STREET_CODE"
                    :value="item.STREET_CODE"
                    :label="item.STREET_NAME"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item
          label="是否启用:"
          prop="status"
          :label-width="formLabelWidth"
        >
          <el-radio v-model="roleStatus" label="1">禁用</el-radio>
          <el-radio v-model="roleStatus" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item
          label="角色:(请双击)"
          prop="role"
          :label-width="formLabelWidth"
        >
          <el-checkbox-group
            v-model="checkList"
            @change="chengeCheckBox($event)"
          >
            <el-checkbox
              v-for="(item, index) in checkLabel"
              :label="item"
              :key="index"
            ></el-checkbox>
            <!-- <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox> -->
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="btn">
          <el-button size="mini" @click="dialogVisible = false">取消</el-button>
          <el-button type="danger" size="mini" @click="submit()"
            >确认</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  cityPicker,
  postFormAPI,
  role,
  addUser,
  userEdit,
  userRole
} from "../../api/api";
export default {
  name: "",
  data() {
    return {
      title: "新增用户",
      dialogVisible: false,
      form: {
        username: "",
        password: "",
        truename: "",
        phone: ""
      },
      formLabelWidth: "120px",
      province: [],
      city: [],
      area: [],
      street: [],
      provinceValue: "",
      cityValue: "",
      areaValue: "",
      streetValue: "",
      resuleData: {
        provinceValue: "",
        cityValue: "",
        areaValue: "",
        streetValue: ""
      },
      roleStatus: "1",
      checkList: [],
      checkLabel: []
    };
  },
  props: {
    userEdit: {
      type: Object
    }
  },
  components: {},
  watch: {
    provinceValue(newValue) {
      console.log(newValue);
    }
  },
  computed: {},
  methods: {
    openDialog() {
      console.log(this.userEdit);
      this.form.username = this.userEdit.username;
      this.form.truename = this.userEdit.truename;
      this.form.password = this.userEdit.password;
      this.form.phone = this.userEdit.phone;
      this.resuleData = this.userEdit.region;
      this.roleStatus = this.userEdit.status;
      this.checkbox = this.userEdit.role;

      postFormAPI(userRole).then(res=>{
        console.log(res);
      })
    },
    clearData() {
      (this.form.username = ""),
        (this.form.truename = ""),
        (this.form.password = ""),
        (this.form.phone = ""),
        (this.resuleData = ""),
        (this.roleStatus = ""),
        (this.checkboxs = "");
    },
    closeDialog() {
      this.clearData();
    },
    submit() {
      // console.log(JSON.parse(JSON.stringify(this.resuleData)));

      let data = {
        username: this.form.username,
        truename: this.form.truename,
        password: this.form.password,
        phone: this.form.phone,
        region: this.resuleData,
        status: this.roleStatus,
        role: this.checkboxs
      };

      if (this.title == "新增用户") {
        postFormAPI(addUser, data)
          .then((res) => {
            console.log(res);
            this.dialogVisible = false;
            this.$emit("getTableList");
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.title == "编辑用户") {
        let data = {
          username: this.form.username,
          password: this.form.password,
          truename: this.form.truename,
          phone: this.form.phone,
          region: this.resuleData,
          status: this.roleStatus,
          role: this.checkboxs
        };
        postFormAPI(userEdit, data)
          .then((res) => {
            console.log(res);
            this.dialogVisible = false;
            this.$emit("getTableList");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    chengeCheckBox(e) {
      let checkboxs = e.splice(0, 3);
      this.checkboxs = checkboxs.toString();
    },
    getRole() {
      postFormAPI(role).then((res) => {
        // console.log(res.data.data);
        res.data.data.map((item) => {
          this.checkList.push(item.role);
          this.checkLabel.push(item.name);
        });
      });
    },
    result() {
      this.resuleData.provinceValue = this.provinceValue;
      this.resuleData.cityValue = this.cityValue;
      this.resuleData.areaValue = this.areaValue;
      this.resuleData.streetValue = this.streetValue;
      console.log(this.resuleData);
    },
    changeProvince(e) {
      // console.log(e);
      this.getCity(e);
      this.cityValue = "";
      this.areaValue = "";
      this.streetValue = "";
      this.result();
    },
    changeCity(e) {
      // console.log(e);
      this.getArea(e);
      this.areaValue = "";
      this.streetValue = "";
      this.result();
    },
    changeArea(e) {
      this.getStreet(e);
      this.streetValue = "";
      this.result();
    },
    changeStreet(e) {
      this.result();
      // let region =;
      // console.log(region);
      // this.regions = region
    },
    // 获取省份列表
    getProvince() {
      postFormAPI(cityPicker, { type: "province" }).then((res) => {
        let data = res.data.data;

        this.province = data.data;
      });
    },
    getCity(e) {
      postFormAPI(cityPicker, {
        type: "city",
        province_code: e
      }).then((res) => {
        this.city = res.data.data.data;
      });
    },
    getArea(e) {
      postFormAPI(cityPicker, {
        type: "area",
        city_code: e
      }).then((res) => {
        this.area = res.data.data.data;
      });
    },
    getStreet(e) {
      postFormAPI(cityPicker, {
        type: "street",
        area_code: e
      }).then((res) => {
        this.street = res.data.data.data;
      });
    }
  },
  created() {},
  mounted() {
    this.getProvince();
    this.getRole();
  }
};
</script>
<style lang="scss" scoped>
.city {
  overflow: hidden;
}
.btn {
  text-align: center;
  .el-button {
    width: 100px;
  }
}
</style>
