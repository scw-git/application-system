<template>
  <div class="other p15">
    <div class="frame_title">笔试准考证考试须知：</div>
    <vue-ueditor-wrap :config="myConfig" v-model="msg1"></vue-ueditor-wrap>
    <div class="frame_title">面试准考证须知：</div>
    <vue-ueditor-wrap :config="myConfig" v-model="msg2"></vue-ueditor-wrap>
    <div class="btn">
      <el-button type="primary" @click="save">保存编辑</el-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/system";
import VueUeditorWrap from "vue-ueditor-wrap";
export default {
  components: {
    VueUeditorWrap,
  },
  data() {
    return {
      msg1: "",
      msg2: "",
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: "100%",
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        // serverUrl: "http://35.201.165.105:8000/controller.php",
        UEDITOR_HOME_URL: "/UEditor/", //UEditor资源文件存放路径
      },
    };
  },
  created() {
    this.getOther();
  },
  methods: {
    getOther() {
      api.getOther().then((res) => {
        this.msg1 = res.data[0].writtenNote;
        this.msg2 = res.data[0].faceNote;
      });
    },
    save() {
      api
        .saveOther({ id: 1, writtenNote: this.msg1, faceNote: this.msg2 })
        .then((res) => {
          this.$message.success("保存成功！");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.other {
  .btn {
    margin-top: 10px;
    text-align: center;
  }
}
</style>