import mongoose from 'mongoose';
import TestResultModel from '../models/TestResultModel.js';
import UserModel from '../models/UserModel.js';
import TestModel from '../models/TestModel.js';
import QuestionModel from '../models/QuestionModel.js';

// Submit a new test result (Authenticated users)
const submitTestResult = async (req, res) => {
    try {
        const { testId, score, answers, completedAt } = req.body;
        const userId = req.user.id; // From authMiddleware

        // Validate required fields
        if (!testId || score === undefined || !answers || !completedAt) {
            return res.status(400).json({ message: 'testId, score, answers, and completedAt are required' });
        }

        // Validate IDs
        if (!mongoose.isValidObjectId(testId)) {
            return res.status(400).json({ message: 'Invalid test ID' });
        }
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Verify test exists
        const test = await TestModel.findById(testId);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }

        // Verify user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate completedAt
        const completedDate = new Date(completedAt);
        if (isNaN(completedDate.getTime())) {
            return res.status(400).json({ message: 'completedAt must be a valid date' });
        }

        // Validate score
        if (typeof score !== 'number' || score < 0) {
            return res.status(400).json({ message: 'Score must be a non-negative number' });
        }

        // Validate answers
        if (!Array.isArray(answers)) {
            return res.status(400).json({ message: 'Answers must be an array' });
        }
        for (const answer of answers) {
            if (!mongoose.isValidObjectId(answer.questionId)) {
                return res.status(400).json({ message: `Invalid question ID: ${answer.questionId}` });
            }
            if (typeof answer.selectedAnswer !== 'string') {
                return res.status(400).json({ message: 'selectedAnswer must be a string' });
            }
            // Verify question exists and belongs to the test
            const question = await QuestionModel.findById(answer.questionId);
            if (!question || question.testId.toString() !== testId) {
                return res.status(400).json({ message: `Question ${answer.questionId} not found or does not belong to test` });
            }
        }

        // Create test result
        const testResult = new TestResultModel({
            userId,
            testId,
            score,
            answers,
            completedAt: completedDate
        });

        await testResult.save();

        // Update user and test
        await UserModel.findByIdAndUpdate(userId, { $push: { tests: testResult._id } });
        await TestModel.findByIdAndUpdate(testId, { $push: { results: testResult._id } });

        res.status(201).json({
            message: 'Test result submitted successfully',
            testResult
        });
    } catch (error) {
        console.error('Error submitting test result:', error);
        res.status(500).json({ message: 'Server error while submitting test result', error: error.message });
    }
};

// Get user's own test results (Authenticated users)
const getResult = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const results = await TestResultModel
            .find({ userId })
            .populate('userId', 'name email')
            .populate('testId', 'title testType examType')
            .populate('answers.questionId', 'text options correctAnswer');

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No test results found for this user' });
        }

        res.status(200).json({
            message: 'Test results retrieved successfully',
            count: results.length,
            results
        });
    } catch (error) {
        console.error('Error fetching user test results:', error);
        res.status(500).json({ message: 'Server error while fetching test results', error: error.message });
    }
};

// Get a specific test result by ID (Admin only)
const getSpecificResult = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }

        const resultId = req.params.id;
        if (!mongoose.isValidObjectId(resultId)) {
            return res.status(400).json({ message: 'Invalid result ID' });
        }

        const result = await TestResultModel
            .findById(resultId)
            .populate('userId', 'name email')
            .populate('testId', 'title testType examType')
            .populate('answers.questionId', 'text options correctAnswer');

        if (!result) {
            return res.status(404).json({ message: 'Test result not found' });
        }

        res.status(200).json({
            message: 'Test result retrieved successfully',
            result
        });
    } catch (error) {
        console.error('Error fetching specific test result:', error);
        res.status(500).json({ message: 'Server error while fetching test result', error: error.message });
    }
};

// Get all test results (Admin only)
const getAllResult = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }

        const results = await TestResultModel
            .find()
            .populate('userId', 'name email')
            .populate('testId', 'title testType examType')
            .populate('answers.questionId', 'text options correctAnswer');

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No test results found' });
        }

        res.status(200).json({
            message: 'All test results retrieved successfully',
            count: results.length,
            results
        });
    } catch (error) {
        console.error('Error fetching all test results:', error);
        res.status(500).json({ message: 'Server error while fetching all test results', error: error.message });
    }
};

// Get all test results for a specific user (Admin only)
const getResultForAUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }

        const userId = req.params.userId;
        if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        // Verify user exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const results = await TestResultModel
            .find({ userId })
            .populate('userId', 'name email')
            .populate('testId', 'title testType examType')
            .populate('answers.questionId', 'text options correctAnswer');

        if (!results || results.length === 0) {
            return res.status(404).json({ message: 'No test results found for this user' });
        }

        res.status(200).json({
            message: 'Test results for user retrieved successfully',
            count: results.length,
            results
        });
    } catch (error) {
        console.error('Error fetching test results for user:', error);
        res.status(500).json({ message: 'Server error while fetching test results', error: error.message });
    }
};

// Delete a test result (Admin only)
const deleteTestResult = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required' });
        }

        const resultId = req.params.id;
        if (!mongoose.isValidObjectId(resultId)) {
            return res.status(400).json({ message: 'Invalid result ID' });
        }

        const result = await TestResultModel.findById(resultId);
        if (!result) {
            return res.status(404).json({ message: 'Test result not found' });
        }

        // Remove result from user and test
        await UserModel.findByIdAndUpdate(result.userId, { $pull: { tests: result._id } });
        await TestModel.findByIdAndUpdate(result.testId, { $pull: { results: result._id } });

        await TestResultModel.findByIdAndDelete(resultId);

        res.status(200).json({ message: 'Test result deleted successfully' });
    } catch (error) {
        console.error('Error deleting test result:', error);
        res.status(500).json({ message: 'Server error while deleting test result', error: error.message });
    }
};

export { submitTestResult, getResult, getSpecificResult, getAllResult, getResultForAUser, deleteTestResult };