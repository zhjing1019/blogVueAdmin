<template>
    <dir class="label-main">
        <div class="label-add">
            <el-button type="primary" plain  @click="addLabel">新建标签</el-button>
        </div>
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
                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </div>
                    
                    <span v-else> {{ scope.row[item.prop] }} </span>
                </template>
 
            </el-table-column>
        </el-table>
        <el-drawer
            :title="drawerTitle"
            :before-close="handleClose"
            :visible.sync="dialog"
            direction="rtl"
            custom-class="demo-drawer"
            ref="drawer"
            >
            <div class="demo-drawer__content">
                <el-form :model="form">
                <el-form-item label="标签名称" :label-width="formLabelWidth">
                    <el-input v-model="form.label" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="访问路径" :label-width="formLabelWidth">
                    <el-input v-model="form.path" autocomplete="off"></el-input>
                </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
            </el-drawer>
    </dir>
    
  </template>

  <script>
    export default {
      data() {
        return {
            drawerTitle: "新建标签",
            dialog: false,
            formLabelWidth: '80px',
            loading: false,
            labelField: [
                {
                    prop: "name",
                    label: "名称",
                },
                {
                    prop: "path",
                    label: "访问路径",
                },
                {
                    prop: "oper",
                    label: "操作",
                },

            ],
            form: {
                label: '',
                path: '',
            },
            tableData: [{
                name: '前端',
                path: '/web',
                oper: ''
            }, {
                name: 'JAVA',
                path: '/java',
                oper: ''
            }, {
                name: 'python',
                path: '/python',
                oper: ''
            }, {
                name: '安全',
                path: '/security',
                oper: ''
            }]  
        }
      },
      methods: {
            handleEdit(index, row) {
                console.log(index, row);
                this.drawerTitle = "编辑标签";
                this.dialog = true;
            },
            handleDelete() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            handleClose() {
                this.dialog = false;
            },
            addLabel() {
                this.labelTitle = "新建标签";
                this.dialog = true;
            }
 
      }
    }
  </script>

  <style lang="scss">
@import "@/style/varStyle.scss";
.label-main{
    padding: 20px;
    .label-add{
        padding-bottom: 10px;
        border-bottom: $border-el;
    }
    
}
.demo-drawer__content{
        position: relative;
        height: 100%;
        .demo-drawer__footer{
            text-align: center;
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 100%;
            
        }
    }

  
</style>