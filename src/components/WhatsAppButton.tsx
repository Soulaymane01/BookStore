import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "Hello! I have a question about your books.",
}) => {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-green-500 text-white w-14 h-14 rounded-full shadow-xl hover:bg-green-600 transition-transform duration-300 hover:scale-110 group"
      aria-label="Contact on WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Chat with us
      </span>
    </button>
  );
};

export default WhatsAppButton;
