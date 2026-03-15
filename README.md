# CareerScope - Career Salary Intelligence Platform

A comprehensive, production-grade web application that provides data-driven salary insights, career exploration, and AI-powered salary predictions. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

### Core Functionality
- **Job Explorer**: Browse and filter thousands of job opportunities with advanced search
- **Salary Predictor**: AI-powered salary prediction based on skills, experience, and preferences
- **Market Dashboard**: Real-time salary trends, market insights, and analytics
- **Job Details**: Comprehensive job information with salary analysis and similar roles

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Data**: Live salary statistics and market trends
- **Advanced Filtering**: Multi-criteria job filtering and search
- **Data Visualization**: Interactive charts and graphs using Recharts
- **Smooth Animations**: Framer Motion for enhanced user experience
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🛠 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **CSV Parser** - Data import functionality

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Recharts** - Chart library
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
careerscope/
├── backend/
│   ├── server.js              # Express server setup
│   ├── .env                   # Environment variables
│   ├── package.json           # Backend dependencies
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── models/
│   │   └── Job.js            # Job data model
│   ├── routes/
│   │   ├── jobs.js           # Job-related routes
│   │   └── salary.js         # Salary-related routes
│   ├── controllers/
│   │   ├── jobController.js  # Job business logic
│   │   └── salaryController.js # Salary business logic
│   └── scripts/
│       └── importData.js     # CSV data import script
├── frontend/
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── public/               # Static assets
│   └── src/
│       ├── App.jsx           # Main app component
│       ├── main.jsx          # App entry point
│       ├── index.css         # Global styles
│       ├── api/
│       │   └── axios.js      # API client setup
│       ├── components/       # Reusable components
│       └── pages/            # Page components
└── Salary Dataset.csv        # Sample data file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd careerscope
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/careerscope_db
   PORT=5000
   NODE_ENV=development
   ```

   For MongoDB Atlas (cloud database):
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/careerscope_db
   PORT=5000
   NODE_ENV=development
   ```

5. **Import sample data**
   ```bash
   cd backend
   npm run import
   ```
   
   This script will:
   - Read the CSV file (or generate sample data if CSV is not readable)
   - Parse and transform the data
   - Import it into MongoDB
   - Display import statistics

6. **Start the development servers**
   
   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3001 (or the port shown in terminal)
   - Backend API: http://localhost:5001/api

## 📊 API Endpoints

### Jobs
- `GET /api/jobs` - Get jobs with filtering and pagination
- `GET /api/jobs/:id` - Get single job details
- `GET /api/jobs/categories` - Get job categories with counts
- `GET /api/jobs/titles` - Get job titles for autocomplete

### Salary
- `GET /api/salary/stats` - Get salary statistics
- `GET /api/salary/by-experience` - Get salary by experience level
- `GET /api/salary/by-category` - Get salary by job category
- `GET /api/salary/trends` - Get salary trends over years
- `POST /api/salary/predict` - Predict salary based on profile

## 🎨 Design System

### Colors
- **Primary**: Teal (#00D4C8) - Main brand color
- **Accent**: Amber (#F59E0B) - Highlight color
- **Background**: Deep Navy (#0A0F1E) - Main background
- **Glass Cards**: Semi-transparent with backdrop blur

### Typography
- **Headings**: Syne font family
- **Body**: DM Sans font family

### Components
- Glass morphism design
- Smooth animations and transitions
- Responsive grid layouts
- Interactive charts and visualizations

## 🔧 Development

### Available Scripts

**Backend:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run import` - Import CSV data

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Code Structure

- **Components**: Reusable UI components with props
- **Pages**: Route-based page components
- **API Layer**: Centralized API calls with error handling
- **State Management**: React hooks for local state
- **Styling**: Tailwind CSS with custom utilities

## 📱 Features Overview

### Home Page
- Hero section with search functionality
- Market statistics cards
- Job categories exploration
- How it works section

### Job Explorer
- Advanced filtering (experience, company size, remote work, etc.)
- Real-time search with autocomplete
- Sorting and pagination
- Responsive job cards

### Job Detail
- Comprehensive job information
- Salary analysis and percentile ranking
- Similar jobs recommendations
- Interactive salary distribution charts

### Salary Predictor
- Multi-step wizard interface
- AI-powered salary prediction
- Personalized insights and recommendations
- Market position analysis

### Dashboard
- Market intelligence overview
- Interactive charts and visualizations
- Salary trends and comparisons
- Key performance indicators

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or cloud MongoDB instance
2. Update environment variables for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean
4. Ensure CORS settings allow your frontend domain

### Frontend Deployment
1. Build the production bundle: `npm run build`
2. Deploy to platforms like Vercel, Netlify, or AWS S3
3. Update API base URL in production environment

### Environment Variables for Production
```env
MONGO_URI=your_production_mongodb_uri
PORT=5001
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Data visualization powered by Recharts
- UI animations by Framer Motion
- Icons by Lucide React
- Styling with Tailwind CSS

## 📞 Support

For support, email support@careerscope.com or create an issue in the repository.

---

**Built with ❤️ for career growth and data-driven decision making.**