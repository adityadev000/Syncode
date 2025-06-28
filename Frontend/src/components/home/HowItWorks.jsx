// components/HowItWorks.jsx
import React from "react";

const HowItWorks = () => {
    const steps = [
        {
        title: "1. Create or Import a Project",
        description: "Start from scratch or import an existing project folder directly from your system.",
        },
        {
        title: "2. Invite Teammates via Room ID",
        description: "Generate a temporary room link and allow others to join your project in real time.",
        },
        {
        title: "3. Collaborate and Edit Live",
        description: "Work together on files, folders, and resolve merge conflicts—all in sync.",
        },
    ];

    return (
        <section id="howItWorks" className="bg-gray-900 text-white py-16 px-4 md:px-8 pt-20">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">How It Works</h2>

            <div className="grid gap-8 md:grid-cols-3 text-left">
            {steps.map((step, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default HowItWorks;
