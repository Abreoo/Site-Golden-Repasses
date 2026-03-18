import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: text("id").primaryKey().notNull().default(sql`(lower(hex(randomblob(16))))`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const cars = sqliteTable("cars", {
  id: text("id").primaryKey().notNull().default(sql`(lower(hex(randomblob(16))))`),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  // keep as text to match existing client typing (string)
  price: text("price").notNull(),
  mileage: integer("mileage").notNull(),
  color: text("color").notNull(),
  fuelType: text("fuel_type").notNull(),
  transmission: text("transmission").notNull(),
  description: text("description"),
  isAvailable: integer("is_available", { mode: "boolean" }).default(true),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(unixepoch('subsec') * 1000)`),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }).default(sql`(unixepoch('subsec') * 1000)`),
});

export const carPhotos = sqliteTable("car_photos", {
  id: text("id").primaryKey().notNull().default(sql`(lower(hex(randomblob(16))))`),
  carId: text("car_id")
    .notNull()
    .references(() => cars.id, { onDelete: "cascade" }),
  filename: text("filename").notNull(),
  originalName: text("original_name").notNull(),
  mimeType: text("mime_type").notNull(),
  size: integer("size").notNull(),
  url: text("url").notNull(),
  isMain: integer("is_main", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" }).default(sql`(unixepoch('subsec') * 1000)`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCarSchema = createInsertSchema(cars).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCarPhotoSchema = createInsertSchema(carPhotos).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertCar = z.infer<typeof insertCarSchema>;
export type Car = typeof cars.$inferSelect;
export type InsertCarPhoto = z.infer<typeof insertCarPhotoSchema>;
export type CarPhoto = typeof carPhotos.$inferSelect;
