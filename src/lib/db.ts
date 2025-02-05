import mongoose from "mongoose";

const MONGO_URI: string | undefined = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO URI not defined");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

export const connect = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: true,
      maxPoolSize: 3,
    };

    cached.promise = mongoose
      .connect(MONGO_URI, options)
      .then((cached) => cached.connection)
      .catch((err) => {
        throw err;
      });
  }

  cached.connection = await cached.promise;

  return cached.connection;
};
