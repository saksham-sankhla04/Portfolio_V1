"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
const contact_schema_1 = require("./schemas/contact.schema");
let MailService = class MailService {
    configService;
    contactModel;
    transporter;
    constructor(configService, contactModel) {
        this.configService = configService;
        this.contactModel = contactModel;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get('GMAIL_USER'),
                pass: this.configService.get('GMAIL_APP_PASSWORD'),
            },
        });
    }
    async sendMail(sendMailDto) {
        const { from, subject, body, name, phone } = sendMailDto;
        const contact = new this.contactModel({
            name: name || '',
            email: from,
            phone: phone || '',
            subject,
            message: body,
        });
        await contact.save();
        const mailOptions = {
            from: this.configService.get('GMAIL_USER'),
            to: this.configService.get('GMAIL_USER'),
            replyTo: from,
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #677f3f;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #eee;">
          <p><strong>Name:</strong> ${name || 'Not provided'}</p>
          <p><strong>Email:</strong> ${from}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 1px solid #eee;">
          <h3>Message:</h3>
          <p style="background: #f6f7f9; padding: 15px; border-radius: 8px;">${body}</p>
          <hr style="border: 1px solid #eee;">
          <p style="color: #888; font-size: 12px;">This email was sent from your portfolio contact form.</p>
        </div>
      `,
        };
        try {
            await this.transporter.sendMail(mailOptions);
            return { success: true, message: 'Email sent and saved successfully' };
        }
        catch (error) {
            console.error('Error sending email:', error);
            return {
                success: true,
                message: 'Message saved. Email notification failed.',
            };
        }
    }
    async getAllContacts() {
        return this.contactModel.find().sort({ createdAt: -1 }).exec();
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(contact_schema_1.Contact.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], MailService);
//# sourceMappingURL=mail.service.js.map