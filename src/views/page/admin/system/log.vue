<template>
  <div class="log p15">
    <el-table ref="tables" v-loading="loading" :data="dataList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column
        label="日志编号"
        width="80"
        align="center"
        prop="operId"
      />
      <el-table-column label="系统模块" align="center" prop="title" />
      <!-- <el-table-column label="操作类型" align="center" prop="businessType">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.sys_oper_type"
            :value="scope.row.businessType"
          />
        </template>
      </el-table-column> -->
      <el-table-column
        label="请求方式"
        width="80"
        align="center"
        prop="requestMethod"
      />
      <el-table-column
        label="操作人员"
        align="center"
        prop="operName"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作地址"
        align="center"
        prop="operIp"
        width="130"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        label="操作地点"
        align="center"
        prop="operLocation"
        :show-overflow-tooltip="true"
      />
      <el-table-column label="操作状态" width="80" align="center" prop="status">
        <template slot-scope="scope">
          {{ scope.row.status == 0 ? "正常" : "异常" }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作日期"
        align="center"
        prop="operTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.operTime }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="total > 0"
      style="margin-top: 20px"
      layout="total,prev, pager, next"
      :total="total"
      :current-page="queryParams.pageNum"
      @current-change="handleChangePageNum"
    >
    </el-pagination>
  </div>
</template>
<script>
import { getLoglist } from "@/api/system";
export default {
  data() {
    return {
      dataList: [],
      loading: false,
      total: 0,
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getLoglist();
  },
  methods: {
    handleChangePageNum(val) {
      this.queryParams.pageNum = val;
      this.getLoglist();
    },

    getLoglist() {
      this.loading = true;
      getLoglist(this.queryParams).then((res) => {
        this.dataList = res.rows;
        this.total = res.total;
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
</style>