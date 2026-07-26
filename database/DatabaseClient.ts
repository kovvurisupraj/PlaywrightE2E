import Database from 'better-sqlite3';

export type OrderRecord = {
  id: number;
  customerName: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  status: string;
};

export class DatabaseClient {
  private readonly database: Database.Database;

  constructor(databasePath: string) {
    this.database = new Database(databasePath);
  }

  createOrdersTable(): void {
    this.database
      .prepare(
        `
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          customer_name TEXT NOT NULL,
          product_name TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          total_price REAL NOT NULL,
          status TEXT NOT NULL
        )
      `
      )
      .run();
  }

  insertOrder(
    customerName: string,
    productName: string,
    quantity: number,
    totalPrice: number,
    status: string
  ): number {
    const result = this.database
      .prepare(
        `
        INSERT INTO orders (
          customer_name,
          product_name,
          quantity,
          total_price,
          status
        )
        VALUES (?, ?, ?, ?, ?)
      `
      )
      .run(customerName, productName, quantity, totalPrice, status);

    return Number(result.lastInsertRowid);
  }

  getOrderById(orderId: number): OrderRecord | undefined {
    return this.database
      .prepare(
        `
        SELECT
          id,
          customer_name AS customerName,
          product_name AS productName,
          quantity,
          total_price AS totalPrice,
          status
        FROM orders
        WHERE id = ?
      `
      )
      .get(orderId) as OrderRecord | undefined;
  }

  close(): void {
    this.database.close();
  }
}
