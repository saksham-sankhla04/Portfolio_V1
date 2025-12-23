import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { SendMailDto } from './dto/send-mail.dto';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor(
    private configService: ConfigService,
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
  ) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'));
  }

  async sendMail(
    sendMailDto: SendMailDto,
  ): Promise<{ success: boolean; message: string }> {
    const { from, subject, body, name, phone } = sendMailDto;

    // Save to MongoDB
    const contact = new this.contactModel({
      name: name || '',
      email: from,
      phone: phone || '',
      subject,
      message: body,
    });
    await contact.save();

    // Send email notification via Resend
    try {
      const { data, error } = await this.resend.emails.send({
        from: this.configService.get<string>('RESEND_FROM_EMAIL')!,
        to: this.configService.get<string>('NOTIFICATION_EMAIL')!,
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
      });

      if (error) {
        console.error('Resend error:', error);
        return {
          success: true,
          message: 'Message saved. Email notification failed.',
        };
      }

      console.log('Email sent successfully:', data?.id);
      return { success: true, message: 'Email sent and saved successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      // Still return success since data is saved to MongoDB
      return {
        success: true,
        message: 'Message saved. Email notification failed.',
      };
    }
  }

  async getAllContacts(): Promise<Contact[]> {
    return this.contactModel.find().sort({ createdAt: -1 }).exec();
  }

  // async getContactById(id: string): Promise<Contact> {
  //   return this.contactModel.findById(id).exec();
  // }

  // async markAsRead(id: string): Promise<Contact> {
  //   return this.contactModel
  //     .findByIdAndUpdate(id, { isRead: true }, { new: true })
  //     .exec();
  // }
}
