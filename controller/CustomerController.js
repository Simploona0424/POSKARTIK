const customerData = require("../models/Customer")

const postCustomers = async (req, res) => {
   try {
      const baseURL = "https://poskartik.onrender.com/uploads/";
      const personalproof = req.files?.personalproof ? `${baseURL}${req.files.personalproof[0].filename}` : null;
      const businessProof = req.files?.businessProof ? `${baseURL}${req.files.businessProof[0].filename}` : null;
      // const personalproof = req.files['personalproof']?.[0]?.path || null;
      // const businessProof = req.files['businessProof']?.[0]?.path || null;
      const { customerType, companyName, concernPerson, emailID, phoneNO, location, rMcode, address1, address2, city, state, pincode, gstno, newRows } = req.body
      const parsednewRows = JSON.parse(newRows);
      const adminproduct = new customerData({ customerType, companyName, concernPerson, emailID, phoneNO, location, rMcode, address1, address2, city, state, pincode, gstno, newRows: parsednewRows, personalproof, businessProof });
      const savedcustomerData = await adminproduct.save();
      res.status(201).json(savedcustomerData);
   } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).send("Server error");
   }
}
const getCustomers = async (req, res) => {
   try {
      const savedcustomerData = await customerData.find();
      res.status(201).json(savedcustomerData);
   } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).send("Server error");
   }
}

const updateCustomers = async (req, res) => {
   try {
      const { id } = req.params
      const { customerType, companyName, concernPerson, emailID, phoneNO, location, rMcode, address1, address2, city, state, pincode, gstno, newRows, personalproof, businessProof } = req.body;
      const parsedNewRows = newRows ? JSON.parse(newRows) : [];
      const baseURL = "https://poskartik.onrender.com/uploads/";
      const personalProof = req.files?.personalproof ? `${baseURL}${req.files.personalproof[0].filename}` : null;
      const businessproof = req.files?.businessProof ? `${baseURL}${req.files.businessProof[0].filename}` : null;
      const savedcustomerData = await customerData.findByIdAndUpdate(id, { customerType, companyName, concernPerson, emailID, phoneNO, location, rMcode, address1, address2, city, state, pincode, gstno, newRows: parsedNewRows, personalproof: personalProof || undefined, businessProof: businessproof || undefined }, { new: true });
      res.status(201).json(savedcustomerData);
   } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).send("Server error");
   }
}

const deleteCustomers = async (req, res) => {
   try {
      const id = req.params.id;
      await customerData.findByIdAndDelete(id);
      res.status(200).send("Customer deleted");
   } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).send("Server error");
   }
}

module.exports = { postCustomers, getCustomers, updateCustomers, deleteCustomers }  