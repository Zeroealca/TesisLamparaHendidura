import serverlessMysql from "serverless-mysql";
const db = serverlessMysql({
  config: {
    host: "localhost",
    database: "tesiseye",
    user: "root",
    password: "",
    port: 3306,
  },
});
export default db;
