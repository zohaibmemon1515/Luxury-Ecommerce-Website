"use client";
import { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Please fill in all fields.");
      return;
    }

    setFormStatus("Submitting...");

    try {
      setTimeout(() => {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      }, 1500);
    } catch (error) {
      setFormStatus("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-black to-gray-900">
      <div className="container mx-auto max-w-5xl px-6 lg:px-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-yellow-500 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-300">
            We&apos;re here to assist you. Drop us a message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-gray-800 p-12 rounded-lg shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-semibold text-yellow-500 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-5 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-gray-400"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-semibold text-yellow-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-5 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-gray-400"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="block text-lg font-semibold text-yellow-500 mb-2">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-5 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder:text-gray-400"
                placeholder="Write your message"
                rows={5}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-yellow-500 text-black py-3 px-8 rounded-full text-lg font-medium shadow-lg hover:bg-yellow-600 transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Send Message
              </button>
            </div>

            {formStatus && (
              <div
                className={`mt-4 text-center text-lg font-medium ${
                  formStatus.includes("successfully") ? "text-green-500" : "text-red-500"
                }`}
              >
                {formStatus}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
