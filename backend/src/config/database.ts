import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  `${process.env.DB_DIALECT}://${process.env.DB_USER}:${encodeURIComponent(process.env.DB_PASSWORD!)}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);