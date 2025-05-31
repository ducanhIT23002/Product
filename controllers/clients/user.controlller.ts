import { Request, Response } from "express";
import User from "../../model/user.model";
import UserAmin from "../../model/user-admin.model";
import { createTokenUser } from "../../helpers/createToken";
export const login = async (req: Request, res: Response) => {
   const email = req.body.email
   const password = req.body.password


   const admin = await UserAmin.findOne({
      where: {
         deleted: false,
         email: email,
         password: password
      },
      raw: true,
   })

   if (admin) {
      res.json(admin)
      return
   }


   const data = await User.findOne({
      where: {
         deleted: false,
         email: email,
         password: password
      },
      attributes: ['email', 'phone', 'tokenUser', 'fullName', 'id'],
      raw: true,
   })
   if (data) {
      res.json(data)
   } else {
      res.json({
         message: "đăng nhập không thành công"
      })
   }
}

export const register = async (req: Request, res: Response) => {
   const email = req.body.email
   const password = req.body.password
   const confirmPassword = req.body.confirmPassword
   const phone = req.body.phone
   const fullName = req.body.fullName
   const token = createTokenUser(8)

   const check = await User.findOne({
      where: {
         email: email
      },
      raw: true
   })

   if (check) {
      res.json({
         message: "email đã tồn tại"
      })
      return
   }


   if (confirmPassword === password) {
      const data = await User.create({
         fullName,
         email,
         password,
         phone,
         tokenUser: token,
      },
      );
      if (data) {
         res.json(data)
      } else {
         res.json({
            message: "đăng nhập không thành công"
         })
      }
   } else {
      res.json({
         message: "vui lòng confirm password hợp lệ"
      })
   }
}

export const deleteUser = async (req: Request, res: Response) => {
   const email = req.body.email
   if (email) {
      const data = await User.destroy({
         where: {
            email: email
         },
      })
      if (data) {
         res.json(true)
      } else {
         res.json({
            message: "đăng xuất không thành công"
         })
      }
   } else {
      res.json({
         message: "lỗi đăng xuất"
      })
   }

}