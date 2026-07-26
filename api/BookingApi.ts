import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import type { Booking } from './types/Booking';

export class BookingApi {
  constructor(private readonly request: APIRequestContext) {}

  async getAllBookings(): Promise<APIResponse> {
    const response = await this.request.get('/booking');

    await expect(response).toBeOK();

    return response;
  }

  async getBookingById(bookingId: number): Promise<APIResponse> {
    const response = await this.request.get(`/booking/${bookingId}`);

    await expect(response).toBeOK();

    return response;
  }

  async createBooking(booking: Booking): Promise<APIResponse> {
    const response = await this.request.post('/booking', {
      data: booking,
    });

    await expect(response).toBeOK();

    return response;
  }
}
