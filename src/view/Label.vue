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
                        <!-- <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->
                    </div>
                    <div v-if="item.prop == 'tags'">
                        <span v-for="(tag, indexY) in scope.row[item.prop]" :key="indexY">
                            {{tag.name}}
                            <span v-if="indexY !== scope.row[item.prop].length - 1">、</span>
                        </span>
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
                <el-form :model="form" ref="ruleForm">
                    <el-form-item label="分类名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="访问路径" :label-width="formLabelWidth">
                        <el-input v-model="form.dir" autocomplete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item
                        :label-width="formLabelWidth"
                        v-for="(domain, index) in form.tags"
                        :label="'标签' + index"
                        :key="domain.key"
                        :prop="'tags.' + index + '.name'"
                        :rules="[
                            { required: true, message: '请输入标签名称', trigger: 'blur' },
                            { required: true,message: '请输入标签路径', trigger: 'blur' }
                        ]"
                    >
                        <el-input v-model="domain.name" style="width:230px" placeholder="请输入标签名称"></el-input>
                        <el-input class="tag-dir" v-model="domain.dir" style="width:230px" placeholder="请输入标签路径"></el-input>
                        <el-button @click.prevent="removeDomain(domain)" style="margin-left: 10px">删除</el-button>
                    </el-form-item>
                    <div>
                        <el-button @click.prevent="addDomain()">新增标签</el-button>
                        
                    </div>
                </el-form>
                <div class="demo-drawer__footer">
                    <el-button @click="dialog = false">取 消</el-button>
                    <el-button type="primary" @click="query" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
            </div>
            </el-drawer>
    </dir>
    
  </template>

  <script>
    import axios from "axios";
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
                    prop: "dir",
                    label: "访问路径",
                },
                {
                    prop: "tags",
                    label: "技术标签",
                },
                // {
                //     prop: "oper",
                //     label: "操作",
                // },
            ],
            form: {
                name: '',
                dir: '',
                tags: [{
                    dir: '',
                    name: ''
                }],
 
            },
            tableData: [],
        }
      },
      mounted() {
          this.getLabel()
      },
      methods: {
            //获得分类列表
            getLabel() {
                let _this = this;
                axios.get('cms/type')
                    .then(function (res) {
                        _this.tableData = res.data.data
                        
                    })
                    .catch(function (error) {
                        _this.$message.error(error.msg);
                    })

            },
            //新增分类标签
            query() {
                let _this = this;
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        axios({
                            method: 'post',
                            url: 'cms/type',
                            data: _this.form
                        }).then(() => {
                            _this.getLabel();
                            _this.$refs.drawer.closeDrawer();
                            _this.$refs.ruleForm.resetFields();
                        }).catch(error => {
                            _this.$message.error(error.msg);
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleEdit(index, data) {
                this.drawerTitle = "编辑分类";
                this.dialog = true;
                console.log(index);
                console.log(data);

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
                var index = this.form.tags.indexOf(item)
                if (index !== -1) {
                this.form.tags.splice(index, 1)
                }
            },
            addDomain() {
                this.form.tags.push({
                    name: '',
                    dir: '',
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
        .tag-dir{
            margin-top: 10px;
        }
        .demo-drawer__footer{
            text-align: center;
            position: absolute;
            bottom: 20px;
            left: 0;
            width: 100%;
            
        }
    }

  
</style>