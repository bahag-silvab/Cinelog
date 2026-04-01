import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../config/database";

interface MovieModel extends Model<InferAttributes<MovieModel>, InferCreationAttributes<MovieModel>> {
  id: CreationOptional<number>;
  userId: number;
  imdbId: CreationOptional<string | null>;
  title: string;
  poster: CreationOptional<string | null>;
  year: CreationOptional<string | null>;
  genre: CreationOptional<string | null>;
  status: "want_to_watch" | "watched";
  rating: CreationOptional<number | null>;
  review: CreationOptional<string | null>;
  addedAt: CreationOptional<Date>;
}

const Movie = sequelize.define<MovieModel>("Movie", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imdbId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  poster: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("want_to_watch", "watched"),
    allowNull: false,
    defaultValue: "want_to_watch",
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  addedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default Movie;
