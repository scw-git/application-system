<template>
  <div class="apply">
    <div class="title">
      <h1>2021年下半年全国事业单位考试报名表</h1>
      <button @click="verify">验证</button>
      <button @click="reset">reset</button>
    </div>
    <div class="form">
      <el-form label-width="125px" :rules="rules" :model="form" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="报考单位:" prop="unit">
              <el-select v-model="form.unit">
                <el-option label="单位一" :value="1"></el-option>
                <el-option label="单位二" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="报考岗位:" prop="job">
              <el-select v-model="form.job">
                <el-option label="单位一" :value="1"></el-option>
                <el-option label="单位二" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="岗位代码:">
              <el-select v-model="form.postCode">
                <el-option label="代码一" :value="1"></el-option>
                <el-option label="代码二" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份证号:" prop="id">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="出生年月:" prop="birthYear">
              <el-date-picker v-model="form.birthYear" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>

            <el-form-item label="教育程度:" prop="educationLevel">
              <el-select v-model="form.educationLevel">
                <el-option label="小学" :value="1"></el-option>
                <el-option label="初中" :value="2"></el-option>
                <el-option label="高中" :value="3"></el-option>
                <el-option label="大专" :value="4"></el-option>
                <el-option label="本科" :value="5"></el-option>
                <el-option label="硕士" :value="6"></el-option>
                <el-option label="博士" :value="7"></el-option>
                <el-option label="其他" :value="8"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="健康状况:" prop="healthStatus">
              <el-input v-model="form.healthStatus"></el-input>
            </el-form-item>
            <el-form-item label="在职教育:">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <a-row type="flex" justify="space-between">
              <el-col :span="14">
                <el-form-item label="姓名:" prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="民族:" prop="nation">
                  <el-input v-model="form.nation"></el-input>
                </el-form-item>
                <el-form-item label="性别:" prop="sex">
                  <el-select v-model="form.sex">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <!-- accept属性，当你点击上传时，他会筛选更实用 -->
                <el-upload
                  accept=".jpg, .png"
                  style="float:right;"
                  class="avatar-uploader"
                  action="#"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" />
                  <div v-else>
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                    <div style="padding-bottom:15px;" class="el-upload__text">上传头像</div>
                  </div>
                </el-upload>
              </el-col>
            </a-row>
            <el-form-item label="籍贯:" prop="native">
              <el-input v-model="form.native"></el-input>
            </el-form-item>
            <el-form-item label="政治面貌:" prop="politics">
              <el-input v-model="form.politics"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱:" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="专业技术职称:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="毕业院校及专业:" prop="graduateSchool">
              <el-input v-model="form.graduateSchool"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="家庭住址:" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item class="lh25" label="现工作单位及(在职人员填写):">
          <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item class="lh25" prop="wordExperience" label="学习及工作简历(从大学开始填写):">
          <el-input
            type="textarea"
            v-model="form.wordExperience"
            placeholder="请输入内容"
            :autosize="{ minRows: 3, maxRows: 5}"
          ></el-input>
        </el-form-item>
        <el-form-item label="奖惩情况:">
          <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item label="个人特长:">
          <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item label="附件:">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="form.fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <!-- 表格 -->
        <el-table :data="form.dataList" border style="width: 100%">
          <el-table-column align="center" width="200" type="index">
            <template slot="header">
              <span style="color:red;">* &nbsp;</span>
              <span>家庭主要成员及社会关系（至少填一个）</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="relation" label="关系">
            <template slot-scope="scope">
              <el-input v-model="form.dataList[scope.$index].relation"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名" prop="name">
            <template slot-scope="scope">
              <el-input v-model="form.dataList[scope.$index].name"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="政治面貌" prop="politics">
            <template slot-scope="scope">
              <el-input v-model="form.dataList[scope.$index].politics"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="出生年月" prop="birth">
            <template slot-scope="scope">
              <el-input v-model="form.dataList[scope.$index].birth"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="工作单位和职位" prop="job">
            <template slot-scope="scope">
              <el-input v-model="form.dataList[scope.$index].job"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form>

      <div class="btn">
        <el-button type="primary">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { validatePhone } from "@/utils/validator.js";
export default {
  data() {
    return {
      imageUrl: false,
      form: {
        dataList: [
          {
            relation: "",
            name: "",
            politics: "",
            birth: "",
            job: ""
          },
          {
            relation: "",
            name: "",
            politics: "",
            birth: "",
            job: ""
          },
          {
            relation: "",
            name: "",
            politics: "",
            birth: "",
            job: ""
          }
        ]
      },
      rules: {
        unit: [
          { required: true, message: "请选择报考单位", trigger: "change" }
        ],
        job: [{ required: true, message: "请选择报考岗位", trigger: "change" }],
        id: [
          { required: true, message: "请输入身份证号码", trigger: "change" }
        ],
        birthYear: [
          { required: true, message: "请选择出生年月", trigger: "change" }
        ],
        healthStatus: [
          { required: true, message: "请输入健康状态", trigger: "change" }
        ],
        educationLevel: [
          { required: true, message: "请选择教育程度", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入姓名", trigger: "change" }],
        nation: [{ required: true, message: "请输入民族", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        native: [{ required: true, message: "请输入籍贯", trigger: "change" }],
        politics: [
          { required: true, message: "请输入政治面貌", trigger: "change" }
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        email: [
          {
            type: "email",
            required: true,
            message: "请输入正确的邮箱格式",
            trigger: "blur"
          }
        ],
        graduateSchool: [
          { required: true, message: "请输入毕业学校及专业", trigger: "change" }
        ],
        address: [
          { required: true, message: "请输入家庭住址", trigger: "change" }
        ],
        wordExperience: [
          { required: true, message: "请输入学习及工作简历", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    verify() {
      let obj = this.form.dataList[0];
      let n = 0;
      for (let key in obj) {
        if (obj[key]) {
          n++;
        }
      }
      if (n != 5) {
        this.$message.error("请完善家庭主要成员及社会关系");
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log("ok");
        }
      });
    },
    reset() {
      this.$refs.form.resetFields();
    },

    handlePreview() {},
    beforeRemove() {},
    handleExceed() {},
    handleRemove() {},
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
  }
};
</script>
<style lang="scss" scoped>
.apply {
  padding: 20px 30px;
  margin: auto;

  .title {
    text-align: center;
    margin-bottom: 50px;
  }

  .form {
    .el-select,
    .el-date-editor {
      width: 100%;
    }
    .single-input .el-form-item {
      width: calc(100% - 60px);
    }
    .form-line {
      width: auto;
    }
    .lh25 {
      ::v-deep .el-form-item__label {
        line-height: 25px;
      }
    }
    .btn {
      margin-top: 50px;
      display: flex;
      justify-content: center;
      .el-button {
        width: 220px;
      }
    }
  }
}
</style>
<style >
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
  height: 138px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>