import React, { useState, useRef, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface WhatsAppButtonProps {
  message?: string;
}

interface ContactOption {
  country: string;
  phoneNumber: string;
  label: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = "Hello! I have a question about your books.",
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  
  // Contact options
  const contactOptions: ContactOption[] = [
    {
      country: "Spain",
      phoneNumber: "34632694983", // Formatted without spaces for WhatsApp API
      label: "Spain (+34 632 69 49 83)"
    },
    {
      country: "Italy",
      phoneNumber: "393509740945", // Formatted without spaces for WhatsApp API
      label: "Italy (+39 350 974 0945)"
    }
  ];

  // Handle clicking outside to close the options
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOptions]);

  // Handle contacting via WhatsApp
  const handleContact = (phoneNumber: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setShowOptions(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={optionsRef}>
      {/* Options dropdown */}
      {showOptions && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl w-64 overflow-hidden mb-2 transform transition-all duration-300 scale-100">
          <div className="p-2 bg-green-500 text-white font-medium">
            Choose a contact:
          </div>
          {contactOptions.map((option) => (
            <button
              key={option.country}
              onClick={() => handleContact(option.phoneNumber)}
              className="w-full text-left px-4 py-3 hover:bg-gray-100 flex items-center border-b border-gray-100 last:border-0"
            >
              <FaWhatsapp className="text-green-500 mr-3" />
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main WhatsApp button */}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center justify-center bg-green-500 text-white w-14 h-14 rounded-full shadow-xl hover:bg-green-600 transition-transform duration-300 hover:scale-110 group"
        aria-label="Contact on WhatsApp"
        aria-expanded={showOptions}
      >
        <FaWhatsapp className="text-2xl" />
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Chat with us
        </span>
      </button>
    </div>
  );
};

export default WhatsAppButton;