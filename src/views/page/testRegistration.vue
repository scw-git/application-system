<template>
  <div class="apply">
    <div class="title">
      <h1>2021年下半年全国事业单位考试报名表</h1>
    </div>
    <div class="form">
      <el-form label-width="120px" :rules="rules" :model="form" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="报名序号:">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="报名单位:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="岗位代码:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="身份证号:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="出生年月:">
              <el-date-picker type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="报考单位:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="健康状况:">
              <el-input></el-input>
            </el-form-item>

            <el-form-item label="教育程度:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="在职教育:">
              <el-input></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <a-row type="flex" justify="space-between">
              <el-col :span="14">
                <el-form-item label="姓名:">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="民族:">
                  <el-input></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                  <el-select>
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-upload
                  style="float:right;"
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <div v-else>
                    <i class="el-icon-plus avatar-uploader-icon"></i>
                    <div style="padding-bottom:5px;" class="el-upload__text">上传头像</div>
                  </div>
                </el-upload>
              </el-col>
            </a-row>
            <el-form-item label="籍贯:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="政治面貌:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="手机号:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="专业技术职称:">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="毕业院校及专业:">
              <el-input></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="家庭住址:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item class="lh25" label="现工作单位及(在职人员填写):">
          <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item class="lh25" label="学习及工作简历(从大学开始填写):">
          <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item label="奖惩情况:">
          <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>
        <el-form-item label="个人特长:">
          <el-input type="textarea" placeholder="请输入内容" :autosize="{ minRows: 3, maxRows: 5}"></el-input>
        </el-form-item>
      </el-form>

      <!-- 表格 -->
      <el-table :data="dataList" border style="width: 100%">
        <el-table-column align="center" width="200" type="index" label="家庭主要成员及社会关系（至少填一个）"></el-table-column>
        <el-table-column align="center" prop="relation" label="关系">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名" prop="name">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="政治面貌" prop="politics">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="出生年月" prop="birth">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="工作单位和职位" prop="job">
          <template slot-scope="scope">
            <el-input></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div class="mb" style="margin-bottom:500px;"></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: false,
      form: {},
      rules: {},
      dataList: [
        {
          relation: "父子",
          name: "scw",
          politics: "群众",
          birth: "2001.12",
          job: "技术开发"
        },
        {
          relation: "父子",
          name: "scw",
          politics: "群众",
          birth: "2001.12",
          job: "技术开发"
        },
        {
          relation: "父子",
          name: "scw",
          politics: "群众",
          birth: "2001.12",
          job: "技术开发"
        }
      ]
    };
  },
  methods: {
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