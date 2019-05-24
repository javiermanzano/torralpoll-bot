const restClient = require('./rest-client');

const COMMAND_TEXT_MAPPER = {
  help: () => `Hi! :wave: \n I'm the most fair & easy poll creator \n 100% secure. No manipulation allowed`,
  create: () => `New poll created. Let's vote: `,
  status: () => `Here are the results:`,
  list: () => `All the available polls`,
};

const COMMAND_HANDLERS = {
  help: async () => {},
  create: async ({ arguments }) => {
    console.log('--> requesting poll URL with options', { arguments });
    try {
      const response = await restClient.post({ url: 'create', body: {options: arguments} })
      console.log({ response });
      return response.url;
    } catch(err) {
      console.error(err);
    }
  },
  status: async ({ arguments }) => {
    console.log('--> requesting poll status', arguments);
    const id = arguments[0];
    const response = await restClient.get({ url: `${id}/details` })
    const jsonBody = JSON.parse(response);
    console.log({ jsonBody });
    const text = jsonBody.options.map(option => {
      const hasVotes = option.votes.length > 0;
      const votesList = `(${option.votes.join(', ')})`;
      return `${option.name} -> ${option.votes.length} votes ${hasVotes ? votesList: ''}`;
    });
    return text.join('\n');
  },
  list: async () => () => {
    console.log('--> requesting polls list');
  },
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

const handle = async ({ torralbotCommand, arguments }) => {
  return await COMMAND_HANDLERS[torralbotCommand]({ arguments });
}

module.exports = {
  process,
  getArguments,
  handle,
};