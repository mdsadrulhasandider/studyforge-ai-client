# StudyForge AI - Client Web App 🎨

This is the frontend repository for **StudyForge AI**, an AI-powered student dashboard and collaborative workspace. It provides a premium, responsive glassmorphic UI, TanStack Query API caching, Firebase auth sync, Recharts visualization, and an interactive chatbot console.

---

## 🚀 Core Features & Pages

- **Home (8 Premium Sections)**: Hero stats chips, Features grids, Counter statistics, Steppers, Popular Plans lists, Testimonial quotes, FAQ accordions, and Newsletter forms.
- **Explore & Filters**: Client search inputs, Category select boxes, Difficulty levels, Sort selections, pagination, and skeleton loading screen overlays.
- **Syllabus Details**: Week task modules expanders, Recommended reference resources list, Review comments grids, and related item recommendations.
- **AI Study Planner**: Custom generator panel that queries Gemini via Express and auto-populates the editor forms.
- **AI Study Buddy Chat**: Conversational panels featuring simulated typing bubble anims and quick suggestion chips.
- **Dashboard Trackers**: Category count bar charts, Difficulty pie ratio charts, and weekly hours bar charts.
- **Sign-in & Register**: Full validation handlers, Google login sync, and pre-configured Demo login buttons.

---

## 🛠️ Technology Stack
- **React.js** (Vite + TypeScript)
- **Tailwind CSS** (Slate/Indigo custom color token scheme)
- **TanStack Query** (API query state managers)
- **Recharts** (Visual indicators and progress metrics)
- **Firebase Auth** (Client authentication provider)

---

## ⚙️ Environment Variables
Create a `.env` file in the root of the `frontend/` directory:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

---

## 📦 Installation & Execution

1. Clone or navigate to the repository directory.
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Start the Vite preview server:
   ```bash
   npm run dev
   ```
4. Build for production compilation:
   ```bash
   npm run build
   ```

---

## 🔐 Demo Credentials

Use the single-click **Demo Account** button on the Sign-in page, or input manually:
- **Email**: `demo@studyforge.ai`
- **Password**: `123456`
