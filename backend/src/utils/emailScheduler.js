import Exam from '../models/Exam.js';
import Candidate from '../models/Candidate.js';
import { sendExamInvitation, sendExamStartEmail } from './emailService.js';

// Check and send scheduled emails every minute
let isRunning = false;

export const startEmailScheduler = () => {
    setInterval(async () => {
        if (isRunning) {
            console.log('⏭️ Skipping - previous job still running');
            return;
        }
        
        isRunning = true;
        try {
            const now = new Date();
            const currentDate = now.toISOString().split('T')[0];
            const currentTime = now.toTimeString().slice(0, 5);

            // Send scheduled invitation emails
            const scheduledExams = await Exam.find({
                status: 'published',
                scheduleEmailDate: currentDate,
                scheduleEmailTime: { $lte: currentTime },
                emailSent: false
            });

            for (const exam of scheduledExams) {
                console.log(`📧 Sending scheduled emails for exam: ${exam.title}`);
                
                const candidates = await Candidate.find({ examId: exam._id });
                
                if (candidates.length === 0) {
                    console.log(`⚠️ No candidates found for exam: ${exam.title}`);
                    continue;
                }

                const examDetails = {
                    title: exam.title,
                    startDate: exam.startDate || 'TBD',
                    startTime: exam.startTime || 'TBD',
                    duration: exam.duration || 0
                };

                let sent = 0;
                for (const candidate of candidates) {
                    if (candidate.email) {
                        try {
                            await sendExamInvitation(candidate.email, examDetails);
                            sent++;
                        } catch (error) {
                            console.error(`❌ Failed to send to ${candidate.email}:`, error.message);
                        }
                    }
                }

                exam.emailSent = true;
                await exam.save();
                
                console.log(`✅ Sent ${sent} scheduled emails for exam: ${exam.title}`);
            }

            // Send exam start emails with credentials
            const startingExams = await Exam.find({
                status: 'published',
                startDate: currentDate,
                startTime: { $lte: currentTime },
                examStartEmailSent: false
            });

            for (const exam of startingExams) {
                console.log(`🚀 Sending exam start emails for: ${exam.title}`);
                
                const candidates = await Candidate.find({ examId: exam._id });
                
                if (candidates.length === 0) {
                    console.log(`⚠️ No candidates found for exam: ${exam.title}`);
                    continue;
                }

                const examDetails = {
                    examId: exam._id,
                    title: exam.title,
                    startDate: exam.startDate || 'TBD',
                    startTime: exam.startTime || 'TBD',
                    duration: exam.duration || 0
                };

                let sent = 0;
                for (const candidate of candidates) {
                    if (candidate.email) {
                        // Generate credentials if not exists
                        if (!candidate.candidateId || !candidate.password) {
                            const candidateId = `CAND${exam._id.toString().slice(-4)}${String(candidates.indexOf(candidate) + 1).padStart(4, '0')}`;
                            const password = Math.random().toString(36).slice(-8).toUpperCase();
                            candidate.candidateId = candidateId;
                            candidate.password = password;
                            await candidate.save();
                        }
                        
                        try {
                            const candidateDetails = {
                                name: candidate.name,
                                candidateId: candidate.candidateId,
                                password: candidate.password
                            };
                            await sendExamStartEmail(candidate.email, examDetails, candidateDetails);
                            sent++;
                            console.log(`✅ Sent to ${candidate.email}`);
                        } catch (error) {
                            console.error(`❌ Failed to send start email to ${candidate.email}:`, error.message);
                        }
                    }
                }

                exam.examStartEmailSent = true;
                await exam.save();
                
                console.log(`✅ Sent ${sent} exam start emails for: ${exam.title}`);
            }
        } catch (error) {
            console.error('Email scheduler error:', error);
        } finally {
            isRunning = false;
        }
    }, 60000);

    console.log('📧 Email scheduler started - checking every minute');
};
