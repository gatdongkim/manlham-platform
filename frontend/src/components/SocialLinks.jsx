import React from "react";
// We keep FontAwesome for specific brand icons not in Lucide
import { 
  FaWhatsapp, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn 
} from "react-icons/fa";
import { Twitter } from "lucide-react";

export default function SocialLinks({ variant = "default" }) {
  const socials = [
    { 
      name: "WhatsApp", 
      icon: <FaWhatsapp size={20} />, 
      href: "https://wa.me/211929267673", 
      color: "hover:bg-[#25D366] hover:text-white text-[#25D366]",
      bg: "bg-green-50"
    },
    { 
      name: "Facebook", 
      icon: <FaFacebookF size={18} />, 
      href: "https://facebook.com/mtsupport1", 
      color: "hover:bg-[#1877F2] hover:text-white text-[#1877F2]",
      bg: "bg-blue-50"
    },
    { 
      name: "Twitter", 
      icon: <Twitter size={18} />, 
      href: "https://x.com/ManlhamSupport", 
      color: "hover:bg-black hover:text-white text-black",
      bg: "bg-gray-100"
    },
    { 
      name: "Instagram", 
      icon: <FaInstagram size={20} />, 
      href: "https://instagram.com/manlhamtechsupport", 
      color: "hover:bg-[#E4405F] hover:text-white text-[#E4405F]",
      bg: "bg-pink-50"
    },
    { 
      name: "LinkedIn", 
      icon: <FaLinkedinIn size={18} />, 
      href: "https://linkedin.com/company/manlhamtechsupport", 
      color: "hover:bg-[#0A66C2] hover:text-white text-[#0A66C2]",
      bg: "bg-indigo-50"
    },
  ];

  return (
    <div className={`flex flex-wrap gap-3 ${variant === 'center' ? 'justify-center' : 'justify-start'} mt-4`}>
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          title={social.name}
          className={`
            w-10 h-10 flex items-center justify-center rounded-xl 
            transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
            ${social.bg} ${social.color}
          `}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}