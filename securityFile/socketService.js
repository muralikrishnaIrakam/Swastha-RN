import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.3:4000/'; // Replace with your server URL

class SocketService {
  socket;
  userId
  async connect() {
    this.socket = io(SOCKET_URL);
    let userId = await AsyncStorage.getItem('_id')
    this.userId = userId
    setInterval(()=>{
      this.socket.on('connect', () => {
        console.log('Connected to socket server',userId);
      });
    },10000)

    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  }


  

  createRoom(room) {
    this.socket.emit('createRoom', room);
  }

  async joinRoom(data) {
    data.room = await AsyncStorage.getItem('_id')
    this.socket.emit('joinRoom', data);
  }

  sendMessage(data) {
    this.socket.emit('message', data);
  }

  onMessage(callback) {
    this.socket.on('received', callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default new SocketService();
