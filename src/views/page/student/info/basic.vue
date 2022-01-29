<template>
  <div class="basic" v-loading="loading">
    <div class="jbqk frame">
      <div class="frame_title">基本情况：</div>
      <el-form
        class="form"
        label-width="125px"
        ref="ruleForm"
        :rules="rules"
        :model="form"
      >
        <div class="left">
          <el-form-item label="姓名:" prop="name">
            <el-input
              disabled
              placeholder="请输入名字"
              v-model="form.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-select disabled v-model="form.sex" placeholder="请选择">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族:" prop="nation">
            <el-select filterable v-model="form.nation" placeholder="请选择">
              <el-option
                v-for="item in nation"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌:" prop="politics">
            <el-select filterable v-model="form.politics" placeholder="请选择">
              <el-option
                v-for="item in politics"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="身份证号:" prop="certificateNumber">
            <el-input disabled v-model="form.certificateNumber"></el-input>
          </el-form-item>
          <el-form-item label="出生日期:" prop="birthday">
            <el-date-picker
              disabled
              value-format="yyyy-MM-dd"
              v-model="form.birthday"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="婚姻状况:" prop="maritalStatus">
            <el-select
              filterable
              v-model="form.maritalStatus"
              placeholder="请选择"
            >
              <el-option label="未婚" value="未婚"></el-option>
              <el-option label="已婚" value="已婚"></el-option>
              <el-option label="丧偶" value="丧偶"></el-option>
              <el-option label="离婚" value="离婚"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯:" prop="nativePlace">
            <el-input
              placeholder="请输入"
              v-model="form.nativePlace"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="contact frame">
      <div class="frame_title">联系方式：</div>
      <el-form
        ref="ruleForm1"
        class="form"
        label-width="125px"
        :rules="rules"
        :model="form"
      >
        <div class="left">
          <el-form-item label="手机号码:" prop="phoneNumber">
            <el-input
              v-model="form.phoneNumber"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="通讯地址:" prop="address">
            <el-input placeholder="请输入" v-model="form.address"></el-input>

            <!-- <el-cascader
              v-model="form.address"
              :options="nativeData"
            ></el-cascader> -->
          </el-form-item>
        </div>
        <div class="right">
          <el-form-item label="紧急联系人电话:" prop="emergencyPhone">
            <el-input
              v-model="form.emergencyPhone"
              placeholder="请输入手机号码"
            ></el-input>
          </el-form-item>
          <el-form-item label="Email地址:" prop="email">
            <el-input v-model="form.email" placeholder="请输入Email"></el-input>
          </el-form-item></div
      ></el-form>
    </div>
    <div class="next">
      <el-button type="primary" @click="next(1)">上一步</el-button>
      <el-button type="primary" @click="next(2)">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { validatePhone, validateId } from "@/utils/validator.js";
import { regionData } from "element-china-area-data";
import { basic, getBasic } from "@/api/info";
export default {
  data() {
    return {
      loading: false,
      nation: [
        {
          id: "01",
          name: "汉族",
        },
        {
          id: "02",
          name: "蒙古族",
        },
        {
          id: "03",
          name: "回族",
        },
        {
          id: "04",
          name: "藏族",
        },
        {
          id: "05",
          name: "维吾尔族",
        },
        {
          id: "06",
          name: "苗族",
        },
        {
          id: "07",
          name: "彝族",
        },
        {
          id: "08",
          name: "壮族",
        },
        {
          id: "09",
          name: "布依族",
        },
        {
          id: "10",
          name: "朝鲜族",
        },
        {
          id: "11",
          name: "满族",
        },
        {
          id: "12",
          name: "侗族",
        },
        {
          id: "13",
          name: "瑶族",
        },
        {
          id: "14",
          name: "白族",
        },
        {
          id: "15",
          name: "土家族",
        },
        {
          id: "16",
          name: "哈尼族",
        },
        {
          id: "17",
          name: "哈萨克族",
        },
        {
          id: "18",
          name: "傣族",
        },
        {
          id: "19",
          name: "黎族",
        },
        {
          id: "20",
          name: "傈僳族",
        },
        {
          id: "21",
          name: "佤族",
        },
        {
          id: "22",
          name: "畲族",
        },
        {
          id: "23",
          name: "高山族",
        },
        {
          id: "24",
          name: "拉祜族",
        },
        {
          id: "25",
          name: "水族",
        },
        {
          id: "26",
          name: "东乡族",
        },
        {
          id: "27",
          name: "纳西族",
        },
        {
          id: "28",
          name: "景颇族",
        },
        {
          id: "29",
          name: "柯尔克孜族",
        },
        {
          id: "30",
          name: "土族",
        },
        {
          id: "31",
          name: "达斡尔族",
        },
        {
          id: "32",
          name: "仫佬族",
        },
        {
          id: "33",
          name: "羌族",
        },
        {
          id: "34",
          name: "布朗族",
        },
        {
          id: "35",
          name: "撒拉族",
        },
        {
          id: "36",
          name: "毛南族",
        },
        {
          id: "37",
          name: "仡佬族",
        },
        {
          id: "38",
          name: "锡伯族",
        },
        {
          id: "39",
          name: "阿昌族",
        },
        {
          id: "40",
          name: "普米族",
        },
        {
          id: "41",
          name: "塔吉克族",
        },
        {
          id: "42",
          name: "怒族",
        },
        {
          id: "43",
          name: "乌孜别克族",
        },
        {
          id: "44",
          name: "俄罗斯族",
        },
        {
          id: "45",
          name: "鄂温克族",
        },
        {
          id: "46",
          name: "崩龙族",
        },
        {
          id: "47",
          name: "保安族",
        },
        {
          id: "48",
          name: "裕固族",
        },
        {
          id: "49",
          name: "京族",
        },
        {
          id: "50",
          name: "塔塔尔族",
        },
        {
          id: "51",
          name: "独龙族",
        },
        {
          id: "52",
          name: "鄂伦春族",
        },
        {
          id: "53",
          name: "赫哲族",
        },
        {
          id: "54",
          name: "门巴族",
        },
        {
          id: "55",
          name: "珞巴族",
        },
        {
          id: "56",
          name: "基诺族",
        },
      ],
      politics: [
        {
          id: "01",
          name: "中共党员",
        },
        {
          id: "02",
          name: "中共预备党员",
        },
        {
          id: "03",
          name: "共青团员",
        },
        {
          id: "04",
          name: "民革党员",
        },
        {
          id: "05",
          name: "民盟盟员",
        },
        {
          id: "06",
          name: "民建会员",
        },
        {
          id: "07",
          name: "民进会员",
        },
        {
          id: "08",
          name: "农工党党员",
        },
        {
          id: "09",
          name: "致公党党员",
        },
        {
          id: "10",
          name: "九三学社社员",
        },
        {
          id: "11",
          name: "台盟盟员",
        },
        {
          id: "12",
          name: "无党派人士",
        },
        {
          id: "13",
          name: "群众",
        },
      ],
      nativeData: regionData,
      form: {},
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        nation: [{ required: true, message: "请选择民族", trigger: "change" }],
        certificateNumber: [
          { required: true, validator: validateId, trigger: "change" },
        ],
        nativePlace: [
          { required: true, message: "请选择籍贯", trigger: "change" },
        ],
        address: [
          { required: true, message: "请选择通讯地址", trigger: "change" },
        ],
        phoneNumber: [
          { required: true, validator: validatePhone, trigger: "change" },
        ],
        emergencyPhone: [
          { required: true, validator: validatePhone, trigger: "change" },
        ],

        birthday: [
          { required: true, message: "请选择出生日期", trigger: "change" },
        ],
        politics: [
          { required: true, message: "请选择政治面貌", trigger: "change" },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱格式",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getBasic();
  },
  methods: {
    getBasic() {
      this.loading = true;
      getBasic().then((res) => {
        this.form = res.data;
        this.loading = false;
      });
    },

    next(n) {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$refs.ruleForm1.validate((valid1) => {
            if (valid1) {
              basic(this.form).then((res) => {
                if (res.code == 200) {
                  this.$message.success("保存成功");
                  this.$router.push("student_info_work");
                  if (n == 1) {
                    this.$router.push("student_info_image");
                  } else {
                    this.$router.push("student_info_work");
                  }
                }
              });
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.basic {
  // .form {
  //   padding-top: 10px;
  //   display: flex;
  //   justify-content: flex-start;
  //   .right {
  //     margin-left: 20%;
  //   }
  // }
}
</style>