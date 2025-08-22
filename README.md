# AI Job Predictor 🚀

A modern, AI-powered job prediction platform built with React, featuring advanced UI/UX, state management, and responsive design.

## ✨ Features

### 🎯 Core Functionality
- **AI-Powered Job Predictions**: Advanced algorithms to predict perfect career matches
- **Role-Based Access**: Separate experiences for Students and HR Professionals
- **Smart Matching**: Skill-based job recommendations with match scores
- **Career Analytics**: Comprehensive insights and progress tracking

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Smooth Animations**: Framer Motion powered interactions
- **Modern Components**: Built with Tailwind CSS and Lucide icons

### 🔧 Technical Features
- **State Management**: Zustand for efficient state handling
- **Form Validation**: React Hook Form with comprehensive validation
- **Routing**: React Router with protected routes
- **Persistence**: Local storage for user preferences and data
- **Toast Notifications**: User feedback with react-hot-toast

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-job-predictor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### For Students
1. Visit the homepage
2. Select "Student" role
3. Create an account or sign in
4. Get personalized job predictions based on your skills
5. View detailed match scores and recommendations

### For HR Professionals
1. Visit the homepage
2. Select "HR Professional" role
3. Access hiring optimization tools
4. Analyze candidate matches
5. Streamline recruitment processes

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── header.jsx      # Navigation header
│   ├── auth-form.jsx   # Authentication forms
│   └── popup.jsx       # Modal components
├── pages/              # Page components
│   ├── home.jsx        # Landing page
│   ├── dashboard.jsx   # Main dashboard
│   └── settings.jsx    # User settings
├── store/              # State management
│   └── useStore.js     # Zustand store
├── utils/              # Utility functions
│   └── cn.js          # Class name utilities
├── app.jsx             # Main app component
├── main.jsx            # App entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository
2. Configure build settings
3. Deploy automatically on push

### Deploy to Netlify
1. Drag and drop the `dist` folder
2. Configure redirects for SPA routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using modern web technologies**
