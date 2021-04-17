const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!

//Test #7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let marsRover = New rover(9825382);
    expect(marsRover.mode).toEqual('NORMAL');
    expect(marsRover.generatorWatts).toEqual(110);
    expect(marsRover.power).toEqual(9825382);
  });

//Test #8
  it("response returned by receiveMessage contains name of message", function() {
    let marsRover = new rover(2838159);
    let roverCommands = [new Command(`MODE_CHANGE`, `LOW_POWER`)];
    let roverMessage = new Message('Message from Rover.', roverCommands);
    let response = marsRover.receiveMessage(roverMessage);
    expect(response.message).toEqual(roverMessage.name);
  });

//Test #9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let marsRover = new Rover(4568915)
    let commands = [new Command(`MODE_CHANGE`, `NORMAL`), new Command('STATUS_CHECK')]
    let roverMessage =  new Message(`Message from Rover with 2 commands.`, commands)
    let response = marsRover.receiveMessage(roverMessage)
    expect(response.results.length).toEqual(2)
  });

//Test #10
  it(`responds correctly to status check command`, function() {
    let marsRover = new Rover(2576734)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('STATUS_CHECK')]
    let roverMessage =  new Message(`Message for Rover`, commands)
    let response = marsRover.receiveMessage(roverMessage)
    let statusUpdate = responseMessage.results[1]
    expect(response.results[1].roverStatus.mode).toEqual(`LOW_POWER`);
    expect(response.results[1].roverStatus.generatorWatts).toEqual(110)
    expect(response.results[1].roverStatus.position).toEqual(2576734)
  })

//Test #11
  it(`responds correctly to mode change command`, function () {
    let marsRover = new Rover(985623);
    let commands = [new Command(`MODE_CHANGE`, `NORMAL`), new Command('STATUS_CHECK')];
    let roverMessage =  new Message(`Message for rover`, commands);
    let response = marsRover.receiveMessage(roverMessage);
    expect(marsRover.mode).toEqual(`NORMAL`);
  });

//Test #12
  it(`responds with false completed value when attempting to move in LOW_POWER mode`, function() {
    let marsRover = new Rover(985623)
    let commands = [new Command(`MODE_CHANGE`, `LOW_POWER`), new Command('MOVE',842658)]
    let roverMessage =  new Message(`Message for rover`, commands)
    let response = marsRover.receiveMessage(roverMessage)
    expect(response.results[1].completed).toEqual(false)
  });

//Test #13
  it (`responds with position for move command`, function() {
    let marsRover = new Rover(8426548)
    let commands = [new Command('MOVE',4526535)]
    let roverMessage =  new Message(`Message for rove`, commands)
    let response = marsRover.receiveMessage(roverMessage)
    expect(marsRover.position).toEqual(4526535)
  });

});

