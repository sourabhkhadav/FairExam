import Candidate from '../models/Candidate.js';
import xlsx from 'xlsx';
import multer from 'multer';

// Configure multer for memory storage
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// @desc    Test endpoint
// @route   GET /api/candidates/test
// @access  Public
export const testEndpoint = async (req, res) => {
    res.json({ success: true, message: 'Candidate API is working!' });
};

// @desc    Upload candidates from Excel file
// @route   POST /api/candidates/upload
// @access  Private (Examiner only)
export const uploadExcelFile = async (req, res) => {
    try {
        console.log('=== Upload Request Received ===');
        console.log('File:', req.file ? req.file.originalname : 'No file');
        console.log('Body:', req.body);

        if (!req.file) {
            console.log('ERROR: No file uploaded');
            return res.status(400).json({
                success: false,
                message: 'Please upload an Excel file'
            });
        }

        const { examId } = req.body;
        if (!examId) {
            console.log('ERROR: No examId provided');
            return res.status(400).json({
                success: false,
                message: 'Please provide examId'
            });
        }

        console.log('Reading Excel file...');
        const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        console.log('Sheet name:', sheetName);
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        console.log('Raw Excel data:', JSON.stringify(data, null, 2));
        console.log('Number of rows:', data.length);

        if (data.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Excel file is empty or has no data rows'
            });
        }

        const candidates = data.map((row, index) => {
            console.log(`Row ${index + 1}:`, row);

            // Generate unique candidate ID and password
            const candidateId = `CAND${examId.slice(-4)}${String(index + 1).padStart(4, '0')}`;
            const password = Math.random().toString(36).slice(-8).toUpperCase();

            const candidate = {
                name: row.name || row.Name || row.NAME,
                mobileNumber: String(row.mobileNumber || row.MobileNumber || row.mobile || row.Mobile || row.MOBILE || row['Mobile Number'] || row['mobile number'] || ''),
                candidateId,
                password,
                examId
            };

            // Only add email if it exists
            const email = row.email || row.Email || row.EMAIL || row.gmail || row.Gmail;
            if (email) {
                candidate.email = email;
            }

            return candidate;
        });

        console.log('Formatted candidates:', JSON.stringify(candidates, null, 2));

        if (candidates.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid candidates to insert'
            });
        }

        try {
            const result = await Candidate.insertMany(candidates, { ordered: false });
            console.log('✅ Saved to DB:', result.length, 'candidates');

            res.status(201).json({
                success: true,
                count: result.length,
                message: `Successfully uploaded ${result.length} candidates`,
                data: result
            });
        } catch (insertError) {
            console.error('❌ Insert error:', insertError);

            // Check if it's a validation error
            if (insertError.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed: ' + insertError.message,
                    errors: insertError.errors
                });
            }

            // If some documents were inserted despite errors
            if (insertError.insertedDocs && insertError.insertedDocs.length > 0) {
                return res.status(201).json({
                    success: true,
                    count: insertError.insertedDocs.length,
                    message: `Partially uploaded ${insertError.insertedDocs.length} candidates`,
                    data: insertError.insertedDocs
                });
            }

            throw insertError;
        }
    } catch (error) {
        console.error('❌ Upload error:', error);
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Some candidates already exist for this exam'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Upload candidates in bulk
// @route   POST /api/candidates/bulk
// @access  Private (Examiner only)
export const bulkUploadCandidates = async (req, res) => {
    try {
        const { examId, candidates } = req.body;

        if (!examId || !candidates || !Array.isArray(candidates)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide examId and candidates array'
            });
        }

        const candidateData = candidates.map((candidate, index) => {
            const candidateId = `CAND${examId.slice(-4)}${String(index + 1).padStart(4, '0')}`;
            const password = Math.random().toString(36).slice(-8).toUpperCase();
            return {
                ...candidate,
                candidateId,
                password,
                examId
            };
        });

        const result = await Candidate.insertMany(candidateData, { ordered: false });

        res.status(201).json({
            success: true,
            count: result.length,
            data: result
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Some candidates already exist for this exam'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all candidates for an exam
// @route   GET /api/candidates/:examId
// @access  Private
export const getCandidatesByExam = async (req, res) => {
    try {
        const candidates = await Candidate.find({ examId: req.params.examId });

        res.status(200).json({
            success: true,
            count: candidates.length,
            data: candidates
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Add candidate manually
// @route   POST /api/candidates/manual
// @access  Private (Examiner only)
export const addManualCandidate = async (req, res) => {
    try {
        const { name, email, phone, candidateId, examId, password: customPassword } = req.body;

        if (!name || !email || !examId) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and examId are required'
            });
        }

        const generatedId = candidateId || `CAND${examId.slice(-4)}${Date.now().toString().slice(-4)}`;
        const password = customPassword || Math.random().toString(36).slice(-8).toUpperCase();

        const candidate = await Candidate.create({
            name,
            email,
            mobileNumber: phone || '',
            candidateId: generatedId,
            password,
            examId
        });

        res.status(201).json({
            success: true,
            data: candidate
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Candidate with this email or ID already exists for this exam'
            });
        }
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// @desc    Update candidate
// @route   PUT /api/candidates/:id
// @access  Private (Examiner only)
export const updateCandidate = async (req, res) => {
    try {
        const { name, email, mobileNumber } = req.body;
        const candidate = await Candidate.findByIdAndUpdate(
            req.params.id,
            { name, email, mobileNumber },
            { new: true, runValidators: true }
        );

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        res.status(200).json({
            success: true,
            data: candidate
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete candidate
// @route   DELETE /api/candidates/:id
// @access  Private (Examiner only)
export const deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params.id);

        if (!candidate) {
            return res.status(404).json({
                success: false,
                message: 'Candidate not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Candidate deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
