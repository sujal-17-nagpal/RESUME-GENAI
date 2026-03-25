const resume = {
  name: "Sujal Nagpal",
  role: "Software Developer",
  skills: [
    "Java",
    "Data Structures & Algorithms",
    "React",
    "Node.js",
    "MongoDB",
    "Express.js",
    "WebSockets",
    "Tailwind CSS",
  ],
  projects: [
    {
      title: "Real-time Chat Application",
      description:
        "Built a chat app supporting text and image sharing with real-time communication using WebSockets. Implemented block/unblock functionality and abuse masking using Trie.",
      techStack: ["React", "Node.js", "MongoDB", "Socket.io", "Cloudinary"],
    },
    {
      title: "Grocery Delivery Website",
      description:
        "Developed a full-stack grocery delivery platform with authentication, dashboard, and product management.",
      techStack: ["React", "Node.js", "Express", "MongoDB"],
    },
  ],
  achievements: [
    "Solved 2500+ DSA problems",
    "LeetCode rating: 2074",
    "Codeforces Specialist",
    "3⭐ CodeChef",
  ],
};

const selfDescription =
  "I am a passionate software developer with strong problem-solving skills and experience in building full-stack applications. I enjoy working on scalable systems and continuously improving my DSA and development skills.";

const jobDescription =
  "Looking for a Software Developer role where I can contribute to backend and frontend development, work on scalable systems, and grow as an engineer.";

module.exports = {
  resume,
  selfDescription,
  jobDescription,
};
