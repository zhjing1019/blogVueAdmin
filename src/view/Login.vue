<template>
  <div class="login-div">
    <img class="login-bg-img" src="./../assets/img/loginImg.jpg" alt="">
    <div class="login-main">
        <el-form label-position="left" :model="loginForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-on:keyup.enter.native="btnClick" v-model="loginForm.userName"  autofocus></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-on:keyup.enter.native="btnClick" v-model="loginForm.password"  show-password></el-input>
            </el-form-item>
        </el-form>
        <div class="login-btn">
            <el-button type="primary" plain @click="btnClick" @keyup.enter.native="btnClick">Login</el-button>
        </div>
    </div>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            loginForm: {
                userName: "",
                password: "",
            },
            rules: {
                userName: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        // 登陆
        btnClick() {
            // 
            let _this = this;
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    axios({
                        method: 'post',
                        url: 'account/login',
                        data: _this.loginForm
                    }).then(res => {
                        if(res.data) {
                            let token = res.data.token;
                            localStorage.setItem('Authorization', token);
                            _this.$router.push({ path: `/index` });
                        }
                    }).catch(error => {
                        _this.$message.error(error.msg);
                    });
                } else {
                    return false;
                }
            });
        },

    }

}
</script>

<style lang="scss">
.login-div {
    width: 100vw;
    height: 100vh;
    position: relative;
    .login-bg-img{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .login-main{
        width: 400px;
        height: 260px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.5);
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -150px;
        margin-left: -200px;
        padding: 40px;
        box-sizing: border-box;
        overflow: hidden;
    }
    .login-btn{
        margin-top: 30px;
        text-align: center;
        .el-button{
            width: 100%;
        }
    }
}

</style>
