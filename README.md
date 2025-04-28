Employee Management App - Angular 19
Overview
The Employee Management App is a comprehensive web application built with Angular 19 to manage employees and their associated projects. This app provides an intuitive interface for administrators to manage employee details, sign up and log in users, track employee progress, and oversee ongoing projects. The app integrates with a backend API for CRUD operations (Create, Read, Update, Delete).

Features
User Authentication

Login and signup functionality to manage user access.

Dashboard

A user-friendly dashboard to view statistics and manage employees and projects.

Employee Portal

A dedicated portal for employees to view their personal details, project assignments, and status.

Project Portal

A portal to track and manage various ongoing projects, employees assigned to them, and their statuses.

CRUD Operations

All data related to employees and projects are handled through CRUD operations using the backend API.

UI Built with Angular Material

A modern and responsive design powered by Angular Material UI components.

Technologies Used
Frontend:

Angular 19: Framework for building the application.

Angular Material: UI component library used for designing the user interface.

TypeScript: For writing the application logic.

HTML5, CSS3: For the layout and styling of the web pages.

Backend:

API Integration: The app interacts with the backend API provided here.

RESTful API: The API supports CRUD operations for employee and project management.

Authentication:

JWT Authentication: For secure login and token-based authentication.

State Management:

RxJS: For handling asynchronous data streams and managing state.

Other Libraries:

Bootstrap: For additional UI components and responsive design.

Angular Forms: For handling user inputs (both reactive and template-driven forms).

Installation
Prerequisites
Node.js: Ensure Node.js is installed. You can download it from here.

Angular CLI: Install Angular CLI globally by running:

bash
Copy
Edit
npm install -g @angular/cli
Angular Material: The project uses Angular Material for UI components. Install it by running:

bash
Copy
Edit
ng add @angular/material
Steps to Run the Project Locally
Clone the repository:

bash
Copy
Edit
git clone https://github.com/sumitmagicedtech/employee-management-app.git
cd employee-management-app
Install the dependencies:

bash
Copy
Edit
npm install
Configure API endpoint:

Replace the API endpoint in the Angular service files with the one you are using for your backend (e.g., https://projectapi.gerasim.in).

Run the development server:

ng serve --port 4209
Navigate to http://localhost:4209 to view the app in your browser.

API Integration
The app communicates with a backend API for CRUD operations. The following endpoints are used in the project:

Login: POST /login

Signup: POST /signup

Get All Employees: GET /employees

Add Employee: POST /employees

Update Employee: PUT /employees/{id}

Delete Employee: DELETE /employees/{id}

Get All Projects: GET /projects

Add Project: POST /projects

Update Project: PUT /projects/{id}

Delete Project: DELETE /projects/{id}

Future Updates
In the future, I plan to implement many exciting features and improvements to the project. These updates will focus on enhancing functionality, improving user experience, and adding new capabilities to make the app even more powerful and user-friendly. Stay tuned for ongoing updates and contributions!
