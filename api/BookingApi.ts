import { expect, type APIRequestContext, type APIResponse } from '@playwright/test';
import type { Booking } from './types/Booking';

export class BookingApi {
  constructor(private readonly request: APIRequestContext) { }

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

  async createToken(): Promise<string> {
    const response = await this.request.post('/auth', {
      data: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });

    await expect(response).toBeOK();

    const responseBody = await response.json();

    expect(responseBody.token).toBeDefined();

    return responseBody.token;
  }

  async updateBooking(
    bookingId: number,
    booking: Booking,
    token: string
  ): Promise<APIResponse> {
    const response = await this.request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: booking,
    });

    await expect(response).toBeOK();

    return response;
  }

  async partialUpdateBooking(
    bookingId: number,
    updates: Partial<Booking>,
    token: string
  ): Promise<APIResponse> {
    const response = await this.request.patch(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: updates,
    });

    await expect(response).toBeOK();

    return response;
  }

  async deleteBooking(
    bookingId: number,
    token: string
  ): Promise<APIResponse> {
    const response = await this.request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status()).toBe(201);

    return response;
  }
  async getBookingByIdWithoutValidation(
    bookingId: number
  ): Promise<APIResponse> {
    return this.request.get(`/booking/${bookingId}`);
  }
}
