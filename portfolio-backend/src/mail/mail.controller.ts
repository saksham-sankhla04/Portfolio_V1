import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { MailService } from './mail.service';
import { SendMailDto } from './dto/send-mail.dto';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('sendMail')
  async sendMail(@Body() sendMailDto: SendMailDto) {
    try {
      const result = await this.mailService.sendMail(sendMailDto);
      return result;
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to send email' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
