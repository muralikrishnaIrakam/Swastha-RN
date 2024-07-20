// BackgroundTask.js

import BackgroundActions from 'react-native-background-actions';
import io from 'socket.io-client';

const backgroundTask = async () => {
  const socket = io('http://192.168.1.4:4000/');

  // Example: Listen for events
  socket.on('message', (data) => {
    console.log('Received message from server:', data);
  });

  // Your background task logic here
};

const taskRandomizer = Math.random().toString(36).substring(7);

const options = {
  taskName: `Example Task ${taskRandomizer}`,
  taskTitle: 'Example Task Title',
  taskDesc: 'Example Task Description',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
  parameters: {
    delay: 1000,
  },
};

BackgroundActions.startBackgroundTask(backgroundTask, options);
