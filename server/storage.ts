import { type User, type InsertUser, type Car, type InsertCar, type CarPhoto, type InsertCarPhoto } from "@shared/schema";
import { users, cars, carPhotos } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Car operations
  getCar(id: string): Promise<Car | undefined>;
  getAllCars(): Promise<Car[]>;
  createCar(car: InsertCar): Promise<Car>;
  updateCar(id: string, car: Partial<InsertCar>): Promise<Car | undefined>;
  deleteCar(id: string): Promise<boolean>;
  
  // Car photo operations
  getCarPhotos(carId: string): Promise<CarPhoto[]>;
  getCarPhoto(id: string): Promise<CarPhoto | undefined>;
  createCarPhoto(photo: InsertCarPhoto): Promise<CarPhoto>;
  deleteCarPhoto(id: string): Promise<boolean>;
  setMainPhoto(carId: string, photoId: string): Promise<boolean>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return rows[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const rows = await db.insert(users).values(insertUser).returning();
    return rows[0]!;
  }

  async getCar(id: string): Promise<Car | undefined> {
    const rows = await db.select().from(cars).where(eq(cars.id, id)).limit(1);
    return rows[0];
  }

  async getAllCars(): Promise<Car[]> {
    // Most recent first
    return await db.select().from(cars).orderBy(desc(cars.createdAt));
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const rows = await db
      .insert(cars)
      .values({
        ...insertCar,
        description: insertCar.description ?? null,
        isAvailable: insertCar.isAvailable ?? true,
      })
      .returning();
    return rows[0]!;
  }

  async updateCar(id: string, updateData: Partial<InsertCar>): Promise<Car | undefined> {
    const rows = await db
      .update(cars)
      .set({
        ...updateData,
        updatedAt: sql`(unixepoch('subsec') * 1000)`,
      })
      .where(eq(cars.id, id))
      .returning();
    return rows[0];
  }

  async deleteCar(id: string): Promise<boolean> {
    const rows = await db.delete(cars).where(eq(cars.id, id)).returning({ id: cars.id });
    return rows.length > 0;
  }

  async getCarPhotos(carId: string): Promise<CarPhoto[]> {
    // Order: main photo first, then newest first
    return await db
      .select()
      .from(carPhotos)
      .where(eq(carPhotos.carId, carId))
      .orderBy(desc(carPhotos.isMain), desc(carPhotos.createdAt));
  }

  async getCarPhoto(id: string): Promise<CarPhoto | undefined> {
    const rows = await db.select().from(carPhotos).where(eq(carPhotos.id, id)).limit(1);
    return rows[0];
  }

  async createCarPhoto(photo: InsertCarPhoto): Promise<CarPhoto> {
    const rows = await db
      .insert(carPhotos)
      .values({
        ...photo,
        isMain: photo.isMain ?? false,
      })
      .returning();
    return rows[0]!;
  }

  async deleteCarPhoto(id: string): Promise<boolean> {
    const rows = await db
      .delete(carPhotos)
      .where(eq(carPhotos.id, id))
      .returning({ id: carPhotos.id });
    return rows.length > 0;
  }

  async setMainPhoto(carId: string, photoId: string): Promise<boolean> {
    // transaction: clear main, set new main
    return await db.transaction(async (tx) => {
      await tx
        .update(carPhotos)
        .set({ isMain: false })
        .where(eq(carPhotos.carId, carId));

      const rows = await tx
        .update(carPhotos)
        .set({ isMain: true })
        .where(and(eq(carPhotos.id, photoId), eq(carPhotos.carId, carId)))
        .returning({ id: carPhotos.id });

      return rows.length > 0;
    });
  }
}

export const storage = new DbStorage();
