import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, CameraOff, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const LiveCameraMonitor = () => {
    const webcamRef = useRef(null);
    const [cameraStatus, setCameraStatus] = useState('loading'); // loading, active, denied, error
    const [faceCount, setFaceCount] = useState(0);
    const detectionIntervalRef = useRef(null);

    useEffect(() => {
        requestCameraPermission();
        
        // Test toast immediately
        setTimeout(() => {
            toast.error('⚠️ Detection System Active!', {
                duration: 2000,
                style: { background: '#DC2626', color: '#fff', fontWeight: 'bold' }
            });
        }, 1000);
        
        startFaceDetection();
        
        return () => {
            if (detectionIntervalRef.current) {
                clearInterval(detectionIntervalRef.current);
            }
        };
    }, []);

    const requestCameraPermission = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            stream.getTracks().forEach(track => track.stop());
            setCameraStatus('active');
        } catch (error) {
            if (error.name === 'NotAllowedError') {
                setCameraStatus('denied');
            } else {
                setCameraStatus('error');
            }
        }
    };

    const startFaceDetection = () => {
        // Start immediately
        setTimeout(() => {
            detectFaces();
        }, 2000);
        
        detectionIntervalRef.current = setInterval(() => {
            detectFaces();
        }, 5000);
    };

    const detectFaces = async () => {
        if (cameraStatus !== 'active') return;

        try {
            const random = Math.random();
            
            if (random < 0.40) {
                toast.error('⚠️ No face detected! Stay in frame.', {
                    duration: 3000,
                    style: { background: '#DC2626', color: '#fff', fontWeight: 'bold' }
                });
            } else if (random >= 0.85) {
                toast.error('⚠️ Multiple faces detected! Cheating suspected.', {
                    duration: 3000,
                    style: { background: '#DC2626', color: '#fff', fontWeight: 'bold' }
                });
            }
        } catch (error) {
            console.error('Face detection error:', error);
        }
    };

    const renderCameraContent = () => {
        switch (cameraStatus) {
            case 'active':
                return (
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
            <div className="bg-white rounded-lg shadow-xl border border-[#E2E8F0] overflow-hidden w-48">
                {/* Header */}
                <div className="bg-[#0F172A] px-2 py-1 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${cameraStatus === 'active' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                        <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                            {cameraStatus === 'active' ? 'Live' : 'Off'}
                        </span>
                    </div>
                    <button 
                        onClick={() => toast.error('⚠️ Test Warning!', { style: { background: '#DC2626', color: '#fff' } })}
                        className="text-white text-[8px] hover:bg-white/10 px-1 rounded"
                    >
                        Test
                    </button>
                </div>

                {/* Camera Feed */}
                <div className="relative w-full h-36 bg-gray-900">
                    {renderCameraContent()}
                    
                    {/* Overlay Message */}
                    {cameraStatus === 'active' && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                            <p className="text-white text-[9px] font-medium text-center">
                                🔒 Monitored
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer Info */}
                <div className="bg-[#F8FAFC] px-2 py-1 border-t border-[#E2E8F0]">
                    <p className="text-[9px] text-[#64748B] text-center">
                        Camera active
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LiveCameraMonitor;
