const CategorieData = require("../models/Categorie")
const s3 = require("../utils/S3")
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const AddCategorie = async (req, res) => {
   try {
      const { categorieName, gst } = req.body;
      const file = req.file;
      let imageUrl = "";

      if (file) {
         const fileName = Date.now() + "_" + file.originalname;
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
      const savedCategorie = new CategorieData({ categorieName, gst, categorieImage: imageUrl });
      const result = await savedCategorie.save();
      res.status(201).json(result)
   } catch (error) {
      console.log(error)
   }
}

const GetCategorie = async (req, res) => {
   try {
      const getcategorie = await CategorieData.find();
      res.status(201).json(getcategorie)
   } catch (error) {
      console.log(error)
   }
}
const UpdateCategorie = async (req, res) => {

   try {
      const id = req.params.id
      const { categorieName, gst } = req.body
      const file = req.file

      let updateData = { categorieName, gst }

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
         updateData.categorieImage = imageUrl;
      }

      const getcategorie = await CategorieData.findByIdAndUpdate(id,updateData, { new: true });
      res.status(201).json(getcategorie)
   } catch (error) {
      console.log(error)
   }
}
const DeleteCategorie = async (req, res) => {

   try {
      const id = req.params.id

      await CategorieData.findByIdAndDelete(id);
      res.status(201).send("delete")
   } catch (error) {
      console.log(error)
   }
}
module.exports = { AddCategorie, GetCategorie, UpdateCategorie, DeleteCategorie }  