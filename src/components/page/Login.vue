<template>
    <div class="login-wrap">
        <div class="ms-header">晋江市旅游广告管理平台</div>

        <div class="ms-login-wrap">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-login-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips" v-if="false">Tips : 用户名和密码随便填。</p>
            </el-form>

            
           
        </div>
        <div class="ms-footer">copyright ©2019-2020 隆升信息 版权所有</div>
    </div>
</template>

<script>
    import { fetchData,fetch } from '../../api/index';
    export default {
        data: function(){
            return {
                ruleForm: {
                    //username: 'admin',
                    //password: '123456'
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params={
                            userName:this.ruleForm.username,
                            password:this.ruleForm.password,                            
                        }
                       
                        fetch({
                            url:'/login',
                            type:"post",   
                            disToken:true,
                            query:{...params} 
                        }).then((res) => {
                            console.log("res",res)
                            if(res.code=="00000"){
                                localStorage.setItem('ms_username',this.ruleForm.username);
                                sessionStorage.setItem("token", res.token)
                                sessionStorage.setItem("uid", res.uid)
                                
                                this.$router.push('/');
                            }else{
                                this.$message.error(res.msg);
                            }                           
                            
                        })
                        //localStorage.setItem('ms_username',this.ruleForm.username);
                        
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss"  >
    .login_input{
        input{
            background: none;
            border: none;
        }
    }  
    .login-wrap{
        .el-button--primary {
             background: #3a8ee6;
            border-color: #3a8ee6;
            color: #FFF;
            
        }
        .el-button--primary:active,.el-button--primary:hover{
           color: #FFF;
           background-color: #409EFF;
           border-color: #409EFF;
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss"  scoped >
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/img/login_bg.jpg);
        background-size: cover;
        min-width: 1024px;
        min-height: 768px;
    }
    
    .ms-header{
        letter-spacing:1em;
        text-align: center;
        font-size:24px;
        color: #fff;
        padding-top:120px;
    }
    .ms-footer{
        position:absolute;
        left:0;
        bottom:80px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        width: 100%;
    }
    .ms-login-wrap{
        position: absolute;
        right:140px;
        top:50%;
        margin-top:-193px;
        background-image: url(../../assets/img/login-form-bg.png);
        background-size: cover;
        width:420px;
        height: 386px;   
          
    }
    .ms-login-content{
        padding: 140px 30px;
    }
    
    .userRowBg{
        width: 346px;
        height: 49px;
        background-image: url(../../assets/img/userRowBg.png);
        background-size: cover;
    }

    .pwRowBg{
        width: 346px;
        height: 49px;
        background-image: url(../../assets/img/pwRowBg.png);
        background-size: cover;
    }
    
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-login{
        display:none;
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>