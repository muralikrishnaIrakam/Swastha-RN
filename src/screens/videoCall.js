

import { Button, Text, View } from 'react-native'
import React from 'react';
import {ZegoUIKitPrebuiltCall, ONE_ON_ONE_VIDEO_CALL_CONFIG } from '@zegocloud/zego-uikit-prebuilt-call-rn'
import Styles from '../../styles/css/style';
import RNEncryptedStorage from 'react-native-encrypted-storage';
import { useRoute } from '@react-navigation/native';



export default function VoiceCallPage(props) {
    const route = useRoute();
    const { paramName } = route.params;
  const userId = String(Math.floor(Math.random()*100000))
  return (
      <View style={Styles.container}>
          <ZegoUIKitPrebuiltCall
              appID={1577000927}
              appSign="6003d6aa3a04aaa6d418c6b0927680d2462fd59098b3f1c587c416738fc43960"
              userID={userId} // userID can be something like a phone number or the user id on your own user system. 
              userName={"Murali"}
              callID={paramName} // callID can be any unique string. 

              config={{
                  // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
                  ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
                  onOnlySelfInRoom: () => { console.log("")},
                  onHangUp: () => { console.log("")},
              }}
          />
      </View>
  );
}


