<template>
  <div class="check p15">
    <div v-show="status" class="content">
      <div class="search">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="value" placeholder="选择岗位">
          <el-option label="岗位一" value="1"> </el-option>
          <el-option label="岗位二" value="2"> </el-option>
        </el-select>
        <el-button size="medium" type="primary"> 批量审核</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待审核" name="dsh">
          <el-table :data="dsh">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="报名序号" prop="id"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
            <el-table-column label="政治面貌" prop="politics"></el-table-column>
            <el-table-column
              label="毕业院校"
              prop="graduation"
            ></el-table-column>
            <el-table-column label="报名时间" prop="time"></el-table-column>
            <el-table-column label="报考单位" prop="unit"></el-table-column>
            <el-table-column label="报考岗位" prop="job"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="check(scope.row)" type="text" size="small"
                  >审核查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已通过" name="ytg">
          <el-table :data="dsh">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="报名序号" prop="id"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="性别" prop="sex"></el-table-column>
            <el-table-column label="政治面貌" prop="politics"></el-table-column>
            <el-table-column
              label="毕业院校"
              prop="graduation"
            ></el-table-column>
            <el-table-column label="报名时间" prop="time"></el-table-column>
            <el-table-column label="报考单位" prop="unit"></el-table-column>
            <el-table-column label="报考岗位" prop="job"></el-table-column>
            <el-table-column
              label="缴费状态"
              prop="payStatus"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="check(scope.row)" type="text" size="small"
                  >审核查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="报名成功" name="bmcg">报名成功</el-tab-pane>
        <el-tab-pane label="未通过" name="wtg">未通过</el-tab-pane>
      </el-tabs>
    </div>
    <div v-show="!status" class="applicationForm">
      <application-form></application-form>
      <div class="operation">
        <el-button type="primary">审核通过</el-button>
        <el-button type="warning">不审核通过</el-button>
        <el-button type="primary" @click="status = true">返回</el-button>
      </div>
    </div>
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
      status: true,
      activeName: "dsh",
      dsh: [
        {
          id: "00001",
          name: "张三",
          sex: "男",
          politics: "中共党员",
          graduation: "广西民族大学",
          time: "2021-12-09",
          unit: "广西财政厅",
          job: "会计",
          payStatus: "已缴费",
        },
      ],
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
    };
  },
  methods: {
    handleClick() {},
    check() {
      this.status = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.check {
  .content {
    .search {
      margin-bottom: 10px;
    }
  }
  .applicationForm {
    .operation {
      display: flex;
      justify-content: center;
    }
  }
}
</style>