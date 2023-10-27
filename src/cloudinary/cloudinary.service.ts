import { Injectable } from "@nestjs/common";
import { CloudinaryResponse } from "../model/response.model";
import { v2 as cloudinary } from "cloudinary";
import { createReadStream } from "streamifier";

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) {
            return reject(error);
          }

          if (!result) {
            return reject("Something went wrong with cloudinary");
          }

          resolve(result);
        },
      );

      createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
