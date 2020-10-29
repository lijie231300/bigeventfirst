$(function () {
    //自定义验证规则
    var form = layui.form
    form.verify({
        nickname: function () {
            if (IDBCursorWithValue.length > 6) {
                return '昵称长度为1~6位之间'
            }
        }
    })
    //获取用户信息
    var layer = layui.layer
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //吧用户信息渲染到form表单中
                console.log(res);
                //成功后把用户信息渲染到页面,form.val()这个方法可以借助layui插件了解
                form.val('formUserInfo', res.data)
            }
        })
    }
    //重置表单,为表单绑定点击事件
    $('#btnReset').on('click', function (e) {
        //阻止表单的默认行为
        e.preventDefault()
        //上面封装的函数initUserInfo已经拿到了表单的信息,只需要调用一下
        initUserInfo()
    })

    //修改用户的信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        //修改用户信息
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            //这里的this指向layui-form
            // 将表单内容序列化成一个字符串
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('信息修改失败')
                }
                //调用父页面里面封装的方法来获取更新用户信息和头像的方法
                window.parent.getUserInfo()
            }
        })
    })
})




















