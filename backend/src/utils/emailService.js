import transporter from '../config/email.js';

// Send exam invitation email
export const sendExamInvitation = async (to, examDetails) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === 'TBD') return 'To Be Decided';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (timeStr) => {
        if (!timeStr || timeStr === 'TBD') return 'To Be Decided';
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'FairExam <sourabhkhadav2@gmail.com>',
        to,
        subject: `Exam Invitation: ${examDetails.title}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
                                <!-- Header -->
                                <tr>
                                    <td style="background: #0F172A; padding: 30px; text-align: center;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 24px;">📝 FairExam</h1>
                                        <p style="margin: 5px 0 0 0; color: #94A3B8; font-size: 13px;">Online Examination Platform</p>
                                    </td>
                                </tr>
                                
                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <p style="margin: 0 0 20px 0; color: #64748B; font-size: 15px;">Dear Student,</p>
                                        
                                        <p style="margin: 0 0 25px 0; color: #0F172A; font-size: 15px; line-height: 1.6;">
                                            You have been invited to take the following exam:
                                        </p>
                                        
                                        <h2 style="margin: 0 0 25px 0; color: #0F172A; font-size: 20px; font-weight: 600;">${examDetails.title}</h2>
                                        
                                        <!-- Exam Details -->
                                        <table width="100%" cellpadding="0" cellspacing="0" style="background: #F8FAFC; border-radius: 8px; margin-bottom: 25px;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <p style="margin: 0 0 8px 0; color: #64748B; font-size: 13px;">Exam Date: <strong style="color: #0F172A;">${formatDate(examDetails.startDate)}</strong></p>
                                                    <p style="margin: 0 0 8px 0; color: #64748B; font-size: 13px;">Exam Time: <strong style="color: #0F172A;">${formatTime(examDetails.startTime)}</strong></p>
                                                    <p style="margin: 0; color: #64748B; font-size: 13px;">Duration: <strong style="color: #0F172A;">${examDetails.duration} minutes</strong></p>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <p style="margin: 0; color: #64748B; font-size: 14px; line-height: 1.6; text-align: center;">
                                            Best regards,<br/>FairExam Team
                                        </p>
                                    </td>
                                </tr>
                                
                                <!-- Footer -->
                                <tr>
                                    <td style="background: #F8FAFC; padding: 20px 30px; text-align: center; border-top: 1px solid #E2E8F0;">
                                        <p style="margin: 0; color: #94A3B8; font-size: 12px;">
                                            This is an automated email. Please do not reply.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// Send violation alert email
export const sendViolationAlert = async (to, violationDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'FairExam <sourabhkhadav2@gmail.com>',
        to,
        subject: `Violation Alert: ${violationDetails.examName}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #EF4444;">⚠️ Violation Alert</h2>
                <p>A violation has been detected during the exam:</p>
                <div style="background: #FEF2F2; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #EF4444;">
                    <p><strong>Candidate:</strong> ${violationDetails.candidateName}</p>
                    <p><strong>Exam:</strong> ${violationDetails.examName}</p>
                    <p><strong>Violation Count:</strong> ${violationDetails.violationCount}</p>
                    <p><strong>Time:</strong> ${new Date(violationDetails.timestamp).toLocaleString()}</p>
                </div>
                <p>Please review the violation report in the FairExam dashboard.</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// Send exam result email
export const sendExamResult = async (to, resultDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'FairExam <sourabhkhadav2@gmail.com>',
        to,
        subject: `Exam Results: ${resultDetails.examTitle}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F172A;">Exam Results</h2>
                <p>Your exam results are now available:</p>
                <div style="background: #F0FDF4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0;">${resultDetails.examTitle}</h3>
                    <p><strong>Score:</strong> ${resultDetails.score}/${resultDetails.totalMarks}</p>
                    <p><strong>Percentage:</strong> ${resultDetails.percentage}%</p>
                    <p><strong>Status:</strong> ${resultDetails.status}</p>
                </div>
                <p>Login to FairExam to view detailed results.</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// Send detailed exam result with violations
export const sendDetailedExamResult = async (to, resultDetails) => {
    const {
        examTitle, candidateName, score, totalMarks, percentage, timeTaken,
        isPassed, passingPercentage, totalViolations, violations, submittedAt
    } = resultDetails;

    const formatTime = (timeValue) => {
        // Handle if time is in milliseconds (> 10000 suggests milliseconds)
        const seconds = timeValue > 10000 ? Math.floor(timeValue / 1000) : timeValue;
        
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hrs > 0) {
            return `${hrs}h ${mins}m ${secs}s`;
        } else if (mins > 0) {
            return `${mins}m ${secs}s`;
        } else {
            return `${secs}s`;
        }
    };

    const getViolationSummary = () => {
        if (totalViolations === 0) return '';
        
        const violationTypes = violations.reduce((acc, v) => {
            const counts = v.count || {};
            acc.face += counts.faceDetection || 0;
            acc.sound += counts.soundDetection || 0;
            acc.fullscreen += counts.fullscreenExit || 0;
            acc.tab += counts.tabSwitch || 0;
            return acc;
        }, { face: 0, sound: 0, fullscreen: 0, tab: 0 });

        const items = [];
        if (violationTypes.face > 0) items.push(`Face Detection: ${violationTypes.face}`);
        if (violationTypes.sound > 0) items.push(`Sound Detection: ${violationTypes.sound}`);
        if (violationTypes.fullscreen > 0) items.push(`Fullscreen Exit: ${violationTypes.fullscreen}`);
        if (violationTypes.tab > 0) items.push(`Tab Switch: ${violationTypes.tab}`);
        
        return items.length > 0 ? `
            <div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 16px 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0; color: #991B1B; font-size: 14px; font-weight: 600;">⚠️ Violations Detected (${totalViolations} total)</p>
                ${items.map(item => `<p style="margin: 0 0 5px 0; color: #7F1D1D; font-size: 13px;">• ${item}</p>`).join('')}
            </div>
        ` : '';
    };

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'FairExam <sourabhkhadav2@gmail.com>',
        to,
        subject: `${isPassed ? '🎉' : '📋'} Exam Results: ${examTitle}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                                <tr>
                                    <td style="background: ${isPassed ? 'linear-gradient(135deg, #10B981, #059669)' : 'linear-gradient(135deg, #EF4444, #DC2626)'}; padding: 30px; text-align: center;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 24px;">📝 FairExam Results</h1>
                                        <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">Online Examination Platform</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <p style="margin: 0 0 20px 0; color: #64748B; font-size: 15px;">Dear ${candidateName},</p>
                                        
                                        <div style="background: ${isPassed ? '#DCFCE7' : '#FEF2F2'}; border-left: 4px solid ${isPassed ? '#10B981' : '#EF4444'}; padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
                                            <h2 style="margin: 0 0 10px 0; color: ${isPassed ? '#065F46' : '#991B1B'}; font-size: 24px; font-weight: 700;">
                                                ${isPassed ? '🎉 Congratulations!' : '📋 Result Summary'}
                                            </h2>
                                            <p style="margin: 0; color: ${isPassed ? '#047857' : '#7F1D1D'}; font-size: 16px; font-weight: 600;">
                                                You have ${isPassed ? 'PASSED' : 'NOT PASSED'} the examination
                                            </p>
                                        </div>
                                        
                                        <h3 style="margin: 0 0 20px 0; color: #0F172A; font-size: 20px; font-weight: 600;">${examTitle}</h3>
                                        
                                        <table width="100%" cellpadding="0" cellspacing="0" style="background: #F8FAFC; border-radius: 8px; margin-bottom: 20px; border: 1px solid #E2E8F0;">
                                            <tr>
                                                <td style="padding: 25px;">
                                                    <p style="margin: 0 0 15px 0; color: #64748B; font-size: 14px;">Your Score: <strong style="color: #0F172A; font-size: 18px;">${score} / ${totalMarks}</strong></p>
                                                    <p style="margin: 0 0 15px 0; color: #64748B; font-size: 14px;">Percentage: <strong style="color: ${isPassed ? '#059669' : '#DC2626'}; font-size: 18px;">${percentage}%</strong></p>
                                                    <p style="margin: 0 0 15px 0; color: #64748B; font-size: 14px;">Passing Percentage: <strong style="color: #0F172A; font-size: 16px;">${passingPercentage}%</strong></p>
                                                    <p style="margin: 0; color: #64748B; font-size: 14px;">Time Taken: <strong style="color: #0F172A; font-size: 16px;">${formatTime(timeTaken)}</strong></p>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        ${getViolationSummary()}
                                        
                                        ${isPassed ? `
                                            <div style="background: #ECFDF5; border: 2px solid #10B981; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
                                                <p style="margin: 0; color: #065F46; font-size: 15px; line-height: 1.6;">
                                                    <strong>🌟 Excellent work!</strong><br/>
                                                    You have successfully completed the examination with a score of ${percentage}%. 
                                                    Your dedication and hard work have paid off. Keep up the great work!
                                                </p>
                                            </div>
                                        ` : `
                                            <div style="background: #FEF7F7; border: 2px solid #F87171; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
                                                <p style="margin: 0; color: #7F1D1D; font-size: 15px; line-height: 1.6;">
                                                    <strong>📚 Keep Learning!</strong><br/>
                                                    You scored ${percentage}%, which is below the passing threshold of ${passingPercentage}%. 
                                                    Don't be discouraged - this is an opportunity to learn and improve. 
                                                    Review the material and you'll do better next time!
                                                </p>
                                            </div>
                                        `}
                                        
                                        <div style="background: #F1F5F9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                            <p style="margin: 0; color: #475569; font-size: 13px; text-align: center;">
                                                <strong>Submitted:</strong> ${new Date(submittedAt).toLocaleString()}
                                            </p>
                                        </div>
                                        
                                        <p style="margin: 0; color: #64748B; font-size: 14px; line-height: 1.6; text-align: center;">
                                            Best regards,<br/>FairExam Team
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background: #F8FAFC; padding: 20px 30px; text-align: center; border-top: 1px solid #E2E8F0;">
                                        <p style="margin: 0; color: #94A3B8; font-size: 12px;">
                                            This is an automated email. Please do not reply.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// Send test email
export const sendTestEmail = async (to) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'FairExam <sourabhkhadav2@gmail.com>',
        to,
        subject: 'FairExam - Email Configuration Test',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F172A;">✅ Email Configuration Successful!</h2>
                <p>This is a test email from FairExam.</p>
                <p>Your Nodemailer configuration is working correctly.</p>
                <p style="color: #64748B; font-size: 12px; margin-top: 20px;">Sent at: ${new Date().toLocaleString()}</p>
            </div>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// Send exam cancellation email
export const sendExamCancellation = async (to, examDetails) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === 'TBD') return 'To Be Decided';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (timeStr) => {
        if (!timeStr || timeStr === 'TBD') return 'To Be Decided';
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'FairExam <sourabhkhadav2@gmail.com>',
        to,
        subject: `Exam Cancelled: ${examDetails.title}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
                                <tr>
                                    <td style="background: #0F172A; padding: 30px; text-align: center;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 24px;">📝 FairExam</h1>
                                        <p style="margin: 5px 0 0 0; color: #94A3B8; font-size: 13px;">Online Examination Platform</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <p style="margin: 0 0 20px 0; color: #64748B; font-size: 15px;">Dear Student,</p>
                                        
                                        <div style="background: #FEF2F2; border-left: 4px solid #EF4444; padding: 16px 20px; border-radius: 8px; margin-bottom: 25px;">
                                            <p style="margin: 0; color: #991B1B; font-size: 15px; font-weight: 600;">⚠️ Exam Cancelled</p>
                                        </div>
                                        
                                        <p style="margin: 0 0 20px 0; color: #0F172A; font-size: 15px; line-height: 1.6;">
                                            The following exam has been cancelled:
                                        </p>
                                        
                                        <h2 style="margin: 0 0 25px 0; color: #0F172A; font-size: 20px; font-weight: 600;">${examDetails.title}</h2>
                                        
                                        <table width="100%" cellpadding="0" cellspacing="0" style="background: #F8FAFC; border-radius: 8px; margin-bottom: 25px;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <p style="margin: 0 0 10px 0; color: #64748B; font-size: 13px;"><strong>Originally Scheduled:</strong></p>
                                                    <p style="margin: 0; color: #0F172A; font-size: 15px;">${formatDate(examDetails.startDate)} at ${formatTime(examDetails.startTime)}</p>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <p style="margin: 0 0 20px 0; color: #0F172A; font-size: 15px; line-height: 1.6;">
                                            You will receive further communication regarding any rescheduling.
                                        </p>
                                        
                                        <p style="margin: 0; color: #64748B; font-size: 14px; line-height: 1.6; text-align: center;">
                                            Best regards,<br/>FairExam Team
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background: #F8FAFC; padding: 20px 30px; text-align: center; border-top: 1px solid #E2E8F0;">
                                        <p style="margin: 0; color: #94A3B8; font-size: 12px;">
                                            This is an automated email. Please do not reply.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    return await transporter.sendMail(mailOptions);
};

// Send exam start email with credentials
export const sendExamStartEmail = async (to, examDetails, candidateDetails) => {
    const formatDate = (dateStr) => {
        if (!dateStr || dateStr === 'TBD') return 'To Be Decided';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (timeStr) => {
        if (!timeStr || timeStr === 'TBD') return 'To Be Decided';
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const examUrl = `http://localhost:5173/candidate-login?examId=${examDetails.examId}&candidateId=${candidateDetails.candidateId}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM || 'FairExam <sourabhkhadav2@gmail.com>',
        to,
        subject: `Exam Started: ${examDetails.title} - Login Credentials`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden;">
                                <tr>
                                    <td style="background: #0F172A; padding: 30px; text-align: center;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 24px;">📝 FairExam</h1>
                                        <p style="margin: 5px 0 0 0; color: #94A3B8; font-size: 13px;">Online Examination Platform</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <div style="background: #DCFCE7; border-left: 4px solid #10B981; padding: 16px 20px; border-radius: 8px; margin-bottom: 25px;">
                                            <p style="margin: 0; color: #065F46; font-size: 15px; font-weight: 600;">✅ Your Exam is Now Active</p>
                                        </div>
                                        
                                        <p style="margin: 0 0 20px 0; color: #64748B; font-size: 15px;">Dear ${candidateDetails.name},</p>
                                        
                                        <p style="margin: 0 0 25px 0; color: #0F172A; font-size: 15px; line-height: 1.6;">
                                            Your exam is now active and ready to begin.
                                        </p>
                                        
                                        <h2 style="margin: 0 0 20px 0; color: #0F172A; font-size: 20px; font-weight: 600;">${examDetails.title}</h2>
                                        
                                        <table width="100%" cellpadding="0" cellspacing="0" style="background: #F8FAFC; border-radius: 8px; margin-bottom: 20px;">
                                            <tr>
                                                <td style="padding: 20px;">
                                                    <p style="margin: 0 0 8px 0; color: #64748B; font-size: 13px;">Exam Date: <strong style="color: #0F172A;">${formatDate(examDetails.startDate)}</strong></p>
                                                    <p style="margin: 0 0 8px 0; color: #64748B; font-size: 13px;">Exam Time: <strong style="color: #0F172A;">${formatTime(examDetails.startTime)}</strong></p>
                                                    <p style="margin: 0; color: #64748B; font-size: 13px;">Duration: <strong style="color: #0F172A;">${examDetails.duration} minutes</strong></p>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <div style="background: #EFF6FF; border: 2px solid #3B82F6; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                                            <p style="margin: 0 0 15px 0; color: #1E40AF; font-size: 14px; font-weight: 600;">🔐 Your Login Credentials</p>
                                            <p style="margin: 0 0 8px 0; color: #1E3A8A; font-size: 14px;">Candidate ID: <strong style="font-size: 16px;">${candidateDetails.candidateId}</strong></p>
                                            <p style="margin: 0; color: #1E3A8A; font-size: 14px;">Password: <strong style="font-size: 16px;">${candidateDetails.password}</strong></p>
                                        </div>
                                        
                                        <p style="margin: 0 0 15px 0; color: #64748B; font-size: 13px; text-align: center;">Use the credentials above to login at:</p>
                                        <p style="margin: 0 0 20px 0; color: #3B82F6; font-size: 13px; text-align: center; word-break: break-all;">${examUrl}</p>
                                        
                                        <p style="margin: 0; color: #64748B; font-size: 14px; line-height: 1.6; text-align: center;">
                                            Best regards,<br/>FairExam Team
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="background: #F8FAFC; padding: 20px 30px; text-align: center; border-top: 1px solid #E2E8F0;">
                                        <p style="margin: 0; color: #94A3B8; font-size: 12px;">
                                            This is an automated email. Please do not reply.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    };

    return await transporter.sendMail(mailOptions);
};