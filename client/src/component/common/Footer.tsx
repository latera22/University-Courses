import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="bg-black text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h2 className="font-bold text-lg mb-3">About Us</h2>
            <p className="text-sm text-gray-400">
              Ethiopia University Course is a free and open-source platform that
              helps students, teachers, and educators find and share courses
              from around the world.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-3">Courses</h2>
            <a
              href="#"
              className="block text-sm text-gray-400 hover:text-white"
            >
              Operating System
            </a>
            <a
              href="#"
              className="block text-sm text-gray-400 hover:text-white"
            >
              Advanced Network
            </a>
            <a
              href="#"
              className="block text-sm text-gray-400 hover:text-white"
            >
              Block Chain
            </a>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-3">Follow Us</h2>
            <a
              href="#"
              className="block text-sm text-gray-400 hover:text-white"
            >
              X (Twitter)
            </a>
            <a
              href="#"
              className="block text-sm text-gray-400 hover:text-white"
            >
              Instagram
            </a>
            <a
              href="#"
              className="block text-sm text-gray-400 hover:text-white"
            >
              GitHub
            </a>
            <a
              href="#"
              className="block text-sm text-gray-400 hover:text-white"
            >
              Facebook
            </a>
          </div>
          <div>
            <h2 className="font-bold text-lg mb-3">Contact Us</h2>
            <a
              href="mailto:123@example.com"
              className="block text-sm text-gray-400 hover:text-white"
            >
              Email: 123@example.com
            </a>
            <a
              href="tel:000-123-4567"
              className="block text-sm text-gray-400 hover:text-white"
            >
              Phone: 000-123-4567
            </a>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-500 text-sm">
          <h1>
            &copy; {new Date().getFullYear()} Ethiopia University Course, All
            Rights Reserved.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
