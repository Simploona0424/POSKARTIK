const productData = require("../models/Product");
const s3 = require("../utils/S3")
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const AddProduct = async (req, res) => {
    try {
        const { productName, skuid, productstock, minstock, sellingPrice, categorie, subcategorie, productbrand } = req.body;
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
                ACL: "public-read",
            }
            await s3.send(new PutObjectCommand(params))
            imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

        }

        const savedData = new productData({ productName, skuid, productstock, minstock, sellingPrice, categorie, subcategorie, productbrand, productImage: imageUrl });
        const result = await savedData.save()
        res.status(201).json(result)
    } catch (error) {
        console.log(error)
    }
}

const GetProduct = async (req, res) => {
    try {
        const response = await productData.find()
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
    }
}

const UpdateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { productName, skuid, productstock, minstock, sellingPrice, categorie, subcategorie, productbrand } = req.body;
        const file = req.file

        let updateData = { productName, skuid, productstock, minstock, sellingPrice, categorie, subcategorie, productbrand }

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
            updateData.productImage = imageUrl;
        }
        const response = await productData.findByIdAndUpdate(id, updateData, { new: true })
        res.status(201).json(response)
    } catch (error) {
        console.log(error)
    }
}

const DeleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        await productData.findByIdAndDelete(id);
        res.status(200).send("delete successfull...")
    } catch (error) {
        console.log(error)
    }
}
module.exports = { AddProduct, GetProduct, UpdateProduct, DeleteProduct }