const env = process.env.MODE_ENV || "development";

const config = () => {
  switch (env) {
    case "development":
      return {
        dbpath:
          "mongodb+srv://<seu usuario>:<sua senha>@cluster0.2kqkl.mongodb.net/user_fiap_dev_db?retryWrites=true&w=majority",
        jwt_key: "Navigation",
        jwt_expires_at: "5m",
      };
    case "production":
      return {
        dbpath:
          "mongodb+srv://<seu usuario>:<sua senha>@cluster0.2kqkl.mongodb.net/user_fiap_db?retryWrites=true&w=majority",
        jwt_key: "Navigation",
        jwt_expires_at: "1d",
      };
  }
};
module.exports = config();
