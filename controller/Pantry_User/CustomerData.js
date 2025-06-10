const customerData = require("../../models/Pantry_User/CustomerData")
const AllcustomerData = require("../../models/Pantry_User/SaveAllCustomerData")
const AddCustomer = async (req, res) => {
    try {
        const savedData = new customerData(req.body)
        const result = await savedData.save();
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const SaveAllCustomer = async (req, res) => {
    try {
        const savedData = new AllcustomerData(req.body)
        const result = await savedData.save();
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const GetCustomer = async (req, res) => {
    try {
        const result = await customerData.find()
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const GetAllCustomer=async(req,res)=>{
      try {
        const result = await AllcustomerData.find()
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const PatchCustomer = async (req, res) => {
    const { customerId, itemId } = req.params;
    const { delta } = req.body;
    try {
        const customer = await customerData.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const item = customer.ordersetList.id(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        item.count = Math.max(1, Number(item.count) + Number(delta));
        await customer.save();
        res.status(200).json({ message: "Item count updated", customer });
    } catch (error) {
        console.log(error)
    }
}

const AllPatchCustomer = async (req, res) => {
    const { customerId, itemId } = req.params;
    const { delta } = req.body;
    try {
        const customer = await AllcustomerData.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const item = customer.ordersetList.id(itemId);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        item.count = Math.max(1, Number(item.count) + Number(delta));
        await customer.save();
        res.status(200).json({ message: "Item count updated", customer });
    } catch (error) {
        console.log(error)
    }
}

const UpdateSubcategorieCustomer = async (req, res) => {
    const { customerId } = req.params; // customerID
    const { itemId, delta } = req.body;

    try {
        const customer = await customerData.findOne({ customerID: customerId });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const item = customer.ordersetList.find(
            (item) => item._id.toString() === itemId.toString()
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found in ordersetList" });
        }

        // Safely parse and update the count
        const newCount = Math.max(1, Number(item.count || 0) + Number(delta));
        item.count = String(newCount);

        await customer.save();

        return res.status(200).json({ message: "Item count updated", customer });
    } catch (error) {
        console.error("Error updating subcategory count:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


const PutCustomerData = async (req, res) => {
    const { customerId } = req.params;
    const { ordersetList } = req.body;   

    try {
        const customer = await customerData.findOne({ customerID: customerId });

        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        for (const newItem of ordersetList) {
            const existingItem = customer.ordersetList.find(item => item._id.toString() === newItem._id.toString());

            const incomingCount = Number(newItem.count || 1);

            if (existingItem) {

                existingItem.count = String(Number(existingItem.count || 0) + incomingCount);
            } else {

                customer.ordersetList.push({
                    ...newItem,
                    count: String(incomingCount)
                });
            }
        }

        await customer.save();

        return res.status(200).json({ message: "Orders processed successfully", customer });
    } catch (error) {
        console.error("Error updating customer orders:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


const DeleteCustomer = async (req, res) => {
    const { customerId, itemId } = req.params;
    try {
        const customer = await customerData.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        customer.ordersetList = customer.ordersetList.filter((item) => item._id.toString() !== itemId)
        await customer.save();
        res.status(200).json({ message: "Item deleted successfully", customer });
    } catch (error) {
        console.log(error)
    }
}
const DeleteCurrentCustomer = async (req, res) => {
    try {
        const id = req.params.id
        await customerData.findByIdAndDelete(id);
        res.status(201).send("delete")
    } catch (error) {
        console.log(error)
    }
}
module.exports = { AddCustomer,GetAllCustomer, SaveAllCustomer, GetCustomer, PatchCustomer,AllPatchCustomer, PutCustomerData, DeleteCustomer, UpdateSubcategorieCustomer, DeleteCurrentCustomer }
