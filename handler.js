const COMMAND_TEXT_MAPPER = {
  help: () => `Hi! :wave: \n I'm the most fair & easy poll creator \n 100% secure. No manipulation allowed`,
  create: () => `New poll created. Let's vote: http://torralbot.com/8uusn28J`,
  status: () => `Here are the results: http://torralbot.com/8uusn28J`,
  list: () => `All the available polls`,
};

const AVAILABLE_COMMANDS = Object.keys(COMMAND_TEXT_MAPPER);

const getArguments = (commandArguments) => (
  commandArguments.map(commandOption => commandOption.replace(/"/g,''))
);

const processResponseDecorator = ({ torralbotCommand, arguments }) => ({ text }) => ({
  torralbotCommand,
  arguments,
  text,
});

const process = ({ command }) => {
  const splittedCommand = command.split(' ');
  const torralbotCommand = splittedCommand[0];
  let arguments = [];
  if (splittedCommand.length > 1) {
    arguments = getArguments(splittedCommand.slice(1));
  }
  const responseGenerator = processResponseDecorator({ arguments, torralbotCommand });
  if (AVAILABLE_COMMANDS.indexOf(torralbotCommand)) {
    return responseGenerator({
      text: COMMAND_TEXT_MAPPER[torralbotCommand]()
    });
  } else {
    return {
      text: `Command not found. Use one of the following commands: *create*, *help*, *list* or *status*`,
    }
  }
};


module.exports = {
  process,
  getArguments,
};