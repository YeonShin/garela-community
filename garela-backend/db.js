const mysql = require("mysql2");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let connection;

function handleDisconnect() {
  if (connection) {
    connection.destroy(); 
  }

  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("DB 연결 시도 중 에러:", err);
      setTimeout(handleDisconnect, 5000); // 5초 후 재시도
    } else {
      console.log("MySQL 연결 성공 (ID: " + connection.threadId + ")");
    }
  });

  // 연결이 끊겼을 때(서버 종료 등) 다시 연결 시도
  connection.on("error", (err) => {
    console.error("DB 에러 발생:", err);
    if (
      err.code === "PROTOCOL_CONNECTION_LOST" ||
      err.code === "ECONNREFUSED"
    ) {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

module.exports = connection;
