# School Management Mini Project  
The project is built using *Next.js (React framework)* and *MySQL*.  

It contains:  
1. A form to *add school details* into the database.  
2. A page to *display all schools* in a card-style layout.  
3. A custom *homepage* that provides smooth navigation to different sections of the project.  

---

## 🚀 Features  

- **Add School Page (addSchool.jsx)**  
  - Responsive form built with react-hook-form.  
  - Validations ( required fields).   
  - Data stored in MySQL database under the schools table.  

- **Show Schools Page (showSchools.jsx)**  
  - Displays schools in a *grid layout* similar to e-commerce listings.  
  - Shows school *name, address, city, and image*.  
  - Responsive design (works seamlessly on desktop and mobile).  

- **Custom Homepage (index.jsx)**  
  - Beautiful landing page with navigation to Add School and Show Schools pages.  
  - Clean UI for easy access to all features.  

---

## 🗄 Database  

*Table Name:* schools  

| Field      | Type            | Description                  |
|------------|-----------------|------------------------------|
| id         | INT (AUTO_INCREMENT) | Primary key               |
| name       | TEXT            | Name of the school           |
| address    | TEXT            | Address of the school        |
| city       | TEXT            | City where the school is located |
| state      | TEXT            | State name                   |
| contact    | NUMBER          | Contact number of the school |
| image      | TEXT            | Path of stored school image  |
| email_id   | TEXT            | Email ID of the school       |

---

## 🛠 Tech Stack  

- *Frontend:* Next.js (React)  
- *Styling:* CSS / Tailwind CSS (if used)  
- *Form Handling:* react-hook-form  
- *Backend:* Node.js (API routes in Next.js)  
- *Database:* MySQL  
- *Hosting:* Vercel  

---
