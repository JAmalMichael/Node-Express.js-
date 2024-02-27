const expressAsyncHandler = require("express-async-handler");
const Contact = require("../models/contactmodel");


//desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = expressAsyncHandler (async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
     
});

//desc Get a contact
//@route GET /api/contacts
//@access private
const getContact = expressAsyncHandler (async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//desc Create new contact
//@route POST /api/contacts
//@access private
const createContact = expressAsyncHandler (async (req, res) => {
    const contact = await Contact.create({name, email, phone, user: req.user.id})
    console.log(req.body);
    res.status(200).json(contact);
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
});

//desc Update contact
//@route PUT /api/contacts
//@access private
const updateContact = expressAsyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.if){
        res.status(403);
        throw new Error("User dont have permission")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

//desc Delete contact
//@route DELETE /api/contacts
//@access private
const deleteContact = expressAsyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.if){
        res.status(403);
        throw new Error("User dont have permission")
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContacts, getContact, createContact,
     updateContact, deleteContact};


