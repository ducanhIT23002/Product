import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { Request, Response, NextFunction } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,        
  api_secret: process.env.CLOUDINARY_API_SECRET   
});

export const uploadImg = async (req: Request, res: Response, next: NextFunction) => {
    const file = (req as any).file;
    if (!file) {
        next();
        return 
    } 

    const streamUpload = (buffer: Buffer) =>
        new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "product" },
                (error, result) => error ? reject(error) : resolve(result)
            );
            streamifier.createReadStream(buffer).pipe(stream);
        });

    try {
        const result: any = await streamUpload(file.buffer);
        // Gán URL vào req.body để controller dùng tiếp
        req.body.image = result.secure_url;
        next(); // chuyển tiếp sang controller
    } catch (err: any) {
         res.status(500).json({ error: err.message });
    }
};