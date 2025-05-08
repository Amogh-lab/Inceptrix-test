import React, { useState, useEffect, useRef } from 'react';
import './SOSPopup.css'; // Import the external CSS file

const SOSPopup = () => {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [voiceBlob, setVoiceBlob] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [voiceRecorder, setVoiceRecorder] = useState(null);
  const [videoRecorder, setVideoRecorder] = useState(null);
  const [recordingType, setRecordingType] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [voiceStream, setVoiceStream] = useState(null);
  const [videoStream, setVideoStream] = useState(null);

  const videoRef = useRef();

  useEffect(() => {
    const openHandler = () => setVisible(true);
    window.addEventListener('openSOS', openHandler);
    return () => window.removeEventListener('openSOS', openHandler);
  }, []);

  const startVoiceRecording = async () => {
    setRecordingType('voice');
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    setVoiceStream(stream);
    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setVoiceBlob(blob);
      setPreviewURL(URL.createObjectURL(blob));
      stream.getTracks().forEach(track => track.stop());
      setVoiceStream(null);
    };

    recorder.start();
    setVoiceRecorder(recorder);
  };

  const startVideoRecording = async () => {
    setRecordingType('video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    setVideoStream(stream);
    if (videoRef.current) videoRef.current.srcObject = stream;

    const recorder = new MediaRecorder(stream);
    const chunks = [];

    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' });
      setVideoBlob(blob);
      setPreviewURL(URL.createObjectURL(blob));
      if (videoRef.current) videoRef.current.srcObject = null;
      stream.getTracks().forEach(track => track.stop());
      setVideoStream(null);
    };

    recorder.start();
    setVideoRecorder(recorder);
  };

  const stopRecording = () => {
    if (recordingType === 'voice' && voiceRecorder) voiceRecorder.stop();
    if (recordingType === 'video' && videoRecorder) videoRecorder.stop();
    setRecordingType(null);
  };

  const handleSubmit = async () => {
    try {
      if (voiceStream) {
        voiceStream.getTracks().forEach(track => track.stop());
        setVoiceStream(null);
      }
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
        setVideoStream(null);
      }

      const formData = new FormData();
      if (voiceBlob) formData.append('file', voiceBlob, 'voice.webm');
      if (videoBlob) formData.append('file', videoBlob, 'video.webm');
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET');

      const cloudinaryRes = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/auto/upload', {
        method: 'POST',
        body: formData,
      });

      const cloudinaryData = await cloudinaryRes.json();
      const mediaURL = cloudinaryData.secure_url;

      await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaURL }),
      });

      setVisible(false);
      setAccepted(false);
      setVoiceBlob(null);
      setVideoBlob(null);
      setPreviewURL(null);
      setVoiceRecorder(null);
      setVideoRecorder(null);
      setRecordingType(null);
    } catch (error) {
      console.error('Error submitting SOS report:', error);
      alert('There was a problem submitting your report. Please try again.');
    }
  };

  if (!visible) return null;

  return (
    <div className="overlay">
      <div className="popup">
        {!accepted ? (
          <>
            <h3 className="heading">Emergency Reporting Terms</h3>
            <div className="terms-container">
              <p className="paragraph">1. The SOS report must be submitted truthfully. False or misleading reports may result in legal consequences.</p>
              <p className="paragraph">2. This feature is strictly for emergency situations. Misuse of this system can lead to penalties or restriction of access.</p>
              <p className="paragraph">3. The information shared will be kept confidential and used solely for the purpose of addressing your emergency.</p>
              <p className="paragraph">4. By recording, you consent to the collection and use of these recordings for emergency response purposes.</p>
              <p className="paragraph">5. You are responsible for the content of the voice and video recordings. Ensure no inappropriate or harmful content is recorded.</p>
              <p className="paragraph">6. Provide accurate location details. Inaccurate or incomplete information may delay the response.</p>
            </div>
            <div className="scroll-container">
              <p className="paragraph">7. You agree to comply with all applicable laws and regulations when submitting your report.</p>
              <p className="paragraph">8. We reserve the right to reject any SOS report that is incomplete, invalid, or does not meet required conditions.</p>
            </div>
            <div className="button-row">
              <button onClick={() => setAccepted(true)} className="button-primary">Accept</button>
              <button onClick={() => setVisible(false)} className="button-secondary">Reject</button>
            </div>
          </>
        ) : (
          <>
            <h3 className="heading">Record Evidence</h3>
            <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '10px' }}>
                Choose a recording option and click "Stop Recording" before submitting.
            </p>
            <div className="button-row">
              <button onClick={startVoiceRecording} className="button-primary">Record Voice</button>
              <button onClick={startVideoRecording} className="button-primary">Record Video</button>
            </div>
            {recordingType && (
              <div className="button-row">
                <button onClick={stopRecording} className="button-dark">Stop Recording</button>
              </div>
            )}
            {previewURL && (
              <div style={{ marginTop: '10px' }}>
                {voiceBlob && <audio controls src={previewURL} className="audio" />}
                {videoBlob && <video controls ref={videoRef} src={previewURL} className="video" />}
              </div>
            )}
            <div className="button-row">
                <button onClick={handleSubmit} className="button-primary">Submit</button>
                <button
                    onClick={() => {
                    if (voiceRecorder) voiceRecorder.stop();
                    if (videoRecorder) videoRecorder.stop();
                    if (voiceStream) {
                        voiceStream.getTracks().forEach(track => track.stop());
                        setVoiceStream(null);
                    }
                    if (videoStream) {
                        videoStream.getTracks().forEach(track => track.stop());
                        setVideoStream(null);
                    }
                    setVisible(false);
                    setAccepted(false);
                    setVoiceBlob(null);
                    setVideoBlob(null);
                    setPreviewURL(null);
                    setVoiceRecorder(null);
                    setVideoRecorder(null);
                    setRecordingType(null);
                    }}
                    className="button-secondary">
                    Cancel
                </button>
                </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SOSPopup;
