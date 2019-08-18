<template>
    <dir class="label-main">
        <div class="label-add">
            <el-button type="primary" plain  @click="addLabel">新建分类</el-button>
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
                    <div v-if="item.prop == 'labelDetail'">
                        {{scope.row[item.prop].join(',')}}
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
                    <el-form-item label="分类名称" :label-width="formLabelWidth">
                        <el-input v-model="form.label" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="访问路径" :label-width="formLabelWidth">
                        <el-input v-model="form.path" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item
                        :label-width="formLabelWidth"
                        v-for="(domain, index) in form.domains"
                        :label="'标签' + index"
                        :key="domain.key"
                        :prop="'domains.' + index + '.value'"
                    >
                        <el-input v-model="domain.value" style="width:230px"></el-input>
                        <el-button @click.prevent="removeDomain(domain)" style="margin-left: 10px">删除</el-button>
                    </el-form-item>
                    <div>
                        <el-button @click.prevent="addDomain()">新增标签</el-button>
                        
                    </div>
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
            drawerTitle: "新建分类",
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
                    prop: "labelDetail",
                    label: "技术标签",
                },
                {
                    prop: "oper",
                    label: "操作",
                },

            ],
            form: {
                label: '',
                path: '',
                domains: [{
                    value: ''
                }],
 
            },
            tableData: [{
                name: '前端',
                path: '/web',
                labelDetail: ['vue', 'react', 'webpack'],
                oper: ''
            }, {
                name: 'JAVA',
                path: '/java',
                labelDetail: ['vue', 'react', 'webpack'],
                oper: ''
            }, {
                name: 'python',
                path: '/python',
                labelDetail: ['vue', 'react', 'webpack'],
                oper: ''
            }, {
                name: '安全',
                path: '/security',
                labelDetail: ['vue', 'react', 'webpack'],
                oper: ''
            }]  
        }
      },
      methods: {
            handleEdit() {
                this.drawerTitle = "编辑分类";
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
                this.labelTitle = "新建分类";
                this.dialog = true;
            },
            removeDomain(item) {
                var index = this.form.domains.indexOf(item)
                if (index !== -1) {
                this.form.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.form.domains.push({
                value: '',
                key: Date.now()
                });
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
        padding: 20px;
        padding-top: 0;
        .demo-drawer__footer{
            text-align: center;
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 100%;
            
        }
    }

  
</style>