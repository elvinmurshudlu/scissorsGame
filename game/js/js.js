if (player1Choice === player2Choice  && (player1Choice === player3Choice || morePlayer)  ) {
    
    showMessage("Draw!");
  } 
  else if(player1Choice === player3Choice){
    showMessage("Player and Bot2 Draw")
  }
  
  else if (player1Strength.includes(player2Choice) && (player1Strength.includes(player3Choice) || morePlayer)) {
    showMessage("Player is winner !");
    addScore(player1Score);
  }  
  else {
    let totalStrength = player1Strength.concat(player2Strength).concat(player3Strength)
    if(totalStrength.includes(player1Choice) && totalStrength.includes(player2Choice) && totalStrength.includes(player3Choice) ){
      showMessage("Qarşılıqlı uduzmaq")
    }
    else if(morePlayer || player2Strength.includes(player3Choice)){
      showMessage("Bot is winner !");
      addScore(player2Score);

    }else if(morePlayer || player2Choice===player3){
      showMessage("Bot2 and Bot1 draw");

    }
    
    
    else{
      showMessage("Bot2 is winner !");

    }

}