<template>
  <div class="fj">
    <el-upload
      style="margin-left: 45px; margin-top: 10px"
      class="upload-demo"
      action="/app/api/examinee/upload-annex"
      :headers="headers"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      multiple
      :file-list="fileList"
    >
      <el-button size="small" type="primary">相关证明材料上传</el-button>
      <span style="color: red; font-weight: 700">（非必填项）</span>

      <!-- <div slot="tip" class="el-upload__tip">非必填项</div> -->
    </el-upload>
    <el-button
      style="margin: 10px 48%"
      size="small"
      type="primary"
      @click="() => this.$router.push('student_operation_queryAndApply')"
      >立即报名</el-button
    >
  </div>
</template>

<script>
import * as api from "@/api/operation";

export default {
  data() {
    return {
      fileList: [],
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("loginInfo")).token,
      },
    };
  },
  created() {
    this.getFj();
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 删除附件
    handleRemove(file, fileList) {
      api.delFj(file.id).then((res) => {
        this.$message.success("删除成功");
      });
    },
    // 获取附件
    getFj() {
      api.getFj().then((res) => {
        if (res.data) {
          res.data.forEach((item, i) => {
            res.data[i].name = item.fileName;
          });
          this.fileList = res.data;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>