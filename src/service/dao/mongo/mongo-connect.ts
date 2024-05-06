import mongoose from "mongoose";

type Options = {
  mongo_url: string;
  db_name: string;
};

export class MongoConnect {
  static async connect(options: Options) {
    try {
      await mongoose.connect(options.mongo_url, {
        dbName: options.db_name,
      });
      console.log("Conectado exitosamente");
    } catch (error) {
      throw Error(`Error ${error}`);
    }
  }
}
