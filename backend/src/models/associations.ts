import User from "./user";
import Movie from "./movie";

User.hasMany(Movie, { foreignKey: "userId", as: "watchlist" });
Movie.belongsTo(User, { foreignKey: "userId" });
