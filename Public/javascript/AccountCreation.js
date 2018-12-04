$(document).ready(function(){ 

    document.getElementById("CreationButton").onclick = function(){

        console.log('in account js')

        var name = document.getElementById("username").value;
        var form_email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        var repassword = document.getElementById("repassword").value;

        if(password === repassword){
            var req = {
                username:name,
                email:form_email,
                password:repassword
            };

            $.ajax({
                type:'GET',
                url:'/CreateAccount',
                data:req,
                success: function(data) {
                    console.log('plpl')
                }
            }).done(function(data) {
                /*
                document.cookie = data.cookie;
                if(document.cookie === "true"){
                    window.location.href = '/AfterLoginPage';
                } 
                else{
                    document.getElementById("PasswordInput").value = "";
                }
                */

                var pass = data.success;
                
                if(pass === 'true'){
                    window.location.href = '/LoginPage';
                }
                else{
                    //say something to user
                }
            


                console.log(data)
            });
        }

        return false;
    };



});