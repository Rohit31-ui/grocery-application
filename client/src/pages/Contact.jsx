import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("message sent successfully...");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-2">
        
        {/* Form Section */}
        <div className="p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-green-600 mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="bg-[#E0F6FF] p-8 flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-4">Get in Touch</h2>

          <div>
            <h3 className="font-medium text-gray-800">📞 Call Us</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-800">📍 Location</h3>
            <p className="text-gray-600">123 Green Street, Mumbai, India</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-800">✉️ Email</h3>
            <p className="text-gray-600">support@greencart.com</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-800">🕒 Business Hours</h3>
            <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
            <p className="text-gray-600">Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}
