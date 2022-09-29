$(function () {
    $("#img").attr("style", "background-image: url('/images/start.png')")
    files = [];
    fileinputs()
    // 监测时间
    param = 10000;
    index = 0;
    // 检测个数
    number = 0;
    $("#jc").click(function () {
        // alert(files.length)
        show()
    })
})

function show() {
    if (index != 0) {
        index++
    }
    if (number == 0) {
        number = files.length;
    }
    if (files.length == 0) {
        alert("请先上传图片!")
        return;
    }
    if (index >= files.length) {
        alert("所有图片已监测完成!")
        // 刷线页面
        location.reload(true);
        return;
    }
    if (number != files.length) {
        if ((files.length - index) < number) {
            number = files.length - index;
        }
    }
    alert("开始监测")
    // alert(number)
    $("#img").attr("style", "background-image: url('/img/" + files[index] + ";height: 35vw)")
    //定义定时器
    var interval = setInterval(lunbo, param);
    var count = 0;
    // 添加扫描框
    $("#img").attr("class", "qr-scanner")
    // 进度条
    jindu();

    function lunbo() {
        if (number > files.length) {
            number = files.length
        }
        // if ((files.length - index) < number) {
        //     number = files.length - index;
        // }
        if (count >= number) {
            clearInterval(interval)
            $("#img").removeAttr("class", "qr-scanner")
            var random = Math.ceil(Math.random() * number);
            alert("监测完成,本次监测" + number + "张图片，发现" + random + "张疑似图片。")
            if (number >= files.length) {
                location.reload(true);
            }
            return;
        }
        //获取img对象
        $("#img").attr("style", "background-image: url('/img/" + files[index] + ";height: 35vw)")
        index++;
        count++;
    }
}

function timeParam(num) {
    param = num;
    alert("设置成功!")
}

function numParam(num) {
    number = num;
    alert("设置成功!")
}

function saveParam() {
    var time = $("#userTime").val();
    var num = $("#userNum").val();
    if (time < 10) {
        alert("监测时间最低为10秒")
        return
    }
    if (num < 1) {
        alert("监测个数不能低于1")
        return;
    }
    param = time * 1000;
    number = num;

}

function model() {
    $("#exampleModalToggle2").modal("show");
    $("#userTime").val("");
    $("#userNum").val("");
}


function jindu() {
    if (number > files.length) {
        number = files.length;
    }
    // alert("number" + number + "-" + "param" + param)
    // alert(((number + 1) * param) / 100)
    var i = 0;
    var mDiv = setInterval(function () {
            if (i >= 100) {
                clearInterval(mDiv);
            }
            var myDiv = document.getElementById("myDiv");
            myDiv.style.width = i + "%";
            myDiv.innerText = i + "%";
            i++;
        }, (((number + 0.7) * param) / 100)
    )
}

function fileinputs() {
    $("#file-1").fileinput({
        uploadUrl: '/upload', // 这个是点击上传时候的上传接口
        // allowedFileExtensions: ['jpg', 'png', 'jpeg'],//允许的文件类型
        overwriteInitial: false,
        showUpload: true, //是否显示上传按钮
        showRemove: true, //显示移除按钮
        showPreview: false,
        minFileCount: 1,
        // maxFileCount: picLimit,
        msgFilesTooMany: "选择上传的文件数量({n}) 最大数量为{m}！",
        dropZoneTitle: '500KB以下\n' + 'JPG或PNG',
        language: 'zh',
        // maxFileSize: 10000 * 1024,//1000MB 文件上传限制大小
        uploadAsync: true,//同步上传  后台参数为MultipartFile[]，若异步参数为MultipartFile
        uploadExtraData: {  //上传的时候，增加的附加参数
            userid: 1
        },
        // maxFilesNum: 100,//最多文件数量
        previewSettings: {//设置预览图片时候的大小
            image: {width: "100px", height: "100px"},
        },
        slugCallback: function (filename) {
            return filename;
        }
    })
        .on('filecleared', function () {//点击移除按钮时触发

        }).on('fileuploaded', function (event, data, previewId, index) {//文件上传完成后触发
        // console.log(event, data, prev|iewId, index);
        let imgName = data.response.getExtend.names[0];
        var reg = /.(PNG|JPG|JEPG|WEBP)$/;
        if (reg.test(imgName)) {
            files.push(imgName)
        }
        console.log(data)

    }).on('filebatchuploadsuccess', function (event, data, previewId, index) {
        // console.log("==" + event, data, previewId, index);
        // 上传图片后，判断当前图片个数，是否隐藏文件上传框【注：此方法执行前，图片已经加载】
        let currentPicNum = $(this).parents(".recommendItem").find('img').length
        if (currentPicNum / 2 >= picLimit) {
            $(this).parents(".input-group").css('display', 'none');
        }
    });
}

