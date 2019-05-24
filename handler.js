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
  console.log({ arguments })
  const responseGenerator = processResponseDecorator({ arguments, torralbotCommand });
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
  getArguments,
};