import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import { Camera, CameraOff, AlertTriangle, Users, EyeOff, Activity } from 'lucide-react';
import toast from 'react-hot-toast';

const LiveCameraMonitor = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [cameraStatus, setCameraStatus] = useState('loading');
    const [isCameraEnabled, setIsCameraEnabled] = useState(true);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [violations, setViolations] = useState([]);
    const [currentWarning, setCurrentWarning] = useState(null);
    const [detectionStats, setDetectionStats] = useState({
        faceCount: 0,
        noFaceCount: 0,
        multipleFaceCount: 0,
        lastDetectionTime: null,
        lookingAwayCount: 0,
        currentExpression: null,
        suspiciousExpressionCount: 0,
        eyeGazeDirection: 'center',
        lighting: 'good',
        environmentChecked: false
    });

    const detectionIntervalRef = useRef(null);
    const violationTimersRef = useRef({
        noFace: null,
        multipleFaces: null,
        noFaceStartTime: null,
        multipleFaceStartTime: null,
        lookingAway: null,
        lookingAwayStartTime: null,
        suspiciousExpression: null,
        suspiciousExpressionStartTime: null,
        eyeGazeAway: null,
        eyeGazeAwayStartTime: null
    });

    // Load face-api.js models
    useEffect(() => {
        loadModels();
        requestCameraPermission();
        return () => {
            if (detectionIntervalRef.current) {
                clearInterval(detectionIntervalRef.current);
            }
            Object.values(violationTimersRef.current).forEach(timer => {
                if (timer) clearTimeout(timer);
            });
        };
    }, []);

    // Start detection when models loaded and camera active
    useEffect(() => {
        if (modelsLoaded && cameraStatus === 'active' && isCameraEnabled) {
            startDetection();
        } else {
            stopDetection();
        }
    }, [modelsLoaded, cameraStatus, isCameraEnabled]);

    const loadModels = async () => {
        try {
            const MODEL_URL = '/models';
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
            setModelsLoaded(true);
            console.log('✅ Face detection models loaded');
        } catch (error) {
            console.error('❌ Model loading failed:', error);
            toast.error('AI models failed to load. Using basic monitoring.');
        }
    };

    const requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            setCameraStatus('active');
        } catch (error) {
            setCameraStatus(error.name === 'NotAllowedError' ? 'denied' : 'error');
        }
    };

    const startDetection = () => {
        detectionIntervalRef.current = setInterval(async () => {
            await detectFaces();
        }, 1000); // Check every 1 second
    };

    const stopDetection = () => {
        if (detectionIntervalRef.current) {
            clearInterval(detectionIntervalRef.current);
            detectionIntervalRef.current = null;
        }
    };

    const detectFaces = async () => {
        if (!webcamRef.current?.video || !modelsLoaded) return;

        const video = webcamRef.current.video;
        if (video.readyState !== 4) return;

        try {
            const detections = await faceapi.detectAllFaces(
                video,
                new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: 0.1 })
            );

            const faceCount = detections.length;
            const currentTime = Date.now();

            // DEBUG: Log detailed detection info
            console.log('🔍 Detected faces:', faceCount, 'Scores:', detections.map(d => d.detection.score.toFixed(2)));

            setDetectionStats(prev => ({
                ...prev,
                faceCount,
                lastDetectionTime: currentTime
            }));

            // Rule 1: Multiple Faces Detection
            if (faceCount > 1) {
                handleMultipleFaces(currentTime);
            } else {
                resetMultipleFaceTimer();
            }

            // Rule 2: No Face Detection
            if (faceCount === 0) {
                handleNoFace(currentTime);
            } else {
                resetNoFaceTimer();
            }

            // Only do advanced detection if exactly 1 face
            if (faceCount === 1) {
                // Get landmarks and expressions for single face
                const detectionWithLandmarks = await faceapi.detectSingleFace(
                    video,
                    new faceapi.TinyFaceDetectorOptions({ inputSize: 224, scoreThreshold: 0.2 })
                ).withFaceLandmarks().withFaceExpressions();
                
                if (detectionWithLandmarks) {
                    checkSuspiciousMovement();
                    checkLookingAway(detectionWithLandmarks.landmarks, currentTime);
                    analyzeExpressions(detectionWithLandmarks.expressions, currentTime);
                    trackEyeGaze(detectionWithLandmarks.landmarks, currentTime);
                    checkEnvironmentQuality(video, detectionWithLandmarks);
                }
            } else {
                resetLookingAwayTimer();
                resetSuspiciousExpressionTimer();
                resetEyeGazeTimer();
            }

        } catch (error) {
            console.error('Detection error:', error);
        }
    };

    const handleMultipleFaces = (currentTime) => {
        if (!violationTimersRef.current.multipleFaceStartTime) {
            violationTimersRef.current.multipleFaceStartTime = currentTime;
        }

        const duration = currentTime - violationTimersRef.current.multipleFaceStartTime;

        // Trigger after 1 second and log every time
        if (duration > 1000) {
            console.log('🚨 MULTIPLE FACES DETECTED!');
            logViolation('MULTIPLE_PERSON_DETECTED', 'Multiple people detected');
            
            // Keep warning visible while multiple faces detected
            setCurrentWarning({
                type: 'MULTIPLE_FACES',
                message: '⚠️ Multiple people detected. Please ensure you are alone.',
                icon: Users,
                color: 'red'
            });
        }
    };

    const resetMultipleFaceTimer = () => {
        violationTimersRef.current.multipleFaceStartTime = null;
        if (currentWarning?.type === 'MULTIPLE_FACES') {
            setCurrentWarning(null);
        }
    };

    const handleNoFace = (currentTime) => {
        if (!violationTimersRef.current.noFaceStartTime) {
            violationTimersRef.current.noFaceStartTime = currentTime;
        }

        const duration = currentTime - violationTimersRef.current.noFaceStartTime;

        if (duration > 1000 && !violationTimersRef.current.noFace) {
            violationTimersRef.current.noFace = true;
            logViolation('FACE_NOT_VISIBLE', 'Face not detected');
            setCurrentWarning({
                type: 'NO_FACE',
                message: '⚠️ Face not detected. Please stay in front of the camera.',
                icon: EyeOff,
                color: 'orange'
            });
            toast.error('⚠️ Face not visible!', {
                duration: 4000,
                style: { background: '#EA580C', color: '#fff', fontWeight: 'bold' }
            });
        }
    };

    const resetNoFaceTimer = () => {
        violationTimersRef.current.noFaceStartTime = null;
        violationTimersRef.current.noFace = false;
        if (currentWarning?.type === 'NO_FACE') {
            setCurrentWarning(null);
        }
    };

    const checkSuspiciousMovement = () => {
        setDetectionStats(prev => {
            const newNoFaceCount = 0;
            if (prev.noFaceCount > 3 && Date.now() - prev.lastDetectionTime < 10000) {
                logViolation('SUSPICIOUS_MOVEMENT', 'Frequent face switching detected');
                setCurrentWarning({
                    type: 'SUSPICIOUS',
                    message: '⚠️ Suspicious movement detected.',
                    icon: Activity,
                    color: 'yellow'
                });
                toast.error('⚠️ Suspicious movement!', {
                    duration: 3000,
                    style: { background: '#D97706', color: '#fff', fontWeight: 'bold' }
                });
                return { ...prev, noFaceCount: 0 };
            }
            return { ...prev, noFaceCount: newNoFaceCount };
        });
    };

    const checkLookingAway = (landmarks, currentTime) => {
        // Get nose and eye positions to detect head angle
        const nose = landmarks.getNose();
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        
        // Calculate vertical position - if nose is significantly below eyes, person is looking down
        const eyeY = (leftEye[0].y + rightEye[0].y) / 2;
        const noseY = nose[3].y; // Bottom of nose
        const verticalDiff = noseY - eyeY;
        
        // If nose is too far below eyes (looking down at phone)
        const isLookingDown = verticalDiff > 40; // Threshold for looking down
        
        if (isLookingDown) {
            handleLookingAway(currentTime);
        } else {
            resetLookingAwayTimer();
        }
    };

    const handleLookingAway = (currentTime) => {
        if (!violationTimersRef.current.lookingAwayStartTime) {
            violationTimersRef.current.lookingAwayStartTime = currentTime;
        }

        const duration = currentTime - violationTimersRef.current.lookingAwayStartTime;

        if (duration > 2000 && !violationTimersRef.current.lookingAway) {
            violationTimersRef.current.lookingAway = true;
            logViolation('LOOKING_AWAY', 'Candidate looking down/away from screen');
            setCurrentWarning({
                type: 'LOOKING_AWAY',
                message: '⚠️ Please look at the screen. Do not look down.',
                icon: AlertTriangle,
                color: 'red'
            });
            toast.error('⚠️ Looking away detected!', {
                duration: 4000,
                style: { background: '#DC2626', color: '#fff', fontWeight: 'bold' }
            });
        }
    };

    const resetLookingAwayTimer = () => {
        violationTimersRef.current.lookingAwayStartTime = null;
        violationTimersRef.current.lookingAway = false;
        if (currentWarning?.type === 'LOOKING_AWAY') {
            setCurrentWarning(null);
        }
    };

    const analyzeExpressions = (expressions, currentTime) => {
        // Get dominant expression
        const expressionArray = Object.entries(expressions);
        const dominant = expressionArray.reduce((max, curr) => curr[1] > max[1] ? curr : max);
        const [expressionName, confidence] = dominant;
        
        setDetectionStats(prev => ({ ...prev, currentExpression: expressionName }));
        
        // Suspicious expressions that may indicate cheating
        const suspiciousExpressions = {
            'surprised': 0.6,  // Caught doing something
            'fearful': 0.5,    // Afraid of being caught
            'angry': 0.6,      // Frustrated (can't find answer)
            'disgusted': 0.5   // Unusual during exam
        };
        
        // Check if current expression is suspicious
        const isSuspicious = suspiciousExpressions[expressionName] && 
                            confidence > suspiciousExpressions[expressionName];
        
        if (isSuspicious) {
            handleSuspiciousExpression(expressionName, confidence, currentTime);
        } else {
            resetSuspiciousExpressionTimer();
        }
    };

    const handleSuspiciousExpression = (expression, confidence, currentTime) => {
        if (!violationTimersRef.current.suspiciousExpressionStartTime) {
            violationTimersRef.current.suspiciousExpressionStartTime = currentTime;
        }

        const duration = currentTime - violationTimersRef.current.suspiciousExpressionStartTime;

        if (duration > 3000 && !violationTimersRef.current.suspiciousExpression) {
            violationTimersRef.current.suspiciousExpression = true;
            logViolation('SUSPICIOUS_EXPRESSION', `Unusual expression detected: ${expression} (${(confidence * 100).toFixed(0)}%)`);
            setCurrentWarning({
                type: 'SUSPICIOUS_EXPRESSION',
                message: `⚠️ Unusual behavior detected: ${expression}`,
                icon: AlertTriangle,
                color: 'yellow'
            });
            toast.error(`⚠️ Suspicious expression: ${expression}`, {
                duration: 3000,
                style: { background: '#D97706', color: '#fff', fontWeight: 'bold' }
            });
        }
    };

    const resetSuspiciousExpressionTimer = () => {
        violationTimersRef.current.suspiciousExpressionStartTime = null;
        violationTimersRef.current.suspiciousExpression = false;
        if (currentWarning?.type === 'SUSPICIOUS_EXPRESSION') {
            setCurrentWarning(null);
        }
    };

    // 👁️ EYE GAZE TRACKING - Detects eye movement without head movement
    const trackEyeGaze = (landmarks, currentTime) => {
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        const nose = landmarks.getNose();
        
        // Calculate eye center positions
        const leftEyeCenter = {
            x: leftEye.reduce((sum, p) => sum + p.x, 0) / leftEye.length,
            y: leftEye.reduce((sum, p) => sum + p.y, 0) / leftEye.length
        };
        const rightEyeCenter = {
            x: rightEye.reduce((sum, p) => sum + p.x, 0) / rightEye.length,
            y: rightEye.reduce((sum, p) => sum + p.y, 0) / rightEye.length
        };
        const noseCenter = { x: nose[3].x, y: nose[3].y };
        
        // Calculate gaze direction based on eye-nose relationship
        const eyeMidpoint = {
            x: (leftEyeCenter.x + rightEyeCenter.x) / 2,
            y: (leftEyeCenter.y + rightEyeCenter.y) / 2
        };
        
        const horizontalDiff = eyeMidpoint.x - noseCenter.x;
        const eyeDistance = Math.abs(rightEyeCenter.x - leftEyeCenter.x);
        
        // Determine gaze direction
        let gazeDirection = 'center';
        const threshold = eyeDistance * 0.15; // 15% of eye distance
        
        if (Math.abs(horizontalDiff) > threshold) {
            if (horizontalDiff > 0) {
                gazeDirection = 'left'; // Looking left (side screen/notes)
            } else {
                gazeDirection = 'right'; // Looking right (side screen/notes)
            }
        }
        
        setDetectionStats(prev => ({ ...prev, eyeGazeDirection: gazeDirection }));
        
        // Trigger violation if looking away
        if (gazeDirection !== 'center') {
            handleEyeGazeAway(gazeDirection, currentTime);
        } else {
            resetEyeGazeTimer();
        }
    };

    const handleEyeGazeAway = (direction, currentTime) => {
        if (!violationTimersRef.current.eyeGazeAwayStartTime) {
            violationTimersRef.current.eyeGazeAwayStartTime = currentTime;
        }

        const duration = currentTime - violationTimersRef.current.eyeGazeAwayStartTime;

        if (duration > 2000 && !violationTimersRef.current.eyeGazeAway) {
            violationTimersRef.current.eyeGazeAway = true;
            logViolation('EYE_GAZE_AWAY', `Eyes looking ${direction} - possible side screen/notes`);
            setCurrentWarning({
                type: 'EYE_GAZE_AWAY',
                message: `⚠️ Eyes looking ${direction}. Focus on screen.`,
                icon: EyeOff,
                color: 'red'
            });
            toast.error(`⚠️ Eyes looking ${direction}!`, {
                duration: 4000,
                style: { background: '#DC2626', color: '#fff', fontWeight: 'bold' }
            });
        }
    };

    const resetEyeGazeTimer = () => {
        violationTimersRef.current.eyeGazeAwayStartTime = null;
        violationTimersRef.current.eyeGazeAway = false;
        if (currentWarning?.type === 'EYE_GAZE_AWAY') {
            setCurrentWarning(null);
        }
    };

    // 🧾 ENVIRONMENT QUALITY CHECK - Pre-exam validation
    const checkEnvironmentQuality = (video, detection) => {
        // Check lighting quality
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let brightness = 0;
        
        for (let i = 0; i < data.length; i += 4) {
            brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
        brightness = brightness / (data.length / 4);
        
        let lightingStatus = 'good';
        if (brightness < 60) {
            lightingStatus = 'too_dark';
            if (!detectionStats.environmentChecked) {
                toast.error('⚠️ Lighting too dark. Improve lighting.', {
                    duration: 5000,
                    style: { background: '#EA580C', color: '#fff' }
                });
            }
        } else if (brightness > 200) {
            lightingStatus = 'too_bright';
            if (!detectionStats.environmentChecked) {
                toast.error('⚠️ Lighting too bright. Adjust lighting.', {
                    duration: 5000,
                    style: { background: '#EA580C', color: '#fff' }
                });
            }
        }
        
        setDetectionStats(prev => ({
            ...prev,
            lighting: lightingStatus,
            environmentChecked: true
        }));
    };

    const logViolation = (type, description) => {
        const violation = {
            time: new Date().toLocaleTimeString(),
            type,
            description,
            timestamp: Date.now()
        };
        setViolations(prev => [...prev, violation]);
        console.log('🚨 VIOLATION:', violation);
    };

    const renderCameraContent = () => {
        switch (cameraStatus) {
            case 'active':
                return (
                    <>
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            mirrored={true}
                            videoConstraints={{
                                width: 192,
                                height: 144,
                                facingMode: 'user'
                            }}
                            className="w-full h-full object-cover rounded"
                        />
                        <canvas ref={canvasRef} className="hidden" />
                    </>
                );
            
            case 'denied':
                return (
                    <div className="flex flex-col items-center justify-center h-full bg-red-50 rounded p-2 border border-red-300">
                        <CameraOff className="w-6 h-6 text-red-600 mb-1" />
                        <p className="text-[10px] font-bold text-red-700 text-center">⚠️ Required</p>
                        <p className="text-[8px] text-red-600 text-center mt-0.5">Enable camera</p>
                    </div>
                );
            
            case 'error':
                return (
                    <div className="flex flex-col items-center justify-center h-full bg-yellow-50 rounded p-2 border border-yellow-300">
                        <AlertTriangle className="w-6 h-6 text-yellow-600 mb-1" />
                        <p className="text-[10px] font-bold text-yellow-700 text-center">⚠️ Error</p>
                        <button 
                            onClick={requestCameraPermission}
                            className="text-[8px] text-yellow-600 underline mt-0.5"
                        >
                            Retry
                        </button>
                    </div>
                );
            
            default:
                return (
                    <div className="flex items-center justify-center h-full bg-gray-100 rounded">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                    </div>
                );
        }
    };

    return (
        <div className="fixed top-20 left-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl border-2 border-[#E2E8F0] overflow-hidden w-64">
                {/* Header */}
                <div className="bg-[#0F172A] px-3 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${cameraStatus === 'active' && isCameraEnabled ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                        <span className="text-white text-xs font-bold uppercase tracking-wider">
                            {modelsLoaded ? 'AI Active' : 'Loading'}
                        </span>
                    </div>
                    <button 
                        onClick={() => setIsCameraEnabled(!isCameraEnabled)}
                        className="text-white text-xs hover:bg-white/10 px-2 py-1 rounded font-medium"
                    >
                        {isCameraEnabled ? 'OFF' : 'ON'}
                    </button>
                </div>

                {/* Warning Banner */}
                {currentWarning && (
                    <div className={`px-3 py-2 text-xs font-bold text-white flex items-center gap-2 ${
                        currentWarning.color === 'red' ? 'bg-red-600' :
                        currentWarning.color === 'orange' ? 'bg-orange-600' :
                        'bg-yellow-600'
                    }`}>
                        <currentWarning.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate text-xs leading-tight">{currentWarning.message}</span>
                    </div>
                )}

                {/* Camera Feed - BIGGER */}
                <div className="relative w-full h-48 bg-gray-900">
                    {isCameraEnabled ? renderCameraContent() : (
                        <div className="flex flex-col items-center justify-center h-full bg-gray-800">
                            <CameraOff className="w-10 h-10 text-gray-400 mb-2" />
                            <p className="text-gray-400 text-sm">Camera Off</p>
                        </div>
                    )}
                    
                    {/* Detection Overlay */}
                    {cameraStatus === 'active' && isCameraEnabled && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                            <p className="text-white text-xs font-medium text-center">
                                {modelsLoaded ? `🔒 Faces: ${detectionStats.faceCount}` : '⏳ Loading AI...'}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="bg-[#F8FAFC] px-3 py-2 border-t border-[#E2E8F0]">
                    <p className="text-xs text-[#64748B] text-center font-medium">
                        {violations.length} violations
                    </p>
                </div>
            </div>

            {/* Violations Log (Hidden - for debugging) */}
            {violations.length > 0 && (
                <div className="hidden">
                    {violations.map((v, i) => (
                        <div key={i}>{v.time} - {v.type}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LiveCameraMonitor;
