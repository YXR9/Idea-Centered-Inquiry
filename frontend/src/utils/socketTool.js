export const sendMessage = (ws) => {
    console.log("2",typeof ws);
    ws.emit('event01', {"data": "回傳發送訊息的..."}, (response) => {
      console.log("event01 sender status:",response.status);
    });
};