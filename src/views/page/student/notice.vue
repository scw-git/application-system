<template>
  <div class="notice p15">
    <ul style="margin-left: 15px" v-if="tag">
      <li
        v-for="item in dataList"
        :key="item.noticeId"
        style="color: #1890ff; margin-top: 20px"
      >
        <a @click="toDetail(item)" style="display: flex; align-items: center">
          {{ item.noticeTitle }}
        </a>
      </li>
    </ul>
    <i
      style="cursor: pointer; padding: 5px; color: #409eff; font-size: 18px"
      class="el-icon-back"
      @click="tag = true"
      v-if="!tag"
      >返回</i
    >

    <div v-if="!tag" class="detail">
      <h2 class="title">{{ content.noticeTitle }}</h2>
      <div class="createBy">
        {{ content.createTime + " " + content.createBy }}
      </div>
      <div class="content" v-html="content.noticeContent"></div>
    </div>
  </div>
</template>
<script>
import { getNoticeList } from "@/api/system";
export default {
  data() {
    return {
      dataList: [],
      tag: true,
      content: {},
    };
  },
  created() {
    this.getNoticeList();
  },
  methods: {
    toDetail(data) {
      this.tag = false;
      this.content = data;
    },
    getNoticeList() {
      this.dataList = [];
      getNoticeList().then((res) => {
        this.dataList = res.rows;
        // res.rows.map((item) => {
        //   if (item.noticeType == "1") {
        //     this.dataList.push(item);
        //   }
        // });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.notice {
  .detail {
    width: 55%;
    margin: 0 auto;
    .title {
      text-align: center;
    }
    .createBy {
      margin-bottom: 10px;
      text-align: center;
    }
  }
}
</style>