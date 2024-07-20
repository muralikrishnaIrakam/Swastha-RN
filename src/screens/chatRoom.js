import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, TextInput, ScrollView, PermissionsAndroid, FlatList } from 'react-native';
import { RTCView, mediaDevices } from 'react-native-webrtc';
import io from 'socket.io-client';

const ChatRoom = () => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [connected, setConnected] = useState(false);
    const [callState, setCallState] = useState('idle');
    const [callerId, setCallerId] = useState(null);
    const socket = useRef(null);

    useEffect(() => {
        const initializeStream = async () => {
            try {
                await requestPermissions();
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);
                if (
                    granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
                    granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
                ) {
                    const stream = await mediaDevices.getUserMedia({ audio: true, video: true });
                    setLocalStream(stream);
                    socket.current.emit('stream', { stream: JSON.stringify(stream), name: username });
                } else {
                    console.log('Permissions denied');
                }
            } catch (error) {
                console.error('Error initializing stream:', error);
            }
        };

        initializeStream();

        return () => {
            if (localStream) {
                localStream.release();
            }
        };
    }, [username]);

    useEffect(() => {
        socket.current = io('http://192.168.29.47:4000/');
    
        socket.current.on('connect', () => {
            console.log("You are connected");
            setConnected(true);
        });
    
        socket.current.on('disconnect', () => {
            console.log("Socket disconnected");
            setConnected(false);
        });

        socket.current.on('chat message', (msg) => {
            console.log('Received chat message:', msg);
            setMessages(prevMessages => [...prevMessages, msg]);
        });

        socket.current.on('stream', ({ stream }) => {
            console.log('Received stream:', stream);
            const remoteStreamData = JSON.parse(stream);
            
            setRemoteStream(remoteStreamData); // Update remoteStream state with the stream object
        });

        socket.current.on('call', (callerId) => {
            console.log('Received call from:', callerId);
            setCallState('incoming');
            setCallerId(callerId);
        });

        socket.current.on('answer', () => {
            console.log('Call answered');
            setCallState('active');
        });

        socket.current.on('reject', () => {
            console.log('Call rejected');
            setCallState('idle');
        });

        return () => {
            console.log('Disconnecting socket...');
            socket.current.disconnect();
        };
    }, []);

    const sendMessage = () => {
        if (message) {
            socket.current.emit('chat message', { username, message });
            setMessages(prevMessages => [...prevMessages, { username, message }]);
            setMessage('');
        }
    };

    const requestPermissions = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.CAMERA,
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            ]);
            if (
                granted['android.permission.CAMERA'] !== PermissionsAndroid.RESULTS.GRANTED ||
                granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('Permissions denied');
            }
        } catch (error) {
            console.error('Error requesting permissions:', error);
        }
    };

    const callUser = () => {
        socket.current.emit('call user');
        setCallState('calling');
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Display local stream */}
            {localStream && <RTCView streamURL={localStream.toURL()} style={{ width: 200, height: 200 }} />}
            
            {/* Display remote stream if available */}
            {remoteStream && remoteStream.toURL && <RTCView streamURL={remoteStream.toURL()} style={{ width: 200, height: 200 }} />} 

            {/* Call UI */}
            {callState === 'incoming' && (
                <View>
                    <Text>Incoming Call...</Text>
                    <Button title="Answer" onPress={answerCall} />
                    <Button title="Reject" onPress={rejectCall} />
                </View>
            )}

            {/* Chat UI */}
            <View style={{ flex: 1 }}>
                {connected ? (
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <View>
                                <Text>{item.username}: {item.message}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text>Connecting...</Text>
                )}
            </View>

            {/* Chat Input */}
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={setMessage}
                    value={message}
                    placeholder="Enter message"
                />
                <Button title="Send Message" onPress={sendMessage} />
            </View>

            {/* Call Button */}
            {callState === 'idle' && (
                <View>
                    <Button title="Call User" onPress={callUser} />
                </View>
            )}
        </View>
    );
};

export default ChatRoom;
