const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const folderName = "db";
const fileName = "contacts.json";

const contactsPath = path.join(__dirname, folderName, fileName);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    if (contacts) {
      return contacts;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Reading contact list error:", error.message);
    return [];
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      return contact;
    } else {
      return null;
    }
  } catch (error) {
    console.log("Getting contact by id error:", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(
      (contact) => contact.id === contactId
    );
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    if (!contactToRemove) {
      return null;
    } else {
      return contactToRemove;
    }
  } catch (error) {
    console.log("Removing contact error:", error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return newContact;
  } catch (error) {
    console.log("Adding contact error:", error.message);
  }
};

module.exports = { listContacts, getContactById, removeContact, addContact };
