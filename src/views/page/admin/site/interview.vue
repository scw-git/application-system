<template>
  <div class="interview p15">
    <div class="operation mb10">
      <el-select v-model="value" placeholder="选择岗位">
        <el-option label="岗位一" value="1"> </el-option>
        <el-option label="岗位二" value="2"> </el-option>
      </el-select>
      <el-button type="primary" @click="add(1)"> 新建</el-button>
    </div>
    <div class="table">
      <el-table :data="dataList" border>
        <el-table-column
          label="序号"
          width="100"
          align="center"
          type="index"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="job"
          label="报考岗位"
        ></el-table-column>

        <el-table-column
          align="center"
          prop="time"
          label="面试时间"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="address"
          label="面试地点"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="open"
          label="考点是否开放"
        ></el-table-column>

        <el-table-column width="300px" align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="add(2)">
              查看</el-button
            >
            <el-button size="small" type="warning" @click="add(3)">
              编辑</el-button
            >
            <el-button size="small" type="success"> 发布</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form label-width="100px" :model="form" :rules="rules">
        <el-form-item label="报考单位">
          <el-select v-model="form.total" placeholder="请选择">
            <el-option label="20人/组" value="1"> </el-option>
            <el-option label="30人/组" value="2"> </el-option>
            <el-option label="40人/组" value="3"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报考岗位">
          <el-select v-model="form.total" placeholder="请选择">
            <el-option label="20人/组" value="1"> </el-option>
            <el-option label="30人/组" value="2"> </el-option>
            <el-option label="40人/组" value="3"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面试时间">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="form.data"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
          <el-time-picker
            is-range
            v-model="form.time"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="面试地点">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="submitData" type="primary">提交</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [],
      dialogVisible: false,
      form: {},
      rules: {},
      title: "新建地点",
    };
  },
  methods: {
    add() {},
    submitData() {},
  },
};
</script>
<style lang="scss" scoped>
</style>