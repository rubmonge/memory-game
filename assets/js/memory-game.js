function in_array(needle, haystack, argStrict) {
   var key = '', strict = !!argStrict;
   if (strict) {
      for (key in haystack) {
         if (haystack[key] === needle) {
            return true;
         }
      }
   } else {
      for (key in haystack) {
         if (haystack[key] == needle) {
            return true;
         }
      }
   }
   return false;
}

memoryGame = function () {
   this.main = function () {
      /* posibilidades en estos dos parametros: 
       * same=2 | num=8  ---> cardallocation.length=4 
       * same=3 | num=12 ---> cardallocation.length=4
       * same=4 | num=16 ---> cardallocation.length=4
       * 
       * same=2 | num=6  ---> cardallocation.length=3
       * same=3 | num=9  ---> cardallocation.length=3
       * same=4 | num=12 ---> cardallocation.length=3
       * 
       * Así que la formula seria:
       * numOfCards = sameCardsToCompare * cardAllocation.length 
       */
      this.sameCardsToCompare = 2;
      this.numOfCards = 8;
      this.cardAllocation = new Array(0, 0, 0, 0);
      this.cards = [];
      this.visibleCards = [];
      this.matchedCards = [];
      this.patternToImages = 'assets/cards/#.png';

      this.initBoard();
   };
   this.initBoard = function () {
      for (var i = 0; i < this.numOfCards; i++) {
         this.initCard(i);
      }
   };
   this.initCard = function (i) {
      this.cards[i] = new memoryCard(i);
      this.cards[i].setCardFrontImage(this.patternToImages.replace('#', 'reverso'));
      this.cards[i].setCardBackImage(this.patternToImages.replace('#', this.getRandomImageForCard()));
      this.cards[i].main();
      this.addEventOnCard(i);

   };
   this.getRandomImageForCard = function () {
      /* Controlamos que para cada posición del array de localización no haya más que los permitidos
       * por 'sameCardsToCompare
       */
      var randomNumber = Math.floor((Math.random() * this.cardAllocation.length));
      while (this.cardAllocation[randomNumber] >= this.sameCardsToCompare) {
         randomNumber = randomNumber + 1;
         if (randomNumber >= this.cardAllocation.length) {
            randomNumber = 0;
         }
      }
      this.cardAllocation[randomNumber] = this.cardAllocation[randomNumber] + 1;
      return parseInt(randomNumber) + 1;
   };
   this.addEventOnCard = function (i) {
      var oMG = this;
      $(oMG.cards[i].card.layerId).flip({trigger: 'manual'});
      $(oMG.cards[i].card.layerId).on('click', function () {         
         oMG.cards[i].toggleCardStatus();
         if (oMG.cards[i].getCardStatus() === 'back') {
            $(oMG.cards[i].card.layerId).flip(true);
            oMG.addCardToVisibleCards(i);
         } else {
            $(oMG.cards[i].card.layerId).flip(false);
         }
      });
   };
   /**
    * Con este método comparamos las cartas visibles.
    * Si son iguales se quedan levantadas, sino, se vuelven a girar.
    * @returns {undefined}
    */
   this.checkMatch = function () {

      if (this.visibleCards.length === this.sameCardsToCompare) {            
         var cardsMatch = true;
         var firstIndex = this.visibleCards[0];
         var backImage = this.cards[firstIndex].getCardBackImage();

         for (var k in this.visibleCards) {
            var cardIndex = this.visibleCards[k];
            if (this.cards[cardIndex].getCardBackImage() !== backImage) {
               /* con que una imagen no sea igual ya no son iguales :( */
               cardsMatch = false;
            }
         }
         if (!cardsMatch) {
            for (var k in this.visibleCards) {
               var cardIndex = this.visibleCards[k];
               this.unlockCard(cardIndex);
               this.unFlipPostNotMatch(cardIndex);
            }
         } else {
            for (var k in this.visibleCards) {
               var cardIndex = this.visibleCards[k];
               this.matchedCards.push(cardIndex);
            }
            if (this.matchedCards.length === this.numOfCards) {
               alert("EY HAS GANADO!");
            }
         }
         this.emptyVisibleCards();        
      }

   };
   this.unFlipPostNotMatch = function (i) {
      var oMG = this;
      setTimeout(function () {
         $(oMG.cards[i].card.layerId).trigger("click");
      }, 1000);
   };
   this.addCardToVisibleCards = function (i) {
      this.visibleCards.push(i);
      this.lockCard(i);
      this.checkMatch();
   };
   this.emptyVisibleCards = function () {
      this.visibleCards = [];
   };
   this.lockCard = function (i) {      
      this.cards[i].setCardLocked(true);
      $(this.cards[i].card.layerId).off('click');      
   };
   this.unlockCard = function (i) {      
      this.cards[i].setCardLocked(false);
      this.addEventOnCard(i);
   };
  
};
