import transporter from '../config/email.js';

// Send exam invitation email
export const sendExamInvitation = async (to, examDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM || 'FairExam <sourabhkhadav2@gmail.com>',
        to,
        subject: `Exam Invitation: ${examDetails.title}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0F172A;">Exam Invitation</h2>
                <p>You have been invited to take the following exam:</p>
                <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="margin: 0 0 10px 0;">${examDetails.title}</h3>
                    <p><strong>Date:</strong> ${examDetails.startDate}</p>
                    <p><strong>Time:</strong> ${examDetails.startTime}</p>
                    <p><strong>Duration:</strong> ${examDetails.duration} minutes</p>
                </div>
                <p>Please login to FairExam platform to take the exam.</p>
                <p style="color: #64748B; font-size: 12px;">This is an automated email. Please do not reply.</p>
            </div>
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