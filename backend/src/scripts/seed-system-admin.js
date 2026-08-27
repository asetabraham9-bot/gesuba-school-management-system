import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../modules/users/user.model.js";

dotenv.config();

const SYSTEM_ADMIN_ROLE = "SYSTEM_ADMIN";

const seedSystemAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    if (!process.env.SYSTEM_ADMIN_PASSWORD) {
      throw new Error(
        "SYSTEM_ADMIN_PASSWORD is not defined"
      );
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected.");

    const existingAdmin = await User.findOne({
      role: SYSTEM_ADMIN_ROLE,
      isDeleted: false,
    });

    if (existingAdmin) {
      console.log(
        `System Admin already exists: ${existingAdmin.username}`
      );

      await mongoose.disconnect();

      console.log("MongoDB disconnected.");
      return;
    }

    const passwordHash = await bcrypt.hash(
      process.env.SYSTEM_ADMIN_PASSWORD,
      12
    );

    const systemAdmin = await User.create({
      fullName:
        process.env.SYSTEM_ADMIN_FULL_NAME ||
        "GGSS System Administrator",

      username: "GGSS.SYADM0001",

      email:
        process.env.SYSTEM_ADMIN_EMAIL ||
        "admin@ggss.edu.et",

      password: passwordHash,

      role: SYSTEM_ADMIN_ROLE,

      isActive: true,

      isDeleted: false,

      lastLogin: null,
    });

    console.log("\n================================");
    console.log("SYSTEM ADMIN CREATED");
    console.log("================================");
    console.log(`Name: ${systemAdmin.fullName}`);
    console.log(`Username: ${systemAdmin.username}`);
    console.log(`Email: ${systemAdmin.email}`);
    console.log(`Role: ${systemAdmin.role}`);
    console.log("================================\n");

    await mongoose.disconnect();

    console.log("MongoDB disconnected.");
    console.log("Bootstrap completed successfully.");
  } catch (error) {
    console.error(
      "\nSystem Admin bootstrap failed:"
    );

    console.error(error.message);

    await mongoose.disconnect().catch(() => {});

    process.exit(1);
  }
};

seedSystemAdmin();