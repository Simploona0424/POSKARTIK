const createUserModel = require("../models/CreateUser")
const s3 = require("../utils/S3")
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const AddUser = async (req, res) => {
    try {
        const { userName, employeeId, emailId, password, password2, jobrole, mobileNo, location } = req.body;
        const file = req.file;

        let imageUrl = "";

        if (file) {
            const fileName = Date.now() + "_" + file.originalname;
            const bucketName = process.env.AWS_BUCKET_NAME;

            const params = {
                Bucket: bucketName,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read"
            }
            await s3.send(new PutObjectCommand(params))
            imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        }
        const savedUser = new createUserModel({ userName, employeeId, emailId, password, password2, jobrole, mobileNo, location, userImage: imageUrl });
        const result = await savedUser.save();
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}

const GetUser = async (req, res) => {
    try {
        const result = await createUserModel.find();
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}

const UpdateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { userName, employeeId, emailId, password, password2, jobrole, mobileNo, location} = req.body;
        const file = req.file;
        let updateData ={userName, employeeId, emailId, password, password2, jobrole, mobileNo, location}
        if(file){
            const fileName = Date.now() + '_' + file.originalname;
            const bucketName = process.env.AWS_BUCKET_NAME;
      
            const params = {
              Bucket: bucketName, 
              Key: fileName,
              Body: file.buffer,
              ContentType: file.mimetype,
              ACL: 'public-read',
            };
      
            await s3.send(new PutObjectCommand(params));
      
            const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            updateData.userImage = imageUrl;
        }
        const result = await createUserModel.findByIdAndUpdate(id, updateData, { new: true })
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}
const DeleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await createUserModel.findByIdAndDelete(id);
        res.status(200).send("delete successfull")
    } catch (error) {
        console.log(error)
    }
}
module.exports = { AddUser, GetUser, UpdateUser, DeleteUser }