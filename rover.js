class Rover {
   // Write code here!
  constructor (position, mode = "NORMAL", generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(inMessage) {
    let replyMessage = {
      message: inMessage.name,
      results: []
    }
     
    for (let i=0; i < inMessage.commands.length; i++) {
      let msgCommand = incomingMessage.commands[i];
      let response = {completed:true,roverStatus:""};
      
      if (msgCommand.commandType === `MOVE`) {
        if(this.mode === `NORMAL`) {
          response.completed = true;
          replyMessage.results.push(response);
          this.position = msgCommand.value;
        } else if (this.mode === `LOW_POWER`) {
            response.completed = false;
            replyMessage.results.push(response);
          }
      } else if (msgCommand.commandType === `STATUS_CHECK`) {
          response.completed = true;
          response.roverStatus = {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position};
          replyMessage.results.push(response);
        } else if (msgCommand.commandType === `MODE_CHANGE`) {
            if (msgCommand.value === `LOW_POWER` || msgCommand.value === `NORMAL`) {
              this.mode = msgCommand.value
            }
            response.completed = true
            replyMessage.results.push(response)
          } else {
            response.completed = false
            replyMessage.results.push(response)
          }
    }

    return returnMessage
  }
}

module.exports = Rover;