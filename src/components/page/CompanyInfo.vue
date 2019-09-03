<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 公司基本信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form :model="ruleForm"  ref="ruleForm" label-width="125px" class="ms-regist-content">
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
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import { fetchData,fetch } from '../../api/index';

    export default {
        name: 'baseform',
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
            }
        },
        mounted(){
           this.getCompanyInfo() 
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
            
            getCompanyInfo(){
                let params={}
                fetch({
                    url:'Api/Travel/GetCompanyDetail',
                    type:"post",                   
                    query:{...params} 
                }).then((res) => {
                    let rlt=res.result
                    this.ruleForm={...rlt}
                    this.imageUrl="http://121.204.164.176:8001/"+rlt.businessLicenseUrl 
                    //this.url="data:image/jpg;base64,"+res.result                   
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
<style rel="stylesheet/scss" lang="scss"  scoped >
    .form-box {
     width:unset;
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