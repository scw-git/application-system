<template>
  <div class="image frame">
    <div class="frame_title">个人照片：</div>
    <div class="content" v-loading="loading">
      <el-upload
        style="margin: 10px 0 0 10px"
        accept=".jpg, .png"
        class="avatar-uploader"
        action="/app/api/examinee/personal-picture-upload"
        :headers="headers"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img
          style="width: 153px; height: 230px"
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        />
        <!-- upload/adgag
        data/trs/share/adgna -->
        <div v-else class="img">
          <i class="el-icon-plus"></i>
          <div class="el-upload__text">上传头像</div>
        </div>
      </el-upload>
      <p>
        <b> 注意事项：<span style="color: red">（照片必填）</span></b> <br />
        1、上传的照片必须为
        <font style="color: red"
          >近期正面免冠电子证件照片，规格为：jpg/jpeg格式，2MB以下（建议用Photoshop“存储为Web所用格式”指令保存）。</font
        >
        <br />
        2、上传的照片必须清晰，不变形，背景为纯色，请勿上传照片截图。可参照左侧示例照片。
        <br />
        3、如因照片模糊、不符合规范导致无法参加考试的，由考生本人负责。
      </p>
    </div>
    <div class="btn">
      <el-button type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { getImage } from "@/api/info";

export default {
  data() {
    return {
      loading: false,
      imageUrl: "",
      headers: {
        Authorization: JSON.parse(sessionStorage.getItem("loginInfo")).token,
      },
    };
  },
  created() {
    this.getImage();
  },
  methods: {
    handleAvatarSuccess(res) {
      this.imageUrl = res.url;
    },
    getImage() {
      this.loading = true;
      getImage().then((res) => {
        if (res.msg != "暂未上传!") {
          this.imageUrl = res.msg;
        }
        this.loading = false;
      });
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
      return isJPG && isLt2M;
    },
    next() {
      this.$router.push("student_info_basic");
    },
  },
};
</script>
<style lang='scss' scoped>
.image {
  .content {
    display: flex;
    align-items: center;
    p {
      margin-left: 50px;
      line-height: 30px;
    }
  }
  .btn {
    text-align: center;
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss" >
.img {
  width: 153px;
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  i {
    font-size: 25px;
    margin-bottom: 20px;
  }
}
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