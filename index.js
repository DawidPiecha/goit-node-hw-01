const colors = require("colors");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      console.log(
        "\n" +
          "This is the table of all available contacts:".toUpperCase().america +
          "\n"
      );
      console.table(contactsList);
      break;

    case "get":
      const contact = await getContactById(id);
      if (contact === null) {
        console.error(
          "\n" + `Sorry. There's no contact with ${id} in database!`.red + "\n"
        );
      } else {
        console.log(
          "\n" + `This is a table of contact with id ${id} :`.bgGreen + "\n"
        );
        console.table(contact);
      }
      break;

    case "add":
      const contactToAdd = await addContact(name, email, phone);
      console.log(
        "\n" + `Added contact data for ${name} successfully!`.america + "\n"
      );
      console.table(contactToAdd);
      break;

    case "remove":
      const contactToRemove = await removeContact(id);
      if (contactToRemove === null) {
        console.error(
          "\n" + `Sorry. There's no contact with ${id} to remove!`.red + "\n"
        );
      } else {
        console.log(
          "\n" + `Removed contact with id ${id} successfully!`.green + "\n"
        );
        console.table(contactToRemove);
      }
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
