# HealthHub - Doctor Reservation System

A modern healthcare management application connecting doctors and patients. Built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

## Features

### Patient Portal
- **Dashboard**: View upcoming appointments and health stats.
- **Find Doctors**: Search and filter doctors by specialization and availability.
- **Appointments**: Book, reschedule, and manage appointments.
- **Profile**: Manage personal information and medical history.

### Doctor Portal
- **Dashboard**: Overview of daily schedule and patient statistics.
- **Profile Management**: Update professional details, bio, and upload CV.
- **Availability**: Set working hours and break times.
- **Appointments**: Manage patient bookings.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn/ui
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **State Management**: React Hooks & Server Actions

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   Create a `.env` file with your database URL and other secrets.

3. **Database Migration**:
   ```bash
   npx prisma migrate dev
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.
