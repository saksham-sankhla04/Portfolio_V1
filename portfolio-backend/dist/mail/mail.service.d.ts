import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { SendMailDto } from './dto/send-mail.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';
export declare class MailService {
    private configService;
    private contactModel;
    private resend;
    constructor(configService: ConfigService, contactModel: Model<ContactDocument>);
    sendMail(sendMailDto: SendMailDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getAllContacts(): Promise<Contact[]>;
}
