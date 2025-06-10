const productBrandData = require("../models/ProductBrand")
const s3 = require("../utils/S3")
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const AddProductBrand = async (req, res) => {
  try {
    const { brandName } = req.body;
    const file = req.file;

    let imageUrl = "";

    if (file) {
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
      imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    }
    const savedproductbrand = new productBrandData({ brandName, brandImage: imageUrl })
    const result = await savedproductbrand.save()
    res.status(201).json(result)
  } catch (error) {
    console.log(error)
  }  
}
const GetProductBrand = async (req, res) => {
  try {
    const getproductbrand = await productBrandData.find()
    res.status(201).json(getproductbrand)
  } catch (error) {
    console.log(error)
  }
}
const UpdateProductBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const { brandName } = req.body;
    const file = req.file
  
    let updateData = { brandName };

    if (file) {
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
      updateData.brandImage = imageUrl;
    }
    const response = await productBrandData.findByIdAndUpdate(id, updateData, { new: true });
    if (!response) {
      return res.status(404).json({ message: "Product brand not found." });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating product brand." });
  }
}

const DeleteProductBrand = async (req, res) => {
  try {
    const id = req.params.id
    await productBrandData.findByIdAndDelete(id)
    res.status(200).send("Customer deleted");
  } catch (error) {
    console.log(error)
  }
}

module.exports = { AddProductBrand, GetProductBrand, DeleteProductBrand, UpdateProductBrand }