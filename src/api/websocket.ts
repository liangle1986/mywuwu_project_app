import { _get, _post, _delete } from './http';
let socket: any;
export const websocket = (data: any) => {
    socket = new WebSocket('ws://localhost:8080/mywuwu/websocket/'+data.userId + '/'+ data.groupId);
    socket.onopen = onopenMessage;
    socket.onmessage = sendMessage;
    socket.onclose = onclose;
    return socket;
};

const onopenMessage = () => {
  // Web Socket 已连接上，使用 send() 方法发送数据
  console.log('数据发送中...');
//   socket.send('Holle');
  console.log('数据发送完成');
};
export const onclose = (evt: any) => {
   // 关闭 websocket
   console.log('连接已关闭...');
};
const sendMessage = (evt: any) => {
    console.log('消息已接收..' + JSON.stringify(evt));

};

// 发消息
export const readSend = (data: any) => {
    const req = {
      data,
      url: 'sendOneWebSocket',
    };
    return _get(req);
};
