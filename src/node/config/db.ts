/* import ServerlessClient  from "serverless-mysql";

const db = ServerlessClient ({
  config: {
    host: "localhost",
    database: "tesiseye",
    user: "root",
    password: "",
    port: 3306,
  },
});
export default db; */

import ServerlessClient from "serverless-postgres";

const client = new ServerlessClient({
  user: "postgres",
  host: "localhost",
  database: "tesiseye",
  password: "root",
  port: 5432,
});

export default client;
