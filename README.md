# Fullstack Task Management App

A modern, full-stack task management application built with Next.js 14, TypeScript, Prisma, and PostgreSQL. Features user authentication, project management, task tracking, and a beautiful responsive UI with dark mode support.

## 🚀 Features

### **Authentication & Security**
- **User Registration & Login** - Secure JWT-based authentication
- **Password Hashing** - bcrypt encryption for user passwords
- **Protected Routes** - Middleware-based route protection
- **Session Management** - HTTP-only cookies for security

### **Project Management**
- **Create Projects** - Organize tasks into projects
- **Project Dashboard** - Overview of all user projects
- **Project-specific Views** - Filter tasks by project
- **Delete Projects** - Remove projects and associated tasks

### **Task Management**
- **Create Tasks** - Add tasks with descriptions and due dates
- **Task Status Tracking** - NOT_STARTED, STARTED, COMPLETED
- **Update Task Status** - Real-time status updates
- **Delete Tasks** - Remove completed or unwanted tasks
- **Task Filtering** - View tasks by status and project

### **User Interface**
- **Modern Design** - Beautiful glassmorphism UI with Tailwind CSS
- **Dark Mode Support** - Toggle between light and dark themes
- **Responsive Layout** - Mobile-first responsive design
- **Interactive Components** - Modals, dropdowns, and animations
- **Profile Management** - User profile page with account details

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark mode implementation

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Database toolkit and query builder
- **PostgreSQL** - Relational database
- **JWT Authentication** - JSON Web Tokens with jose library
- **bcrypt** - Password hashing

### **Development Tools**
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Prisma Studio** - Database GUI
- **tsx** - TypeScript execution for seeding

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/                 # Authentication pages
│   │   ├── register/          # User registration
│   │   └── signin/            # User login
│   ├── (dashboard)/           # Protected dashboard area
│   │   ├── home/              # Main dashboard
│   │   ├── profile/           # User profile
│   │   ├── project/           # Project management
│   │   └── layout.tsx         # Dashboard layout
│   ├── api/                   # API routes
│   │   ├── create-project/    # Create new project
│   │   ├── create-task/       # Create new task
│   │   ├── delete-project/    # Delete project
│   │   ├── delete-task/       # Delete task
│   │   ├── logout/            # User logout
│   │   ├── register/          # User registration
│   │   └── update-task-status/ # Update task status
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── providers/             # Context providers
│   ├── auth-form.tsx          # Authentication form
│   ├── sidebar.tsx            # Navigation sidebar
│   ├── new-task-modal.tsx     # Task creation modal
│   └── delete-task-modal.tsx  # Task deletion modal
├── lib/
│   ├── api/                   # API utilities
│   ├── auth.ts                # Authentication helpers
│   ├── db.ts                  # Database connection
│   └── utils/                 # Utility functions
└── assets/                    # Static assets

prisma/
├── schema.prisma              # Database schema
├── seed.ts                    # Database seeding
└── migrations/                # Database migrations
```

## 🗄️ Database Schema

### **User Model**
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  firstName String
  lastName  String
  password  String
  projects  Project[]
  tasks     Task[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### **Project Model**
```prisma
model Project {
  id          String    @id @default(uuid())
  name        String
  description String?
  due         DateTime?
  deleted     Boolean   @default(false)
  ownerId     String
  owner       User      @relation(fields: [ownerId], references: [id])
  tasks       Task[]
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}
```

### **Task Model**
```prisma
model Task {
  id          String      @id @default(uuid())
  name        String
  description String?
  status      TASK_STATUS @default(NOT_STARTED)
  due         DateTime?
  deleted     Boolean     @default(false)
  ownerId     String
  owner       User        @relation(fields: [ownerId], references: [id])
  projectId   String
  project     Project     @relation(fields: [projectId], references: [id])
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}
```

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### **Installation**

1. **Clone the repository**
```bash
git clone <repository-url>
cd fullstack-next
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/taskapp"
JWT_SECRET="your-super-secret-jwt-key"
COOKIE_NAME="__Task_app__"
```

4. **Database Setup**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database (optional)
npx prisma db seed
```

5. **Start the development server**
```bash
npm run dev
# or
yarn dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Run database migrations
- `npx prisma db seed` - Seed database with sample data

## 🔐 API Endpoints

### **Authentication**
- `POST /api/register` - User registration
- `POST /api/signin` - User login
- `POST /api/logout` - User logout

### **Projects**
- `POST /api/create-project` - Create new project
- `DELETE /api/delete-project` - Delete project

### **Tasks**
- `POST /api/create-task` - Create new task
- `PUT /api/update-task-status` - Update task status
- `DELETE /api/delete-task` - Delete task

## 🎨 UI Components

### **Core Components**
- **Sidebar Navigation** - Project and page navigation
- **Task Cards** - Interactive task display with status updates
- **Project Cards** - Project overview with task counts
- **Modals** - Task creation and deletion confirmations
- **Theme Toggle** - Light/dark mode switcher

### **Design Features**
- **Glassmorphism Effects** - Modern glass-like UI elements
- **Gradient Backgrounds** - Beautiful color transitions
- **Responsive Grid** - Adaptive layouts for all screen sizes
- **Smooth Animations** - CSS transitions and hover effects
- **Accessibility** - ARIA labels and keyboard navigation

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt with salt rounds
- **HTTP-Only Cookies** - Secure session storage
- **Route Protection** - Middleware-based access control
- **Input Validation** - Server-side request validation
- **CSRF Protection** - Cross-site request forgery prevention

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### **Other Platforms**
- **Railway** - Database and app hosting
- **PlanetScale** - Serverless MySQL database
- **Supabase** - PostgreSQL with real-time features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Built with ❤️ using modern web technologies for efficient task management.
