<template>
    <div class="regist-wrap">
        <div class="ms-header">晋江市智慧旅游管理平台<span>(旅行社注册入口)</span></div>
        <div class="ms-regist-wrap">
            <el-card class="box-card">
                <div slot="header" class="clearfix" style="text-align:center">
                    <span>旅行社注册</span>                    
                </div>
                <el-form :model="ruleForm"  ref="ruleForm" label-width="110px" class="ms-regist-content">
                    <el-row :gutter="40">
                        <el-col :span="12">
                            <el-form-item label="公司名称" >
                                <el-input v-model="ruleForm.name"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人姓名" >
                                <el-input v-model="ruleForm.contactName"></el-input>
                            </el-form-item>
                            <el-form-item label="联系人手机" >
                                <el-input v-model="ruleForm.contactPhone"></el-input>
                            </el-form-item>
                            <el-form-item label="图片验证码" >
                                <el-input   v-model="ruleForm.imageCode"  class="getImgCode">
                                    <el-image
                                    @click="getImageCode"
                                    slot="append"
                                    style="width: 100px; height: 32px"
                                    :src="url"></el-image>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="验证码" >
                                <el-input   v-model="ruleForm.verificationCode"  class="getVerCode">
                                    <el-button type="primary" slot="append" :disabled="telCodeSendFlag" @click="getCode">获取验证码<span v-if="telCodeSendFlag" v-html="'('+timeCountDown+')' "></span></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="公司编号" >
                                <el-input v-model="ruleForm.number"></el-input>
                            </el-form-item>
                            <el-form-item label="统一社会信用代码" >
                                <el-input v-model="ruleForm.uscc"></el-input>
                            </el-form-item>
                            <el-form-item label="在职人数" >
                                <el-input v-model="ruleForm.incumbents"></el-input>
                            </el-form-item>
                            <el-form-item label="法人姓名" >
                                <el-input v-model="ruleForm.legalName"></el-input>
                            </el-form-item>
                            <el-form-item label="公司地址" >
                                <el-input type="textarea" placeholder="请输入内容"  maxlength="30"  show-word-limit v-model="ruleForm.address"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-upload
                                class="avatar-uploader"
                                action="http://121.204.164.176:8001/Api/FileUpload"
                                :data="upLoadData"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <el-form-item  label-width="0" style="text-align:center;display:inline-block;width:360px" >
                                营业执照上传
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="regist-btn">
                        <el-button type="default" @click="goBack()" class="" >返回</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" class="" >注册</el-button>
                    </div>
                    <p class="regist-tips" v-if="false">Tips : 用户名和密码随便填。</p>
                </el-form>
            </el-card>
        </div>
        <div class="ms-footer">copyright ©2019-2020 隆升信息 版权所有</div>
    </div>
</template>

<script>
    import { fetchData,fetch } from '../../api/index';
    export default {
        data: function(){
            return {
                fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
                url: "",
                captchaId:"",
                imageUrl:"",
                upLoadData:{FileType:'F'},
                ruleForm: {
                    /*para:'dt',
                    name: '少逸旅游文化公司',
                    contactName: '林逸',
                    contactPhone:'13148779245',
                    number:'107856',
                    uscc:'F15E2',
                    incumbents:56,
                    legalName:"林大伟",
                    businessLicense:"",                    
                    address:'靖江市高新创业园'*/
                },
                timeCountDown:"",//倒计时值
                telCodeSendFlag:false,
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
        mounted(){
           this.getImageCode() 
        },
        
        methods: {
            submitForm(formName) {
                if(this.ruleForm.businessLicense==""){
                    this.$message.error("请先上传营业执照！");
                    return false
                }
                let params={
                            ...this.ruleForm                          
                        }
                       
                fetch({
                    url:'Api/Travel/TravelRegister',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    console.log("res",res)
                    if(res.code=="00000"){
                        console.log(res);
                        /*localStorage.setItem('ms_username',this.ruleForm.username);
                        sessionStorage.setItem("token", res.token)
                        sessionStorage.setItem("uid", res.uid)
                        
                        this.$router.push('/');*/
                    }else{
                        this.$message.error(res.msg);
                    }                           
                    
                })

                /*this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params={
                            userName:this.ruleForm.username,
                            password:this.ruleForm.password,                            
                        }
                       
                        fetch({
                            url:'Api/Tourism/regist',
                            type:"post",                   
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
                });*/
            },
            goBack(){
                this.$router.push('login');
            },
            getImageCode(){
                this.captchaId=(new Date()).getTime();
                let params={
                            captchaId:this.captchaId                          
                        }
                       
                fetch({
                    url:'Api/Web/getImageCode',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    this.url="data:image/jpg;base64,"+res.result                   
                })
            },
            getCode(){
                if(this.ruleForm.contactPhone==""){
                    this.$message.error("联系电话不能为空！");
                }
                this.countDown();
                let params={
                    captchaId:this.captchaId.toString(),
                    phoneNum:this.ruleForm.contactPhone,
                    imageCode:this.ruleForm.imageCode,
                    type:0,
                }
                fetch({
                    url:'Api/Web/GetVerificationCode',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    console.log("res",res)
                    if(res&&res.code=="00000"){
                       this.$message.success(res.msg); 
                    }                         
                    
                })
            },
            countDown(){
                //let count=60;
                this.timeCountDown=60;
                this.telCodeSendFlag=true;
                let intervalId=setInterval(()=>{
                    this.timeCountDown=this.timeCountDown-1
                    if(this.timeCountDown==1){                        
                        this.timeCountDown="";
                        clearInterval(intervalId);
                        this.telCodeSendFlag=false;

                    }
                },1000)   
            },
            handleAvatarSuccess(res, file) {
                console.log('handleAvatarSuccess',res)
                this.ruleForm.businessLicense=res.imgId;
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss"  >
    .regist_input{
        input{
            background: none;
            border: none;
        }
    }  
    .regist-wrap{
        .el-button--primary {
             background: #3a8ee6;
            border-color: #3a8ee6;
            color: #FFF;
            
        }        
    }
    .getImgCode{
        .el-input-group__append{
            border:none;
            padding: 0px;
            cursor: pointer;
        }
    }
    .getVerCode1{
        .el-input-group__append{
            background-color:#409EFF;
            color:#fff;
            cursor: pointer;
        }
    }
</style>
<style rel="stylesheet/scss" lang="scss"  scoped >
    .regist-wrap{
        position: relative;
        width:100%;
        height:auto;
        background-image: url(../../assets/img/login_bg.jpg);
        background-size: cover;
        min-width: 1024px;
        min-height: 768px;
        
    }
    
    .ms-header{
        letter-spacing:0.5em;
        text-align: center;
        font-size:24px;
        color: #fff;
        padding-top:30px;
        span{
            letter-spacing: normal;
            font-size: 18px;
        }
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
    .ms-regist-wrap{
        position: absolute;
        right:50%;
        transform: translatex(50%);
        margin-top: 30px;       
        width:900px;
        min-height: 486px;
    }
    .ms-regist-content{
        width:100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }
    .ms-regist{
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
    .regist-btn{
        text-align: center;
    }
    .regist-btn button{
        display:inline-block;
        width:120px;
        height:36px;
        margin-bottom: 10px;
    }
    .regist-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>