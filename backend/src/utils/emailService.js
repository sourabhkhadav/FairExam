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
                                                    <p style="margin: 0; color: #64748B; font-size: 13px;">Duration: <strong style="color: #0F172A;">${Math.round(examDetails.duration)} minutes</strong></p>
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
        const seconds = timeValue > 10000 ? Math.floor(timeValue / 1000) : timeValue;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const requiredMarks = Math.ceil((passingPercentage / 100) * totalMarks);

    const getViolationCounts = () => {
        if (!violations || violations.length === 0) return { face: 0, sound: 0, fullscreen: 0 };
        return violations.reduce((acc, v) => {
            const counts = v.count || {};
            acc.face += counts.faceDetection || 0;
            acc.sound += counts.soundDetection || 0;
            acc.fullscreen += counts.fullscreenExit || 0;
            return acc;
        }, { face: 0, sound: 0, fullscreen: 0 });
    };

    const violationCounts = getViolationCounts();

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
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:20px 10px">
        <tr>
            <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
                    <!-- Header -->
                    <tr>
                        <td style="background:#0f172a;padding:16px 20px;text-align:center">
                            <div style="font-size:20px;font-weight:700;color:#fff;margin:0">FairExam</div>
                            <div style="font-size:11px;color:#94a3b8;margin:2px 0 0 0">Online Examination Platform</div>
                        </td>
                    </tr>
                    <!-- Status Banner -->
                    <tr>
                        <td style="background:${isPassed ? '#dcfce7' : '#fed7aa'};padding:12px 20px;text-align:center">
                            <div style="font-size:15px;font-weight:600;color:${isPassed ? '#065f46' : '#9a3412'};margin:0">
                                ${isPassed ? 'Congratulations! You Passed 🎉' : 'You did not pass this time'}
                            </div>
                        </td>
                    </tr>
                    <!-- Content -->
                    <tr>
                        <td style="padding:20px">
                            <!-- Student Info Row -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0">
                                <tr>
                                    <td style="font-size:12px;color:#64748b;padding:0 8px 0 0">
                                        <strong style="color:#0f172a">${candidateName}</strong>
                                    </td>
                                    <td style="font-size:12px;color:#64748b;padding:0 8px">
                                        ${examTitle}
                                    </td>
                                    <td style="font-size:12px;color:#64748b;padding:0 0 0 8px;text-align:right">
                                        ${formatDate(submittedAt)}
                                    </td>
                                </tr>
                            </table>
                            <!-- Performance Card -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:8px;margin:0 0 12px 0">
                                <tr>
                                    <td style="padding:14px;text-align:center;border-right:1px solid #e2e8f0">
                                        <div style="font-size:11px;color:#64748b;margin:0 0 4px 0">Score</div>
                                        <div style="font-size:18px;font-weight:700;color:#0f172a">${score}/${totalMarks}</div>
                                    </td>
                                    <td style="padding:14px;text-align:center;border-right:1px solid #e2e8f0">
                                        <div style="font-size:11px;color:#64748b;margin:0 0 4px 0">Percentage</div>
                                        <div style="font-size:18px;font-weight:700;color:${isPassed ? '#059669' : '#dc2626'}">${percentage}%</div>
                                    </td>
                                    <td style="padding:14px;text-align:center${!isPassed ? ';border-right:1px solid #e2e8f0' : ''}">
                                        <div style="font-size:11px;color:#64748b;margin:0 0 4px 0">Passing</div>
                                        <div style="font-size:18px;font-weight:700;color:#0f172a">${passingPercentage}%</div>
                                    </td>
                                    ${!isPassed ? `
                                    <td style="padding:14px;text-align:center">
                                        <div style="font-size:11px;color:#64748b;margin:0 0 4px 0">Required</div>
                                        <div style="font-size:18px;font-weight:700;color:#dc2626">${requiredMarks}</div>
                                    </td>
                                    ` : ''}
                                </tr>
                            </table>
                            ${!isPassed && totalViolations > 0 ? `
                            <!-- Violations -->
                            <div style="font-size:11px;color:#7f1d1d;background:#fef2f2;padding:8px 12px;border-radius:6px;margin:0 0 12px 0">
                                <strong>Proctoring Flags:</strong> Face: ${violationCounts.face} | Sound: ${violationCounts.sound} | Fullscreen: ${violationCounts.fullscreen}
                            </div>
                            ` : ''}
                            <!-- Message -->
                            <div style="background:${isPassed ? '#ecfdf5' : '#fff7ed'};border-left:3px solid ${isPassed ? '#10b981' : '#f97316'};padding:12px;border-radius:6px;margin:0">">
                                <div style="font-size:13px;color:${isPassed ? '#065f46' : '#9a3412'};line-height:1.5;margin:0">
                                    ${isPassed ? 'Great work! Keep achieving more.' : "Don't worry — you can improve in the next attempt."}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="background:#f8fafc;padding:12px 20px;text-align:center;border-top:1px solid #e2e8f0">
                            <div style="font-size:10px;color:#94a3b8;margin:0">This is an automated email. Please do not reply.</div>
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
                                                    <p style="margin: 0; color: #64748B; font-size: 13px;">Duration: <strong style="color: #0F172A;">${Math.round(examDetails.duration)} minutes</strong></p>
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

// Send OTP email for password reset
export const sendOtpEmail = async (to, otp, name) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'FairExam <sourabhkhadav2@gmail.com>',
        to,
        subject: 'Password Reset OTP - FairExam',
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
                                        <p style="margin: 5px 0 0 0; color: #94A3B8; font-size: 13px;">Password Reset Request</p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        <p style="margin: 0 0 20px 0; color: #64748B; font-size: 15px;">Dear ${name},</p>
                                        <p style="margin: 0 0 25px 0; color: #0F172A; font-size: 15px; line-height: 1.6;">
                                            We received a request to reset your password. Use the OTP below to proceed:
                                        </p>
                                        <div style="background: #EFF6FF; border: 2px solid #3B82F6; border-radius: 8px; padding: 20px; margin-bottom: 25px; text-align: center;">
                                            <p style="margin: 0 0 10px 0; color: #1E40AF; font-size: 14px; font-weight: 600;">Your OTP Code</p>
                                            <p style="margin: 0; color: #1E3A8A; font-size: 32px; font-weight: bold; letter-spacing: 8px;">${otp}</p>
                                        </div>
                                        <p style="margin: 0 0 15px 0; color: #EF4444; font-size: 13px; text-align: center;">
                                            This OTP will expire in 10 minutes.
                                        </p>
                                        <p style="margin: 0; color: #64748B; font-size: 14px; line-height: 1.6;">
                                            If you didn't request this, please ignore this email.
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
