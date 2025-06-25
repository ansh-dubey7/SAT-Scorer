// import { load } from '@cashfreepayments/cashfree-js';
// import axios from 'axios';

// let cashfree;

// const initializePaymentGateway = async () => {
//   if (!cashfree) {
//     cashfree = await load({
//       mode: 'sandbox'
//     });
//   }
//   return cashfree;
// };

// const createPaymentOrder = async (courseId, userId, order_amount) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/payment/initiate', {
//       courseId,
//       userId,
//       amount: order_amount // Match the backend expectation
//     });
//     return {
//       payment_session_id: response.data.paymentSessionId,
//       order_id: response.data.orderId
//     };
//   } catch (error) {
//     console.error('Error creating payment order:', error);
//     throw error;
//   }
// };

// const verifyAndEnroll = async (orderId, courseId, userId) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/payment/update-status', {
//       courseId,
//       userId
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error verifying payment and enrolling:', error);
//     throw error;
//   }
// };

// const handlePayment = async (courseId, userId, order_amount) => {
//   await initializePaymentGateway();
//   const { payment_session_id, order_id } = await createPaymentOrder(courseId, userId, order_amount);

//   if (!payment_session_id) {
//     throw new Error('Failed to get payment session ID');
//   }

//   const checkoutOptions = {
//     paymentSessionId: payment_session_id,
//     redirectTarget: '_modal'
//   };

//   return new Promise((resolve, reject) => {
//     cashfree.checkout(checkoutOptions).then(async () => {
//       try {
//         // Optional verification; webhook primarily handles enrollment
//         const result = await verifyAndEnroll(order_id, courseId, userId);
//         resolve(result);
//       } catch (error) {
//         reject(error);
//       }
//     }).catch(reject);
//   });
// };

// export { handlePayment };

// import { load } from '@cashfreepayments/cashfree-js';
// import axios from 'axios';

// let cashfree;

// const initializePaymentGateway = async (retries = 3, delay = 1000) => {
//   if (cashfree) return cashfree;

//   for (let attempt = 1; attempt <= retries; attempt++) {
//     try {
//       const mode = 'sandbox';
//       if (!['sandbox', 'production'].includes(mode)) {
//         throw new Error('Invalid Cashfree environment mode');
//       }

//       cashfree = await load({ mode });
//       console.log('Cashfree SDK initialized successfully');
//       return cashfree;
//     } catch (error) {
//       console.error(`Attempt ${attempt} - Error initializing Cashfree SDK:`, error);
//       if (attempt === retries) {
//         throw new Error(`Failed to initialize payment gateway after ${retries} attempts: ${error.message}`);
//       }
//       await new Promise((resolve) => setTimeout(resolve, delay));
//     }
//   }
// };

// const createPaymentOrder = async (courseId, userId, order_amount) => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Authentication token not found');
//     }

//     // Validate order_amount
//     const amount = parseFloat(order_amount);
//     if (isNaN(amount) || amount <= 0) {
//       throw new Error('Valid order amount is required');
//     }

//     const response = await axios.post(
//       'http://localhost:5000/api/payment/initiate',
//       { courseId, userId, amount },
//       { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
//     );
//     return {
//       payment_session_id: response.data.payment_session_id,
//       order_id: response.data.order_id,
//     };
//   } catch (error) {
//     console.error('Error creating payment order:', error.response?.data || error);
//     throw new Error(error.response?.data?.message || error.message || 'Failed to create payment order');
//   }
// };

// const verifyAndEnroll = async (orderId, courseId, userId) => {
//   console.log(userId,courseId,orderId);

//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       throw new Error('Authentication token not found');
//     }

//     const response = await axios.post(
//       'http://localhost:5000/api/payment/verify',
//       { orderId, courseId, userId },
//       { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error verifying payment:', error.response?.data || error);
//     throw new Error(error.response?.data?.message || 'Failed to verify payment');
//   }
// };

// const handlePayment = async (courseId, userId, order_amount) => {
//   try {
//     await initializePaymentGateway();
//     const { payment_session_id, order_id } = await createPaymentOrder(courseId, userId, order_amount);

//     if (!payment_session_id || !order_id) {
//       throw new Error('Invalid payment session or order ID');
//     }

//     const checkoutOptions = {
//       paymentSessionId: payment_session_id,
//       redirectTarget: '_modal',
//     };

//     return new Promise((resolve, reject) => {
//       cashfree
//         .checkout(checkoutOptions)
//         .then(async () => {
//           try {
//             const result = await verifyAndEnroll(order_id, courseId, userId);
//             resolve(result);
//           } catch (error) {
//             reject(error);
//           }
//         })
//         .catch((error) => {
//           console.error('Checkout error:', error);
//           reject(new Error('Payment process interrupted'));
//         });
//     });
//   } catch (error) {
//     throw error;
//   }
// };

// export { handlePayment };

import { load } from '@cashfreepayments/cashfree-js';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

let cashfree;

const initializePaymentGateway = async (retries = 3, delay = 500) => {
  if (cashfree) return cashfree;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const mode = import.meta.env.VITE_CASHFREE_ENV || 'sandbox';
      if (!['sandbox', 'production'].includes(mode)) {
        throw new Error(`Invalid Cashfree environment mode: ${mode}`);
      }

      cashfree = await load({ mode });
      console.log('Cashfree SDK initialized successfully');
      return cashfree;
    } catch (error) {
      console.error(`Attempt ${attempt} - Error initializing Cashfree SDK:`, error);
      if (attempt === retries) {
        throw new Error(`Failed to initialize payment gateway after ${retries} attempts: ${error.message}`);
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

const createPaymentOrder = async (courseId, userId, order_amount) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    // Fallback to decode userId from token
    let finalUserId = userId;
    if (!userId) {
      try {
        const decoded = jwtDecode(token);
        finalUserId = decoded.userId;
        console.log('Decoded userId from token:', finalUserId);
      } catch (err) {
        console.error('Failed to decode userId from token:', err);
        throw new Error('User not authenticated');
      }
    }

    // Validate inputs
    if (!courseId || !finalUserId || !order_amount) {
      console.error('Invalid inputs for createPaymentOrder:', { courseId, userId: finalUserId, order_amount });
      throw new Error('Missing required payment parameters');
    }

    // Validate order_amount
    const amount = parseFloat(order_amount);
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Valid order amount is required');
    }

    console.log('Creating payment order:', { courseId, userId: finalUserId, amount });

    const response = await axios.post(
      'http://localhost:5000/api/payment/initiate',
      { courseId, userId: finalUserId, amount },
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );

    console.log('Payment order created:', {
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
    });

    return {
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
    };
  } catch (error) {
    console.error('Error creating payment order:', error.response?.data || error);
    throw new Error(error.response?.data?.message || error.message || 'Failed to create payment order');
  }
};

const verifyAndEnroll = async (orderId, courseId, userId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    // Fallback to decode userId
    let finalUserId = userId;
    if (!userId) {
      try {
        const decoded = jwtDecode(token);
        finalUserId = decoded.userId;
        console.log('Decoded userId from token for verification:', finalUserId);
      } catch (err) {
        console.error('Failed to decode userId from token:', err);
        throw new Error('User not authenticated');
      }
    }

    console.log('Verifying payment:', {
      orderId,
      courseId,
      userId: finalUserId,
      orderIdType: typeof orderId,
      courseIdType: typeof courseId,
      userIdType: typeof finalUserId,
    });

    const response = await axios.post(
      'http://localhost:5000/api/payment/verify',
      { orderId, courseId, userId: finalUserId },
      { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
    );

    console.log('Payment verified:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error.response?.data || error);
    throw new Error(error.response?.data?.message || 'Failed to verify payment');
  }
};

const handlePayment = async (courseId, userId, order_amount) => {
  try {
    await initializePaymentGateway();
    const { payment_session_id, order_id } = await createPaymentOrder(courseId, userId, order_amount);

    if (!payment_session_id || !order_id) {
      throw new Error('Invalid payment session or order ID');
    }

    console.log('Initiating Cashfree checkout:', { payment_session_id, order_id });

    const checkoutOptions = {
      paymentSessionId: payment_session_id,
      redirectTarget: '_modal',
    };

    return new Promise((resolve, reject) => {
      cashfree
        .checkout(checkoutOptions)
        .then(async () => {
          try {
            const result = await verifyAndEnroll(order_id, courseId, userId);
            resolve(result);
          } catch (error) {
            reject(error);
          }
        })
        .catch((error) => {
          console.error('Checkout error:', error);
          reject(new Error('Payment process interrupted'));
        });
    });
  } catch (error) {
    throw error;
  }
};

export { handlePayment };