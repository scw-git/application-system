<template>
  <div class="notice">
    <div class="qrcode" id="code"></div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {};
  },
  mounted() {
    this.createQrCode();
  },
  methods: {
    createQrCode() {
      let code = new QRCode("code", {
        text: window.location.href,
        width: 100,
        height: 100,
        colorDark: "#000000",
        colorLight: "#ffffff",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.qrcode {
  display: inline-block;
  img {
    width: 132px;
    height: 132px;
    background-color: #fff; //设置白色背景色
    padding: 6px; // 利用padding的特性，挤出白边
    box-sizing: border-box;
  }
}
</style>