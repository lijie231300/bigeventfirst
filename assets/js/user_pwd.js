$(function () {
    //自定义密码校验规则
    var form = layui - form
    form.verify({
        //密码的校验
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //新密码跟旧的密码不能一致
        samePwd: function (value) {
            //value是新密码,旧密码需要获取
            if (value == $("[name =oldPwd]").val()) {
                return '新密码跟旧密码不能相同'
            }
        },
        rePwd: function (value) {
            //value是新密码,旧密码需要获取
            if (value == $("[name =newPwd]").val()) {
                return '两次输入密码不一致'
            }
        }
    })

    //表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).seriliaze(),
            success: function (res) {
                if (res.ststus !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })

})






