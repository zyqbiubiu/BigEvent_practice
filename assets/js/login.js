$(function(){
    //点击"去注册链接",跳转到注册界面
    $('#link-reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show()
    })
    //点击"去登录链接",跳转到登录界面
    $('#link-login').on('click',function(){
        $('.reg-box').hide();
        $('.login-box').show()
    })
})
//导入layui的js文件
var form = layui.form
//通过from.verify函数自定义校验规则
form.verify({
    //自定义了一个叫做pwd的校验规则
    pwd:[/^[\S]{6,12}$/,'密码必须为6到12位，且不能出现空格'],
    repwd:function(val){
        //通过形参拿到的是确认密码框中的内容
        //还需要拿到密码框中的内容
        //然后进行一次等于的判断
        //如果判断失败，则return一个提示消息即可
        var pwd = $('.reg-box[name=password]').val();
        if(pwd !== value){
            return '两次密码不一致!'
        }
    }
})
var layer = layui.layer
//监听注册表单的提交事件
$('#form-reg').on('submit',function(e){
    //1.阻止默认的提交行为
    e.preventDefault();
    //2.发起Ajax的POST请求
    var data = {
        username:$('#form-reg [name=username]').val(),
        password:$('#form-reg [name=password]').val()
    }
    $.post('/api/reguser',data,function(res){
        if(res.status !== 0){
            return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
        //模拟人的点击行为
        $('#link-login').click()
    })
})
//监听表单的提交事件
$('#form-login').on('submit',function(e){
    //阻止默认事件
    e.preventDefault()
    //发起Ajax请求
    $.ajax({
        url:'/api/login',
        method: 'POST',
        //快速获取表单中的数据
        data:$(this).serialize(),
        success: function(res){
            if(res.status !== 0){
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功！')
            //将登录成功得到的token字符串，保存在locaotorage中
            localStorage.setItem('token',res.token)
            //跳转到后台首页
            location.href = '/index.html'
        }
    })
})