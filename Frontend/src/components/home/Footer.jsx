// components/Footer.jsx
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-400 text-center py-6 px-4 border-t border-gray-800">
        <p className="text-sm">
            Made with ❤️ by <span className="text-white font-semibold">Aditya Dev</span>
        </p>
        {/* Optional: Social links or GitHub link */}
        <div className="mt-2">
            <a href="https://github.com/adityadev000/syncode" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            GitHub Repo
            </a>
        </div>
        </footer>
    );
};

export default Footer;
