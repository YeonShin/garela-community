const mysql = require("mysql2");
require("dotenv").config();

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

let connection;
let reconnectTimer = null;

// connect() 콜백과 error 이벤트가 같은 연결 실패에 대해 동시에 발동하는 경우가 있어,
// 재연결 예약을 한 곳(scheduleReconnect)으로 모아 5초 대기가 중복 호출로 무력화되지 않게 한다.
function scheduleReconnect() {
  if (reconnectTimer) return;
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null;
    handleDisconnect();
  }, 5000);
}

function handleDisconnect() {
  if (connection) {
    connection.removeAllListeners();
    connection.destroy();
  }

  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("DB 연결 시도 중 에러:", err.code || err.message);
      scheduleReconnect();
    } else {
      console.log("MySQL 연결 성공 (ID: " + connection.threadId + ")");
    }
  });

  // 연결이 끊겼을 때(서버 종료 등) 다시 연결 시도
  connection.on("error", (err) => {
    console.error("DB 에러 발생:", err.code || err.message);
    scheduleReconnect();
  });
}

handleDisconnect();

// module.exports = connection 형태로 내보내면 이 시점의 connection 객체 하나만 캡처되어,
// 이후 재연결로 connection 변수가 새 객체로 바뀌어도 이미 require한 라우트들은 죽은 예전
// 커넥션을 계속 참조하게 된다(재연결 후 모든 쿼리가 500으로 실패하는 원인이었음).
// Proxy로 감싸 매 호출마다 "현재" connection을 조회하도록 한다.
module.exports = new Proxy(
  {},
  {
    get(_target, prop) {
      const value = connection[prop];
      return typeof value === "function" ? value.bind(connection) : value;
    },
  }
);
