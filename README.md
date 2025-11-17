# Healthcare Management System

A comprehensive healthcare management system built with Vue 3, TypeScript, and Tailwind CSS. Features appointment booking, product management, real-time chat, and comprehensive analytics.

## Features

- **Role-Based Access Control**: Three user roles (Admin, Staff, Client)
- **Appointment Management**: Book, view, update, reschedule, and cancel appointments
- **Product Management**: Browse, purchase, and manage medical products
- **Product Recommendations**: Doctors can recommend products to clients during appointments
- **Real-Time Chat System**: Communicate between clients, staff, and admin
- **System Statistics & Charts**: Comprehensive analytics and visualizations
- **User Authentication**: Secure login system with role-based routing
- **AI Assistant Chatbot**: Interactive AI assistant for non-users on the home page
- **Public Product Browsing**: View available products without logging in
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- **Vercel Ready**: Configured for easy deployment

## Default Users

- **Admin**: admin@gmail.com / admin123
- **Staff**: staff@gmail.com / staff123
- **Client**: client@gmail.com / client123

## Project Structure

```
src/
├── components/       # Reusable components
├── views/           # Page components
│   ├── admin/       # Admin views
│   ├── staff/       # Staff views
│   └── client/      # Client views
├── stores/          # Pinia stores (state management)
├── router/          # Vue Router configuration
├── types/           # TypeScript type definitions
└── main.ts          # Application entry point
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Technologies

- Vue 3 (Composition API)
- TypeScript
- Tailwind CSS
- Vue Router
- Pinia (State Management)
- Vite (Build Tool)

## Deployment

The project is configured for Vercel deployment with `vercel.json`. Simply connect your GitHub repository to Vercel for automatic deployments.

## Repository

GitHub: [https://github.com/tanjiroakainu/AI-Guide-Healthcare-Management-System](https://github.com/tanjiroakainu/AI-Guide-Healthcare-Management-System)

## Role Permissions

### Admin
- View all appointments
- Manage all users (add/edit/delete staff)
- Update appointment statuses
- Manage products and inventory
- View system statistics and charts
- Monitor product purchases
- View staff chat history
- Full system access

### Staff/Doctor
- View all appointments
- Confirm appointments
- Mark appointments as completed
- Reschedule appointments
- Cancel appointments
- Recommend products to clients
- View recommended products and history
- Chat with clients and admin
- Update payment statuses

### Client
- Book new appointments
- View own appointments
- Cancel own appointments
- View appointment history
- Browse and purchase products
- View recommended products from doctors
- View product purchase history
- Chat with staff and admin
- View appointment status

