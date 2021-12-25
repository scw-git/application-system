<template>
  <div class="other p15 frame">
    <div class="frame_title">其他情况：</div>
    <el-form :model="form">
      <el-form-item label="奖惩情况:">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="form.rewardsAndPunishments"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="特长:">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="form.specialty"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="form.rewardDesc"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <div class="next">
      <el-button type="primary" @click="next(1)">保存上一步</el-button>
      <el-button type="primary" @click="next(2)">保存下一步</el-button>
    </div>
  </div>
</template>
<script>
import * as api from "@/api/info";

export default {
  data() {
    return {
      form: {},
    };
  },
  created() {
    this.getOther();
  },
  methods: {
    getOther() {
      api.getOther().then((res) => {
        this.form = res.data;
        console.log(res);
      });
    },
    next(n) {
      api.addOther({ ...this.form }).then((res) => {
        if (res.code == 200) {
          this.$message.success("保存成功");
          this.getOther();
          if (n == 1) {
            this.$router.push("student_info_work");
          } else {
            this.$router.push("student_info_home");
          }
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>