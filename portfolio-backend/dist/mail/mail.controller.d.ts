import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendMail(sendMailDto: SendMailDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
