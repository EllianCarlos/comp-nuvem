import { config } from 'dotenv';

config();

export class Config {
  public static getMongoSensorsURI(): string {
    return process.env.MONGO_SENSORS_URI!;
  }

  public static getMongoDataURI(): string {
    return process.env.MONGO_DATA_URI!;
  }

  public static getMongoReportURI(): string {
    return process.env.MONGO_REPORT_URI!;
  }

  public static getJwtSecret(): string {
    return process.env.JWT_ENCODE_SECRET!;
  }
}
