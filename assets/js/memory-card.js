memoryCard = function (id) {
   this.board = $('#board');
   this.card = {
      id: 'card-' + id,
      layerId: '#card-' + parseInt(id),
      frontImage: null,
      backImage: null,
      status: 'front',
      locked: false
   };
   this.main = function () {

      this.board.append(tmpl("tmpl-card", this.card));

   };
   this.toggleCardStatus = function () {
      if (this.getCardStatus() === 'front') {
         this.setCardStatus('back');
      } else {
         this.setCardStatus('front');
      }
   };
   this.getCardStatus = function () {
      return this.card.status;
   };
   this.setCardStatus = function (status) {
      /*console.log("setCardStatus de:" + this.card.status + " a:" + status + " del card:" + this.card.id);*/
      this.card.status = status;
   };
   this.getCardId = function () {
      return this.card.id;
   };
   this.setCardFrontImage = function (fronImage) {
      this.card.frontImage = fronImage;
   };
   this.getCardBackImage = function () {
      return this.card.backImage;
   };
   this.setCardBackImage = function (backImage) {
      this.card.backImage = backImage;
   };
   this.getCardData = function () {
      return this.card;
   };
   this.setCardLocked = function (locked) {
      /*console.log("setCardLocked de:" + this.card.locked + " a:" + locked + " del card:" + this.card.id);*/
      this.card.locked = locked;
   };
   this.getCardLocked = function () {
      return this.card.locked;
   };

};