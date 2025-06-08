// global.d.ts

import mongoose from "mongoose";

declare global {
  // Extend the NodeJS global interface to include mongoose cache
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
      };
    }
  }
}
