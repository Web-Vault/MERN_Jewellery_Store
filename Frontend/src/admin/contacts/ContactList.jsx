// Path: frontend/src/admin/pages/contacts/ContactList.jsx
import { useState } from 'react';
import { FiMail, FiTrash2, FiCornerUpLeft, FiCheck } from 'react-icons/fi';
// import { sendReplyEmail } from '../../../services/emailService'; // You'll need to implement this

export default function ContactList() {
  // Mock data - replace with API calls
  const [messages, setMessages] = useState([
    {
      id: 'msg_101',
      name: 'Emma Johnson',
      email: 'emma@example.com',
      message: 'Do you have this ring in silver instead of gold?',
      date: '2023-06-15T14:30:00Z',
      replied: false
    },
    {
      id: 'msg_102',
      name: 'James Smith',
      email: 'james@example.com',
      message: 'How long does shipping take to Canada?',
      date: '2023-06-14T09:15:00Z',
      replied: true
    }
  ]);

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleReply = async (messageId) => {
    setIsSending(true);
    try {
      // Replace with actual API call to send email
//       await sendReplyEmail({
//         to: messages.find(m => m.id === messageId).email,
//         subject: 'Re: Your inquiry to JewelStore',
//         content: replyContent
//       });
      
      // Update message status
      setMessages(messages.map(msg => 
        msg.id === messageId ? { ...msg, replied: true } : msg
      ));
      
      setReplyingTo(null);
      setReplyContent('');
    } catch (error) {
      console.error('Failed to send reply:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleDelete = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== messageId));
    }
  };

  return (
    <div className="p-6 bg-rose-25 ml-64">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-rose-800">Contact Messages</h1>
        <p className="text-amber-900/80">Customer inquiries and responses</p>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="bg-white rounded-xl shadow-sm border border-rose-100 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-rose-800">{message.name}</h3>
                  <p className="text-amber-900">{message.email}</p>
                  <p className="text-xs text-amber-900/60 mt-1">
                    {new Date(message.date).toLocaleString()}
                  </p>
                </div>
                {message.replied ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FiCheck className="mr-1" /> Replied
                  </span>
                ) : null}
              </div>
              
              <div className="mb-4 p-4 bg-rose-50 rounded-lg border border-rose-100">
                <p className="text-amber-900 whitespace-pre-line">{message.message}</p>
              </div>

              <div className="flex justify-end gap-3">
                {!message.replied && (
                  <button
                    onClick={() => setReplyingTo(replyingTo === message.id ? null : message.id)}
                    className="flex items-center gap-2 text-amber-600 hover:text-amber-800"
                  >
                    <FiCornerUpLeft /> Reply
                  </button>
                )}
                <button
                  onClick={() => handleDelete(message.id)}
                  className="flex items-center gap-2 text-rose-600 hover:text-rose-800"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>

              {/* Reply Form (conditionally shown) */}
              {replyingTo === message.id && (
                <div className="mt-6 pt-4 border-t border-rose-100">
                  <label className="block text-amber-900 text-sm font-medium mb-2">
                    Reply to {message.name}
                  </label>
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-300 focus:border-transparent mb-3"
                    placeholder="Type your response here..."
                  />
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setReplyingTo(null)}
                      className="px-4 py-2 border border-rose-200 text-amber-900 rounded-lg hover:bg-rose-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReply(message.id)}
                      className="px-4 py-2 bg-rose-700 text-white rounded-lg hover:bg-rose-800 flex items-center gap-2"
                      disabled={!replyContent.trim() || isSending}
                    >
                      {isSending ? 'Sending...' : (
                        <>
                          <FiMail /> Send Reply
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}