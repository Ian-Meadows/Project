$(document).ready(function(){ 

    document.getElementById("BetButton").onclick = function(){


        var team = document.getElementById("TeamName").value;
        var bet = document.getElementById("Bet").value;

        var req = {
            TeamName:team,
            Bets:bet
        };

        console.log("FAK")

        $.ajax({
            url:'/MakeBet',
            data:req
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
            console.log(data)
            
        });

        return false;
    };



});