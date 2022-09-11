import Product from "../models/ProductModel.js";
import path from "path"
import fs from "fs";
export const getProducts=async(req,res)=>{
try{
    const response =await Product.findAll();
    res.json(response)
}
catch(error){
    console.log(error.message)
}
}
export const getProductById=async(req,res)=>{
    try{
        const response =await Product.findOne({
            where:{
                id:req.params.id
            }
        });
        res.json(response)
    }
    catch(error){
        console.log(error.message)
    }
}
export const saveProduct=async(req,res)=>{
    if(req.files===null)return res.status(400).json({msg:"No file uploaded"});
    const name=req.body.title;
    const file=req.files.file;
    console.log(file)
    const fileSize=file.data.length;
    const ext = path.extname(file.name);
    console.log(ext)

    const fileName=file.md5+ext;
const url =`${req.protocol}://${req.get("host")}/images/${fileName}`;
console.log(url)

    const allowedType=['.png','.jpg','.jpeg'];
    if(!allowedType.includes(ext.toLocaleLowerCase()))return res.status(422).json({msg:"Invalid Images"})
    if(fileSize>5000000)return res.status(422).json({msg:"image must be less than 5 mb"})
    file.mv(`./public/images/${fileName}`,async(err)=>{
        if(err) return res.status(500).json({msg:err.message});
        try{
            await Product.create({name:name,image:fileName,url:url});
            res.status(201).json({msg:"Product Created Successfully"})
        }
        catch{
            console.log(error.message)
        }
    })
}
export const updateProduct= async(req,res)=>{
    const product =await Product.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!product) return res.status(404).json({msg:" No Data found"});
    let fileName="";
    if(req.files===null){
        fileName=Product.image
    }else{
        const file=req.files.file;
        console.log(file)
        const fileSize=file.data.length;
        const ext = path.extname(file.name);
        fileName=file.md5+ext;
        const allowedType=['.png','.jpg','.jpeg'];
        if(!allowedType.includes(ext.toLocaleLowerCase()))return res.status(422).json({msg:"Invalid Images"})
        if(fileSize>5000000)return res.status(422).json({msg:"image must be less than 5 mb"})


        file.mv(`./public/images/${fileName}`,(err)=>{
            if(err) return res.status(500).json({msg:err.message});
          
        })
    }
    const name=req.body.title;
    const url =`${req.protocol}://${req.get("host")}/images/${fileName}`;
try{

}
catch(error){
    fileName=Product.image

}
}
export const deleteProduct=async (req,res)=>{
    const product =await Product.findOne({
        where:{
            id:req.params.id
        }
    });
    if(!product) return res.status(404).json({msg:" No Data found"});
    try{
const filepath =`./public/images/${product.image}`;
await Product.destroy({
    where:{
        id:req.params.id
    }
});
fs.unlinkSync(filepath)

res.status(200).json({msg:"Product deleted suscfflly"})
    }
    catch(error){

    }
}