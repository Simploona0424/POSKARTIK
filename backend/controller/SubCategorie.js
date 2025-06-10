
const { Bucket } = require("@google-cloud/storage");
const SubCategorieData = require("../models/SubCategorie")
const s3 = require("../utils/S3")
const { PutObjectCommand } = require('@aws-sdk/client-s3');


const AddSubCategorie = async (req, res) => {
    try {
        const { selectCategory, subCategory } = req.body;
        const file = req.file;
        let imageUrl = "";
        if (file) {
            const fileName = Date.now() + "_" + file.originalname
            const bucketName = process.env.AWS_BUCKET_NAME

            const params = {
                Bucket: bucketName,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read"
            }
            await s3.send(new PutObjectCommand(params));
            imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
        }
        const savedsubcategorie = new SubCategorieData({ selectCategory, subCategory, subCategoryImage: imageUrl })
        const result = savedsubcategorie.save()
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}

const GetSubCategorie = async (req, res) => {
    try {
        const response = await SubCategorieData.find();
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
    }
}
const UpdateSubCategorie = async (req, res) => {
    try {
        const id = req.params.id;
        const { selectCategory, subCategory } = req.body;
        const file = req.file;
        let updateData = { selectCategory, subCategory }

        if (file) {
            const fileName = Date.now() + "_" + file.originalname
            const bucketName = process.env.AWS_BUCKET_NAME

            const params = {
                Bucket: bucketName,
                Key: fileName,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: "public-read"
            }
            await s3.send(new PutObjectCommand(params))
            const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
            updateData.subCategoryImage = imageUrl;
        }
        const response = await SubCategorieData.findByIdAndUpdate(id, updateData, { new: true });
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
    }
}
const DeleteSubCategorie = async (req, res) => {

    try {
        const id = req.params.id;
        await SubCategorieData.findByIdAndDelete(id);
        res.status(200).send("delete successfull")
    } catch (error) {
        console.log(error)
    }

}
module.exports = { AddSubCategorie, GetSubCategorie, UpdateSubCategorie, DeleteSubCategorie }