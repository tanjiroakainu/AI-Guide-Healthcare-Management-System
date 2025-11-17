# Clinic Appointment System

A modern clinic appointment management system built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- **Role-Based Access Control**: Three user roles (Admin, Staff, Client)
- **Appointment Management**: Book, view, update, and cancel appointments
- **User Authentication**: Secure login system with role-based routing
- **Modern UI**: Beautiful, responsive interface built with Tailwind CSS

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

## Role Permissions

### Admin
- View all appointments
- Manage all users
- Update appointment statuses
- Full system access

### Staff
- View all appointments
- Confirm appointments
- Mark appointments as completed
- Cancel appointments

### Client
- Book new appointments
- View own appointments
- Cancel own appointments
- View appointment status

