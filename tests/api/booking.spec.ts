import { test } from '../../fixtures/pageFixtures';
import { expect } from '@playwright/test';
import apiData from '../../data/apiData.json';

test('get all bookings', async ({ bookingApi }) => {
    const response = await bookingApi.getAllBookings();
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
    expect(responseBody[0]).toHaveProperty('bookingid');
});

test('Create a booking', async ({ bookingApi }) => {
    const response = await bookingApi.createBooking(apiData);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.bookingid).toBeDefined();
    expect(responseBody.booking.firstname).toBe(apiData.firstname);
    expect(responseBody.booking.lastname).toBe(apiData.lastname);
    expect(responseBody.booking.totalprice).toBe(apiData.totalprice);
    expect(responseBody.booking.depositpaid).toBe(apiData.depositpaid);
    expect(responseBody.booking.bookingdates).toEqual(apiData.bookingdates);
    expect(responseBody.booking.additionalneeds).toBe(apiData.additionalneeds);
});

test('create and retrieve a booking by ID', async ({ bookingApi }) => {
    const createResponse = await bookingApi.createBooking(apiData);
    expect(createResponse.status()).toBe(200);

    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    expect(bookingId).toBeDefined();

    const getResponse = await bookingApi.getBookingById(bookingId);
    expect(getResponse.status()).toBe(200);

    const retrievedBooking = await getResponse.json();

    expect(retrievedBooking.firstname).toBe(apiData.firstname);
    expect(retrievedBooking.lastname).toBe(apiData.lastname);
    expect(retrievedBooking.totalprice).toBe(apiData.totalprice);
    expect(retrievedBooking.depositpaid).toBe(apiData.depositpaid);
    expect(retrievedBooking.bookingdates).toEqual(apiData.bookingdates);
    expect(retrievedBooking.additionalneeds).toBe(apiData.additionalneeds);
});

test('complete booking CRUD flow', async ({ bookingApi }) => {
    const token = await bookingApi.createToken();

    const createResponse = await bookingApi.createBooking(apiData);
    const createdBooking = await createResponse.json();
    const bookingId = createdBooking.bookingid;

    const updatedData = {
        ...apiData,
        firstname: 'Supraj',
        totalprice: 300,
        additionalneeds: 'Dinner',
    };

    const updateResponse = await bookingApi.updateBooking(
        bookingId,
        updatedData,
        token
    );

    const updatedBooking = await updateResponse.json();

    expect(updatedBooking.firstname).toBe('Supraj');
    expect(updatedBooking.totalprice).toBe(300);
    expect(updatedBooking.additionalneeds).toBe('Dinner');

    const partialUpdateResponse =
        await bookingApi.partialUpdateBooking(
            bookingId,
            {
                lastname: 'Reddy',
            },
            token
        );

    const partiallyUpdatedBooking =
        await partialUpdateResponse.json();

    expect(partiallyUpdatedBooking.lastname).toBe('Reddy');

    const deleteResponse = await bookingApi.deleteBooking(
        bookingId,
        token
    );

    expect(deleteResponse.status()).toBe(201);

    const getDeletedResponse =
        await bookingApi.getBookingByIdWithoutValidation(bookingId);

    expect(getDeletedResponse.status()).toBe(404);
});