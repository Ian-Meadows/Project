<script>
function handleFiles(obj,id) {
    file = document.getElementById("icon");
    var files = obj.files;
    img = new Image();
    if(window.URL){
        //File API
        img.src = window.URL.createObjectURL(files[0]);
        img.onload = function(e) {
        window.URL.revokeObjectURL(this.src);
        }
    }
    file.src=img.src;
    //上传文件
        var fd = new FormData(),
        xhr = new XMLHttpRequest();
        fd.append('headimg', files[0]);
        xhr.open('post', 'user.php?act=act_edit_img');
        xhr.send(fd);
}
</script>