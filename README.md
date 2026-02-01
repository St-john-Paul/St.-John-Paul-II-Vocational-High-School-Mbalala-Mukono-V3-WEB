# St. John Paul II Vocational & High School - Web Portal

## Overview
This is the official web portal for St. John Paul II Vocational & High School, Mbalala-Mukono. A comprehensive school management system with:
- **Public Website:** Information about the school, admissions, events, and curriculum
- **Admin Panel:** Complete management of students, staff, academics, timetable, allocations, and finance
- **Staff Portal:** Teachers can view classes, enter marks, manage profile, and access timetables
- **Student Portal:** Students view results, curriculum, timetables, and fee status

## 🚀 Quick Start
1. **Install Dependencies:** `npm install`
2. **Run Development Server:** `npm run dev:full`
3. **Access:** Open `http://localhost:5173` (Frontend)
4. **Seed Demo Data:** `node server/seed_full_school.js` (Creates 20 students, 8 teachers)

---

## 🔐 Login Credentials (Development)

### 1. Admin Panel
- **URL:** `/login.html` → Select "Admin"
- **Username:** `admin`
- **Password:** `admin123`

### 2. Staff Panel (Simulated Teachers)
- **URL:** `/login.html` → Select "Staff"
- **Teachers:** `teacher1` to `teacher5` (Math, English, Physics, Biology, History)
- **Vocational Instructors:** `vocational1` to `vocational3` (Tailoring, Building, Hairdressing)
- **Password:** `password123`

### 3. Student Portal (Simulated Students)
- **URL:** `/login.html` → Select "Student"
- **Default Account:** `stud` / `stud123` (Generic demo account)
- **Individual Students:** `student1` to `student20` (All use password: `stud123`)
- **Password:** `stud123` *(All student accounts)

---

## ✨ Key Features

### 🎓 Academic Management
- **Staff Allocation Matrix:** Admins assign teachers to classes/subjects via interactive grid (Admin → Allocations)
- **Curriculum Management:** Full CRUD for O-Level, A-Level, and Vocational subjects
- **Timetable System:** Dynamic class and routine timetables
- **Marks Entry:** Teachers enter student marks with validation

### 👥 User Management
- **Staff Settings:** Teachers manage their profile (photo, phone, email), change passwords, and set notification preferences
- **Role-Based Access:** Secure authentication for Admin, Staff, and Students
- **Profile Photos:** Auto-generated avatars based on names

### 💰 Finance & Tracking
- **Fee Management:** Track student payments and outstanding balances
- **Reports:** Financial summaries and analytics

### 🌐 Public Website Features
- **WhatsApp Integration:** Direct contact widget (bottom-right) linking to school WhatsApp
- **Dynamic Content:** News, events, gallery, testimonials, and leadership profiles
- **Responsive Design:** Optimized for mobile, tablet, and desktop

---

## 📂 Project Structure

```
V2 PAUL-WEB/
├── admin/              # Admin panel pages
│   ├── allocations.html   # NEW: Staff allocation matrix
│   ├── academics.html     # UPGRADED: Subject CRUD
│   └── ...
├── staff/              # Staff portal pages
│   ├── dashboard.html     # UPGRADED: Real allocations stats
│   └── ...
├── student/            # Student portal pages
├── server/             # Backend API
│   ├── models/            # Database models
│   │   └── StaffAllocation.js  # NEW: Teacher-Class-Subject linking
│   ├── controllers/       # Business logic
│   │   └── allocationController.js  # NEW
│   ├── routes/            # API endpoints
│   └── seed_full_school.js    # NEW: Demo data generator
└── src/                # Frontend shared resources
    └── components/
        └── whatsapp.js    # NEW: WhatsApp widget
```

---

## 🛠️ Database Seeding

To populate the system with demo data:

```bash
# Create 20 students and 5 academic teachers
node server/seed_full_school.js

# Add 3 vocational instructors
node server/seed_vocational_staff.js

# Populate curriculum subjects
node server/seed_subjects.js
```

---

## 🆕 Latest Updates

### Staff Allocation System
- **Admin → Allocations:** Interactive matrix to assign teachers to classes and subjects
- **Smart Filtering:** Automatically shows O-Level, A-Level, or Vocational subjects based on selected class
- **Live Sync:** Changes instantly reflect on teacher dashboards

### Enhanced Staff Portal
- **Tabbed Settings:** Profile, Security, and Notifications tabs
- **Real Statistics:** Dashboard shows actual assigned classes and subjects from database
- **Profile Management:** Teachers update their contact info independently

### Vocational Studies Support
- **Dedicated Staff:** Specialized instructors for vocational subjects
- **Curricular Integration:** Vocational subjects appear in curriculum and allocation pages
- **Class View:** "Vocational Class" option in allocation matrix

---

## 📞 Support & Contact
- **School WhatsApp:** +256 708 419 371
- **Location:** Mbalala-Mukono, Uganda

---

## 📝 License
© 2025 St. John Paul II Vocational & High School. All rights reserved.
