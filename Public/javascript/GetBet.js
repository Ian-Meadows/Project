$(document).ready(function(){ 

    document.getElementById("BetButton").onclick = function(){

        var gameID = vars['id'];
        var team = document.getElementById("TeamName").value;
        var bet = document.getElementById("Bet").value;
        if(!(team === "1" || team === "0")){
            alert("Please select a team");
            return false;
        }

        if(bet == 0){
            alert("Please enter an amount");
            return false;
        }
        

        var req = {
            username:document.cookie,
            gameID:gameID,
            TeamNumber:team,
            Bets:bet
        };

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

            if(data.message === "true"){
                window.location.href = '/AfterLoginPage';
            }
            else{
                alert(data.message);
            }


            console.log(data)
            
        });

        return false;
    };



});