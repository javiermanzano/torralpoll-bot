const getOptions = (commandOptions) => {
  return commandOptions.map(commandOption => commandOption.replace(/"/g,''));
};

const processResponseDecorator = ({ torralbotCommand, options }) => ({ text }) => ({
  torralbotCommand,
  options,
  text,
});

const process = ({ command }) => {
  const splittedCommand = command.split(' ');
  const torralbotCommand = splittedCommand[0];
  let options = [];
  if (splittedCommand.length > 1) {
    options = getOptions(splittedCommand.slice(1));
  }
  console.log({ options })
  const responseGenerator = processResponseDecorator({ options, torralbotCommand });
  if (torralbotCommand === 'help') {
    return responseGenerator({
      text: `Hi! :wave: \n I'm the most fair & easy poll creator \n 100% secure. No manipulation allowed`,
    });
  } else if (torralbotCommand === 'create') {
    return responseGenerator({
      text: `New poll created. Let's vote: http://torralbot.com/8uusn28J`,
    });
  } else {
    return {
      text: `Command not found. Use one of the following commands: *create*, *help*, *list* or *status*`,
    }
  }
};


module.exports = {
  process,
  getOptions,
};