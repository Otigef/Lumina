# Lumina Academy (SkillStack)

Lumina Academy is a world-class interactive learning platform designed to take absolute beginners from zero to professional web developers. It combines hands-on coding practice, real-time AI mentorship, and immersive visual guides to create a "crafted" learning experience.

## 🚀 Features

### 1. Interactive Learning Path
*   **Structured Roadmap:** A comprehensive curriculum covering HTML Fundamentals, CSS Styling, Modern Layouts (Flexbox/Grid), and JavaScript.
*   **Hands-on Editor:** A full-featured code editor (Ace Editor) with autocompletion, snippets, and live preview.
*   **Interactive Demos:** Built-in tools like the **Specificity Calculator** and **Grid Areas Demo** to visualize complex concepts.

### 2. AI-Powered Mentorship
*   **Lumina AI Mentor:** Powered by Google Gemini, the mentor provides real-time feedback on your code and answers any technical questions.
*   **Challenge Verification:** Every lesson includes a coding challenge. Click "VERIFY" to have the AI analyze your solution and provide constructive feedback.
*   **AI Video Guides:** For complex topics, the platform uses Google Veo to generate custom visual explanations on demand.

### 3. Progress & Achievements
*   **Real-time Tracking:** Your progress is saved automatically as you complete lessons and modules.
*   **XP System:** Earn experience points for every challenge you master.
*   **Certificate of Completion:** Upon finishing the entire curriculum, users are awarded a verified, printable certificate of achievement.

### 4. Immersive UX
*   **Focus Mode:** A distraction-free environment for deep coding sessions.
*   **Live Activity Feed:** See what other students are achieving in real-time.
*   **Responsive Design:** A beautiful, modern interface built with Tailwind CSS and smooth animations via Motion.

## 🛠️ Tech Stack

*   **Frontend:** React 18, TypeScript, Vite
*   **Styling:** Tailwind CSS
*   **Animations:** Motion (motion/react)
*   **Icons:** Lucide React
*   **Editor:** React Ace (Ace Editor)
*   **AI Integration:** @google/genai (Gemini 3.1 Pro & Flash, Veo 3.1)
*   **Content:** React Markdown with custom components

## 🚦 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation
1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up your environment variables (see `.env.example`).
4. Start the development server:
    ```bash
    npm run dev
    ```

## 📝 Environment Variables

The following environment variables are required for full functionality:

*   `GEMINI_API_KEY`: Your Google Gemini API key for the mentor and verification.
*   `API_KEY`: A paid Google Cloud API key for Veo video generation (handled via the platform's key selection dialog).

## 📄 License

This project is licensed under the MIT License.
