import { Request, Response } from 'express';
import Otp from '../../model/otp.model';
import { otp } from '../../helpers/otp';
import { sendMail } from '../../helpers/sendMail';

export const forgotPassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    const otpOld = await Otp.findOne({
        where: { email: email },
        raw: true
    });
    if (!otpOld) {
        const newOtp = otp();
        const model = await Otp.create({
            otp: newOtp,
            email,
            expiresAt: new Date(Date.now() + 60 * 1000)
        });
        if (model) {
            const subject = "Mã OTP xác minh lại mật khẩu"
            const html =`Mã OTP để lấy lại mật khẩu ${newOtp}`
            sendMail(email,subject,html)
            res.json(true);

        } else {
            res.json(false);
        }

        setTimeout(() => {
            Otp.destroy({ where: { otp: newOtp } });
            console.log("đã xóa OTP")
        }, 60 * 1000);
    } else {
        res.json(true);
    }
};


export const checkOTP = async (req: Request, res: Response) => {
    const email = req.body.email
    const otp = req.body.otp
    const checkOtp = await Otp.findOne({
        where: {
            otp: otp,
            email: email
        },
        raw: true
    });
    if (checkOtp) {
        res.json(true)
    } else {
        res.json(false)
    }
};

