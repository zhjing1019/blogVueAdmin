<template>
  <div class="artical-list">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="已发布文章" name="first">
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column v-for="(item, index) in labelField" :key="index"
                :prop="item.prop"
                :label="item.label">
                <template slot-scope="scope">
                    <div v-if="item.prop == 'oper'">
                        <!-- <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">预览</el-button> -->
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </div>
                    
                    <span v-else> {{ scope.row[item.prop] }} </span>
                </template>
 
            </el-table-column>
        </el-table>        
      </el-tab-pane>
      <el-tab-pane label="草稿箱" name="second">
        <el-table
        :data="tableData"
        style="width: 100%">
            <el-table-column v-for="(item, index) in labelField" :key="index"
                :prop="item.prop"
                :label="item.label">
                <template slot-scope="scope">
                    <div v-if="item.prop == 'oper'">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">预览</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </div>
                    
                    <span v-else> {{ scope.row[item.prop] }} </span>
                </template>
 
            </el-table-column>
        </el-table> 
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: 'first',
      labelField: [
        {
          prop: "title",
          label: "标题",
        },
        {
          prop: "date",
          label: "发布日期",
        },
        {
          prop: "oper",
          label: "操作",
        },

      ],
      tableData: [{
                title: 'test',
                date: '2019-10-11',
                oper: ''
            }, {
                title: 'test',
                date: '2019-10-11',
                oper: ''
            }]  
  
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }    
  }

}
</script>

<style lang="scss">
.artical-list{
  padding: 20px;
  padding-top: 0;
}
</style>
