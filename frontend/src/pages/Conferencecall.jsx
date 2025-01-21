import React , {useContext}from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { authContext } from '../context/AuthContext.jsx';


const Conferencecall = () => {
  const { callid } = useParams();
  const { user, dispatch } = useContext(authContext);
  const myMeeting = async (element) => {
    const appID = 665281148;
    const serverSecret = '4ce3674a7fd20c03d8cc1cc5aba9d975';

    // Generate a unique user ID for each participant
    const userID = `user_${Math.random().toString(36).substr(2, 9)}`;
    const userName = user.name;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      callid,
      userID,
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      turnOnMicrophoneWhenJoining: true,
      turnOnCameraWhenJoining: true,
      showMyCameraToggleButton: true,
      showMyMicrophoneToggleButton: true,
      showAudioVideoSettingsButton: true,
      showScreenSharingButton: true,
      showTextChat: true,
      showUserList: true,
      maxUsers: 50,
      layout: 'Auto',
      showLayoutButton: true,
      scenario: {
        mode: 'VideoConference',
        config: {
          role: 'Host',
        },
      },
    });
  };

  return (
    <div>
      <div ref={myMeeting} />
    </div>
  );
};

export default Conferencecall;
