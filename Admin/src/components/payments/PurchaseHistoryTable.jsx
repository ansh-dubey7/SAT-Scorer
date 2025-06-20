import React, { useState, useEffect } from 'react';

const PurchaseHistoryTable = ({ transactions }) => {
  const mockTransactions = [
    {
      id: 'TXN123456',
      customer: 'user@example.com',
      course: 'GRE Prep',
      date: '2025-05-27',
      amount: '₹7,499',
      paymentMethod: 'Stripe',
      status: 'Completed',
      countryWithCity: 'India, Mumbai',
      invoiceDetails: {
        invoiceNumber: 'INV-001',
        coursePrice: '₹6,150',
        tax: '₹1,349',
        total: '₹7,499',
        purchaseDate: '2025-05-27',
        studentName: 'User Example',
      },
    },
    {
      id: 'TXN123457',
      customer: 'john.doe@example.com',
      course: 'SAT Math',
      date: '2025-05-26',
      amount: '₹5,999',
      paymentMethod: 'PayPal',
      status: 'Pending',
      countryWithCity: 'USA, New York',
      invoiceDetails: {
        invoiceNumber: 'INV-002',
        coursePrice: '₹4,919',
        tax: '₹1,080',
        total: '₹5,999',
        purchaseDate: '2025-05-26',
        studentName: 'John Doe',
      },
    },
    {
      id: 'TXN123458',
      customer: 'jane.smith@example.com',
      course: 'GMAT Verbal',
      date: '2025-05-25',
      amount: '₹9,000',
      paymentMethod: 'UPI',
      status: 'Completed',
      countryWithCity: 'India, Delhi',
      invoiceDetails: {
        invoiceNumber: 'INV-003',
        coursePrice: '₹7,380',
        tax: '₹1,620',
        total: '₹9,000',
        purchaseDate: '2025-05-25',
        studentName: 'Jane Smith',
      },
    },
  ];

  const transactionData = transactions || mockTransactions;

  const [currentPage, setCurrentPage] = useState(1);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowReceiptDialog(false);
        setSelectedTransaction(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleReceipt = (txn) => {
    if (txn && txn.invoiceDetails) {
      setSelectedTransaction(txn);
      setShowReceiptDialog(true);
    } else {
      console.error('Invalid transaction or missing invoiceDetails:', txn);
    }
  };

  const closeDialog = () => {
    setShowReceiptDialog(false);
    setSelectedTransaction(null);
  };

  const handlePrintReceipt = (invoiceNumber) => {
    alert(`Printing receipt ${invoiceNumber}`);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentTransactions = transactionData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(transactionData.length / rowsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Purchase History</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Transaction ID</th>
            <th className="border border-gray-300 p-3 text-left">Customer</th>
            <th className="border border-gray-300 p-3 text-left">Course</th>
            <th className="border border-gray-300 p-3 text-left">Date</th>
            <th className="border border-gray-300 p-3 text-left">Amount</th>
            <th className="border border-gray-300 p-3 text-left">Payment Method</th>
            <th className="border border-gray-300 p-3 text-left">Status</th>
            <th className="border border-gray-300 p-3 text-left">Country with City</th>
            <th className="border border-gray-300 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((txn) => (
            <tr key={txn.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-3">{txn.id}</td>
              <td className="border border-gray-300 p-3">{txn.customer}</td>
              <td className="border border-gray-300 p-3">{txn.course}</td>
              <td className="border border-gray-300 p-3">{txn.date}</td>
              <td className="border border-gray-300 p-3">{txn.amount}</td>
              <td className="border border-gray-300 p-3">{txn.paymentMethod}</td>
              <td className={`border border-gray-300 p-3 ${txn.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                {txn.status}
              </td>
              <td className="border border-gray-300 p-3">{txn.countryWithCity}</td>
              <td className="border border-gray-300 p-3">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleReceipt(txn)}
                  disabled={!txn.invoiceDetails}
                >
                  View Receipt
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {showReceiptDialog && selectedTransaction && selectedTransaction.invoiceDetails && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeDialog}
        >
          <div
            className="bg-white border-2 border-gray-300 p-6 rounded-md shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-gray-300 pb-4 mb-4">
              <h2 className="text-2xl font-semibold text-center text-gray-800">Purchase Receipt</h2>
              <p className="text-sm text-center text-gray-500">
                Invoice #{selectedTransaction.invoiceDetails.invoiceNumber}
              </p>
            </div>
            <div className="space-y-2 text-sm text-gray-700">
              <div className="border-b pb-2 flex justify-between">
                <span className="font-medium">Student Name:</span>
                <span>{selectedTransaction.invoiceDetails.studentName}</span>
              </div>
              <div className="border-b pb-2 flex justify-between">
                <span className="font-medium">Course:</span>
                <span>{selectedTransaction.course}</span>
              </div>
              <div className="border-b pb-2 flex justify-between">
                <span className="font-medium">Purchase Date:</span>
                <span>{selectedTransaction.invoiceDetails.purchaseDate}</span>
              </div>
              <div className="border-b pb-2 flex justify-between">
                <span className="font-medium">Course Price:</span>
                <span>{selectedTransaction.invoiceDetails.coursePrice}</span>
              </div>
              <div className="border-b pb-2 flex justify-between">
                <span className="font-medium">Tax (18%):</span>
                <span>{selectedTransaction.invoiceDetails.tax}</span>
              </div>
              <div className="border-t-2 border-gray-400 pt-2 flex justify-between text-base font-semibold">
                <span>Total Amount:</span>
                <span>{selectedTransaction.invoiceDetails.total}</span>
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-3">
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                onClick={() => handlePrintReceipt(selectedTransaction.invoiceDetails.invoiceNumber)}
              >
                Print
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={closeDialog}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistoryTable;