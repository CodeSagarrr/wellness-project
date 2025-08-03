# Wellness Session Management Platform

A full-stack web application for creating, managing, and publishing wellness sessions. Built with Next.js, React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Session Creation & Management**: Create and edit wellness sessions with auto-save functionality
- **Draft System**: Save sessions as drafts and publish when ready
- **Real-time Preview**: Live preview of sessions as you create them
- **Auto-save**: Automatic saving every 5 seconds to prevent data loss
- **User Authentication**: Secure login and registration system
- **Session Categories**: Organize sessions with tags and difficulty levels
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons
- **Moment.js** - Date formatting

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcrypt** - Password hashing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CodeSagarrr/wellness-project.git
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Configure your `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wellness-sessions
JWT_SECRET=your-secret-key-here 
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

#### Configure Backend URL

The frontend is configured to connect to the backend through `next.config.js`. Make sure your backend URL is correctly set:

```javascript
// frontend/next.config.ts
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: 'http://localhost:8080/v1/:path*', // Backend URL
      },
    ];
  },
};

export default nextConfig;
```

**Note**: Update the destination URL in `next.config.ts` to match your backend server URL and port.

### 4. Database Setup

Make sure MongoDB is running on your system or update the connection string in your backend `.env` file to point to your MongoDB instance.

### 5. Running the Application

#### Start Backend Server

```bash
cd Backend
npm start
```

The backend server will start on `http://localhost:8080`

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend application will start on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /v1/register
Content-Type: application/json

{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /v1/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Session Management Endpoints

#### Save Draft Session
```http
POST /v1/my-sessions/save-draft
Content-Type: application/json
Authorization: Bearer <token>

{
  "sessionId": "optional-session-id-for-updates",
  "title": "Morning Meditation",
  "description": "A peaceful morning meditation session",
  "tags": "meditation, mindfulness, morning",
  "json_file_url": "https://example.com/session.json",
  "difficulty": "Beginner"
}
```

#### Publish Session
```http
POST /v1/my-sessions/publish
Content-Type: application/json
Authorization: Bearer <token>

{
  "sessionId": "optional-session-id-for-updates",
  "title": "Morning Meditation",
  "description": "A peaceful morning meditation session",
  "tags": "meditation, mindfulness, morning",
  "json_file_url": "https://example.com/session.json",
  "difficulty": "Beginner"
}
```

#### Get My Sessions
```http
GET /v1/my-sessions
Authorization: Bearer <token>
```

#### Get All Published Sessions
```http
GET /v1/sessions
```

#### Get Single Session
```http
GET /v1/sessions/:id
Authorization: Bearer <token>
```

#### Delete Session
```http
DELETE /v1/sessions/:id
Authorization: Bearer <token>
```

## 🎯 Key Features Explained

### Auto-Save Functionality
- Automatically saves form data every 5 seconds when changes are detected
- Prevents data loss during session creation
- Visual indicators show save status (saving, saved, unsaved changes)

### Draft System
- Save sessions as drafts to work on them later
- Publish drafts when ready to make them public
- Edit existing sessions through an intuitive dialog interface

### Session Categories
- Tag sessions with relevant categories (meditation, yoga, mindfulness, etc.)
- Set difficulty levels (Beginner, Intermediate, Advanced)
- Color-coded tags for easy identification

## 📁 Project Structure

```
assignment/
├── Backend/
│   ├── controller/
│   │   ├── auth/
│   │   └── session/
│   ├── model/
│   ├── middleware/
│   ├── DB/
│   └── app.js
├── frontend/
│   ├── app/
│   │   ├── (routes)/
│   │   │   ├── create-sessions/
│   │   │   ├── dashboard/
│   │   │   ├── login/
│   │   │   ├── my-sessions/
│   │   │   └── register/
│   │   └── _components/
│   ├── components/
│   └── lib/
└── README.md
```

## 🔧 Development

### Backend Development
```bash
cd Backend
npm run dev  # Start with nodemon for development
```

### Frontend Development
```bash
cd frontend
npm run dev  # Start Next.js development server
```

#### API Proxy Configuration

The frontend uses Next.js rewrites to proxy API requests to the backend. This configuration is in `next.config.ts`:

```javascript
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/v1/:path*',
        destination: 'http://localhost:8080/v1/:path*',
      },
    ];
  },
};
```

This setup allows the frontend to make API calls to `/v1/*` endpoints, which are automatically proxied to your backend server.

### Database Schema

#### Session Model
```javascript
{
  user_id: ObjectId,
  title: String,
  description: String,
  tags: [String],
  json_file_url: String,
  status: "draft" | "published",
  difficulty: "Beginner" | "Intermediate" | "Advanced",
  created_at: Date,
  updated_at: Date
}
```

#### User Model
```javascript
{
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  created_at: Date
}
```

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
cd Backend
heroku create your-app-name
git push heroku main
```

### Frontend Deployment (Vercel)
```bash
cd frontend
vercel --prod
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎉 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [MongoDB](https://www.mongodb.com/) for the database solution

---

**Happy Coding! 🚀** 