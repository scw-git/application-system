<template>
  <div class="index">
    <div class="header">
      <my-header />
    </div>
    <div class="body">
      <div class="left">
        <my-menu />
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import myHeader from "./header/index";
import myMenu from "./menu/index";
export default {
  components: {
    myHeader,
    myMenu
  },
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.index {
  width: 100%;
  min-width: 1300px;
  margin: 0 auto;
  .header {
    height: 75px;
  }
  .body {
    display: flex;
    padding: 0 20px 0 0;
    // height: calc(100% - 80px);
    .left {
      width: 200px;
      flex-shrink: 0;
    }
    .right {
      // flex: 1;
      width: calc(100% - 200px);
    }
  }
}
</style>