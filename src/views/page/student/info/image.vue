<template>
  <div class="image frame">
    <div class="frame_title">个人照片：</div>
    <div class="content">
      <el-upload
        style="margin: 10px 0 0 10px"
        accept=".jpg, .png"
        class="avatar-uploader"
        action="/api/examinee/personal-picture-upload"
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
        <div v-else>
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <div style="padding-bottom: 15px" class="el-upload__text">
            上传头像
          </div>
        </div>
      </el-upload>
      <p>
        <b> 注意事项：</b> <br />
        1、上传的照片必须为
        <font style="color: red"
          >近期正面免冠电子证件照片，规格为：jpg/jpeg格式，100KB以下（建议用Photoshop“存储为Web所用格式”指令保存）。</font
        >
        <br />
        2、上传的照片必须清晰，不变形，背景为纯色，请勿上传照片截图。可参照左侧示例照片。
        <br />
        3、如因照片模糊、不符合规范导致无法参加考试的，由考生本人负责。
      </p>
    </div>
  </div>
</template>
<script>
import { getImage } from "@/api/info";

export default {
  data() {
    return {
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
      getImage().then((res) => {
        this.imageUrl = res.msg;
      });
    },
    beforeAvatarUpload(res) {},
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
}
</style>
<style lang="scss" >
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