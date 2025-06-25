import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import userModel from '../models/UserModel.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer') 
    ? req.headers.authorization.split(' ')[1] 
    : null;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Not authorized, user not found' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized, invalid token' });
  }
});


// import jwt from 'jsonwebtoken';
// import asyncHandler from 'express-async-handler';
// import UserModel from '../models/UserModel.js';

// export const authMiddleware = asyncHandler(async (req, res, next) => {
//   const token = req.headers.authorization?.startsWith('Bearer')
//     ? req.headers.authorization.split(' ')[1]
//     : null;

//   if (!token) {
//     return res.status(401).json({ message: 'Not authorized, no token' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded JWT in authMiddleware:', decoded); // Debug payload
//     if (!decoded.userId || !mongoose.isValidObjectId(decoded.userId)) {
//       console.error('Invalid userId in token:', decoded.userId);
//       return res.status(400).json({ message: 'Invalid user ID' });
//     }

//     const user = await UserModel.findById(decoded.userId).select('-password');
//     if (!user) {
//       return res.status(401).json({ message: 'Not authorized, user not found' });
//     }

//     req.user = { id: decoded.userId, userId: decoded.userId, email: decoded.email, role: decoded.role };
//     next();
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     return res.status(401).json({ message: 'Not authorized, invalid token' });
//   }
// });