$('#chooseImage').on('change',function(){
        var filePath = $(this).val(),
            fileFormat = filePath.substring(filePath.lastIndexOf(".")).toLowerCase();
        if( !fileFormat.match(/.png|.jpg|.jpeg/) ) {
            error_prompt_alert('file format：png/jpg/jpeg');
            return;  
        }
        $('#cropedBigImg').attr('src',filePath);
        $('#loding').show();
});
