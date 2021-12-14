<template>
  <div class="queryAndApply">
    <div class="timeline">
      <span>报考进度：</span>
      <span :class="{ black: progressTag == 1 }">开始</span>
      <i class="el-icon-arrow-right"></i>
      <span :class="{ black: progressTag == 2 }"> 确认个人报考资料 </span>
      <i class="el-icon-arrow-right"></i
      ><span :class="{ black: progressTag == 3 }"> 完成报考 </span>
      <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">开始 </el-breadcrumb-item>
        <el-breadcrumb-item > 确认个人报考资料 </el-breadcrumb-item>
        <el-breadcrumb-item> 完成报考 </el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>
    <div class="frame" v-if="progressTag == 1">
      <div class="frame_title">
        岗位查询与报名 <span style="color: red">(注意只能报考一个岗位)</span> ：
      </div>
      <div class="table">
        <el-table border :data="dataList">
          <el-table-column
            align="center"
            prop="job"
            label="考试岗位"
          ></el-table-column>
          <el-table-column
            align="center"
            prop="time"
            label="报名时间"
          ></el-table-column>

          <el-table-column align="center" width="200" label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="toApplicationForm(scope)"
                >报名</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="personData" v-if="progressTag == 2">
      <el-button
        style="margin-left: 45px"
        size="small"
        type="primary"
        @click="progressTag = 1"
        >返回</el-button
      >
      <el-button size="small" type="danger" @click="signUp">报名</el-button>
      <application-form></application-form>
    </div>
    <div class="finish" v-if="progressTag == 3">完成报考</div>
  </div>
</template>
<script>
import applicationForm from "@/views/page/components/applicationForm";
export default {
  components: {
    applicationForm,
  },
  data() {
    return {
      progressTag: 2,
      dataList: [
        { job: "前端开发", time: "2021-02-12" },
        { job: "java开发", time: "2021-02-12" },
      ],
    };
  },
  methods: {
    signUp() {
      this.$confirm(
        "请确认报名信息都填写完整了，每个账号只有一次机会！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.$message({ type: "success", message: "报名成功！" });
        this.progressTag = 3;
      });
    },
    toApplicationForm() {
      this.progressTag = 2;
    },
  },
};
</script>
<style lang="scss" scoped>
.timeline {
  margin: 30px;
  margin-left: 45px;
  display: flex;
  // justify-content: center;
  align-items: center;
  span:nth-of-type(n + 2) {
    font-weight: 700;
    padding: 0 10px;
  }
  .black {
    color: white;
    background-color: #f56c6c;
    border-radius: 3px;
  }
}
</style>