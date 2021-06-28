import App from './config/app';
import {Server} from "http";

const port: number = Number(process.env.PORT) || 3000;

// const server = createServer(app());

const server:Server = App().listen(port, () => {
  console.log(`${port}포트 서버 대기 중!`);
});

export default server;