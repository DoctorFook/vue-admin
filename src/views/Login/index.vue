<template>
  <div class="login">
    <div class="login-wrap">
      <ul class="menu-tap">
        <li
        class="twoBtn"
          @click="change(item, index)"
          :class="{ active: isActive == index }"
          v-for="(item, index) in menutab"
          :key="index"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- form表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        :ref="ruleForms"
        class="demo-ruleForm"
      >
        <el-form-item prop="email" class="labelSize">
          <label>邮箱</label>
          <el-input
            size="medium"
            type="text"
            v-model="ruleForm.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="pass" class="labelSize"
          ><label>密码</label>
          <el-input
            maxlength="20"
            minlength="8"
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="checkPass" class="labelSize" v-if="isActive == 1"
          ><label>重复密码</label>
          <el-input
            maxlength="20"
            minlength="8"
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="labelSize"
          ><label>验证码</label>
          <el-row :gutter="11">
            <el-col :span="14"
              ><el-input v-model.number="ruleForm.code"></el-input
            ></el-col>
            <el-col :span="10"
              ><el-button
                v-show="countDown"
                type="success"
                class="block"
                size="medium"
                @click="getSms()"
                >获取验证码</el-button
              >
              <el-button
                v-show="!countDown"
                type="success"
                class="block"
                :disabled="!countDown"
                size="medium"
                @click="getSms()"
                >{{ count }}秒后刷新</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            class="block"
            type="danger"
            @click="submitForm('ruleForm')"
            :disabled="!ruleForm.code"
            >{{ isActive == 0 ? "登录" : "注册" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import { stripscript, regEmail, regCode, regPassword } from "@utils/validate";
import { getListAPI, postFormAPI, getSms, register, login } from "@/api/api.js";
export default {
  name: "",
  setup() {},
  data() {
    var validateEmail = (rule, value, callback) => {
      this.ruleForm.Emails = stripscript(value);
      value = this.ruleForm.Emails;
      if (value === "") {
        callback(new Error("请输入邮箱/用户名"));
      } else if (regEmail(value)) {
        callback(new Error("请输入正确邮箱格式"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      this.ruleForm.pass = stripscript(value);
      value = this.ruleForm.pass;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (regPassword(value)) {
        callback(new Error("请输入8-20位数字+字母(至少1位大写字母)"));
      } else {
        callback();
      }
    };
    var validatecheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkCode = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入验证码"));
      } else if (regCode(value)) {
        callback(new Error("请输入正确验证码格式"));
      } else {
        callback();
      }
    };
    return {
      ruleForms: "ruleForm",
      module: "login",
      yzm: "",
      count: "",
      timer: null,
      // 获取验证码按钮显示与否
      countDown: true,
      isActive: 0,
      menutab: [{ txt: "登录" }, { txt: "注册" }],
      ruleForm: {
        //   邮箱
        email: "",
        // 密码
        pass: "",
        // 验证码
        code: "",
        checkPass: ""
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatecheckPass, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      }
      // 获取接口登录/注册
    };
  },
  props: {},
  components: {},
  watch: {},
  computed: {},
  methods: {
    change(item, index) {
      this.isActive = index;
      this.countDown = true;
      this.resetForm(this.ruleForms);
    },

    //获取验证码
    getSms() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.countDown = false;

        if (this.isActive == 0) {
          this.module = "login";
        } else if (this.isActive == 1) {
          this.module = "register";
        }
        if (regEmail(this.ruleForm.email)) {
          this.$message.error("邮箱格式有误,请重新输入");
          return false;
        }

        let data = {
          username: this.ruleForm.email,
          module: this.module
        };
        postFormAPI(getSms, data)
          .then((res) => {
            if (res) {
              console.log(res);
              setTimeout(() => {
                this.$message.success("验证码已发送");
              }, 2000);
              let message = res.data.message.substr(11, 6);
              this.yzm = message;
              console.log(message);
            } else {
              this.$message.error("请输入邮箱和密码");
              return false;
            }
          })
          .catch((err) => console.log(err));

        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.countDown = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },
    // 点击提交登录注册
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            username: this.ruleForm.email,
            password: sha1(this.ruleForm.pass),
            code: this.yzm
          };
          console.log(data.password);
          if (this.module == "register") {
            this.register(data);
          } else {
            this.login(data);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 注册
    register(data) {
      postFormAPI(register, data)
        .then((res) => {
          console.log(res);
          this.$message.success("注册成功");
        })
        .catch((err) => {});
    },
    // 登录
    login(data) {
      postFormAPI(login, data)
        .then((res) => {
          this.$message.success("登录成功");
          console.log(res);
          this.$router.push({ name: "Layout" });
        })
        .catch((err) => {
          this.$message.success("登录失败");
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {},
  mounted() {}
};
</script>

<style lang="scss" rel=”stylesheet/scss” scoped>
.login {
  width: 100%;
  background-color: #344a5f;
  height: 100vh;
  display: flex;
  justify-content: center;
}
.login-wrap {
  width: 330px;
  margin-top: 100px;
}
.menu-tap {
  text-align: center;
}

.menu-tap li{
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
}
  .el-form-item__label {
    color: white;
  }

.active {
  background-color: rgba(0, 0, 0, 0.1);
  background-color: red;
}
.demo-ruleForm {
  margin-top: 29px;
}
.labelSize label {
  padding-left: 3px;
  display: block;
  color: white;
  font-size: 14px;
}
.block {
  display: block;
  width: 100%;
}
</style>
