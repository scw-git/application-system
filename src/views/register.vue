<template>
  <div class="register">
    <div class="register-from">
      <el-button type="text" @click="()=>this.$router.push('login')" class="el-icon-back">返回</el-button>
      <h2 class="title">考生注册</h2>
      <el-tabs v-model="activeName" @tab-click="changeRegister">
        <el-tab-pane label="手机号注册" name="phoneRegister">
          <el-form ref="phoneRegister" :model="phoneRegister" :rules="rules">
            <el-form-item prop="phone">
              <el-input v-model="phoneRegister.phone" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item prop="name">
              <el-input v-model="phoneRegister.name" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item prop="certificateType">
              <el-select v-model="phoneRegister.certificateType" placeholder="请选择证件类型">
                <el-option
                  v-for="item in certificateOptions"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="certificateNum">
              <el-input v-model="phoneRegister.certificateNum" placeholder="请输入证件号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                style="width:57%;"
                type="password"
                v-model="phoneRegister.password"
                placeholder="请输入密码"
              ></el-input>
              <div class="notice">密码格式为：由大写字母、小写字母、数字、特殊字符中至少3种组成8~20位的字符串</div>
            </el-form-item>
            <el-form-item prop="confirPassword">
              <el-input
                type="password"
                v-model="phoneRegister.confirPassword"
                placeholder="请重新输入密码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                v-model="phoneRegister.code"
                @keydown.enter.native="handlePhoneRegister"
                placeholder="请输入验证码"
              >
                <el-button v-if="show" @click="getCode" slot="append">获取手机验证码</el-button>
                <el-button disabled v-else slot="append">重发验证码 ({{time}} s)</el-button>
              </el-input>
            </el-form-item>

            <el-form-item style="width:100%;">
              <el-button
                :loading="loading"
                size="medium"
                type="primary"
                style="width:100%;"
                @click.native.prevent="handlePhoneRegister"
              >
                <span v-if="!loading">注册</span>
                <span v-else>注 册 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="邮箱注册" name="emailRegister">邮箱注册</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { validatePhone, validateId } from "@/utils/validator";
export default {
  data() {
    let validatePw1 = (rule, value, callback) => {
      const reg = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\\W_]+$)(?![a-z0-9]+$)(?![a-z\\W_]+$)(?![0-9\\W_]+$)[a-zA-Z0-9\\W_]{8,20}$/;
      if (value === "") {
        callback("密码不能为空！");
      } else if (!reg.test(value)) {
        callback("密码规则不正确！");
      } else {
        if (this.phoneRegister.confirPassword != "") {
          this.$refs.phoneRegister.validateField("confirPassword");
        }
        callback();
      }
    };
    let validatePw2 = (rule, value, callback) => {
      if (value === "") {
        callback("请再次输入密码");
      } else if (value !== this.phoneRegister.password) {
        callback("两次输入密码不一致");
      } else {
        callback();
      }
    };

    return {
      loading: false,
      show: true,
      time: 5,
      activeName: "phoneRegister",
      certificateOptions: [
        { value: 1, name: "居民身份证/社保卡" },
        { value: 2, name: "军官证/士兵证" },
        { value: 3, name: "护照" },
        { value: 4, name: "外国人永久居留证" },
        { value: 5, name: "境外永久居留证" },
        { value: 6, name: "香港居民身份证" },
        { value: 7, name: "澳门居民身份证" },
        { value: 8, name: "台湾居民身份证" }
      ],
      phoneRegister: {
        phone: "",
        name: "",
        certificateType: "",
        certificateNum: "",
        password: "",
        confirPassword: "",
        code: ""
      },
      emailRegister: {},
      rules: {
        phone: [
          // 如果在写一个，会覆盖validator中的
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { required: true, validator: validatePhone, trigger: "blur" }
        ],
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        certificateType: [
          { required: true, message: "请选择证件类型", trigger: "change" }
        ],
        certificateNum: [
          { required: true, validator: validateId, trigger: "blur" }
        ],
        password: [
          {
            min: 8,
            max: 20,
            message: "长度在 8 到 20 个字符",
            trigger: "change"
          },
          { required: true, validator: validatePw1, trigger: "change" }
        ],
        confirPassword: [
          { required: true, validator: validatePw2, trigger: "blur" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      }
    };
  },
  cremoated() {},
  methods: {
    //   获取验证码
    getCode() {
      let tag = true;
      this.$refs.phoneRegister.validateField("phone", () => {
        tag = false;
      });
      if (tag) {
        this.show = false;
        let timer = setInterval(() => {
          if (this.time == 0) {
            clearInterval(timer);
            this.show = true;
            this.time = 5;
          } else {
            this.time--;
          }
        }, 1000);
      }
    },
    changeRegister() {},
    handlePhoneRegister() {
      this.$refs.phoneRegister.validate(valid => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.$message.success("注册成功");
            this.$router.push("login");
          }, 2000);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/img/login_bg.jpg");
  background-size: cover;

  .register-from {
    border-radius: 6px;
    background: #ffffff;
    width: 470px;
    padding: 15px 25px 5px 25px;
    .title {
      margin: 0px auto 10px auto;
      text-align: center;
      color: #707070;
    }

    .notice {
      width: 40%;
      color: #169bd5;
      height: 40px;
      float: right;
      font-size: 10px;
      line-height: 14px;
      //   color: #409eff;
      //   word-break: break-all;
      //   -webkit-line-clamp: 2;
      //   -webkit-box-orient: vertical;
      //   overflow: hidden;
    }
  }
}
</style>