Documentation: FUTO SUG Election App

Overview

The FUTO SUG Election App is a web application designed to facilitate seamless and transparent elections for the Student Union Government (SUG) at the Federal University of Technology, Owerri (FUTO). Built with a modern tech stack, the app focuses on providing a secure, user-friendly, and scalable platform for managing electoral processes, from voter registration to results collation.


---

Core Features

1. Authentication and Authorization

Voter Authentication: Users log in using their matriculation numbers. Authentication is handled via Supabase for security and scalability.

Admin Panel: Authorized personnel can access an admin dashboard to manage the election process.


2. Voter Validation

Matriculation Numbers: A table (valid_matriculation_numbers) contains pre-validated matriculation numbers with the following schema:

Id (integer, primary key)

matric_numbers (string, unique)

available (boolean, indicates voting eligibility)


Eligibility Check: Before voting, the app checks if the user's matriculation number is valid and marked as available.


3. Candidate Profiles

Each candidate has a detailed profile, including:

Name

Position contested

Manifesto

Profile picture


Profiles are dynamically fetched and displayed to voters.


4. Voting Process

Simple UI: Voters select their candidates via an intuitive ballot-style interface.

Real-Time Updates: The app ensures that votes are recorded immediately and securely using Prisma ORM.

One Vote Per Position: Voters can only cast one vote per position, and their matriculation number is marked to prevent duplicate voting.


5. Admin Features

Candidate Management: Admins can add, edit, or remove candidates.

Election Settings: Admins configure election dates, eligible positions, and other parameters.

Result Compilation: Secure access to real-time voting results.


6. Security Measures

Data Integrity: Prisma ORM ensures consistent and secure database transactions.

Authentication: Supabase handles user sessions and token-based authentication.

Audit Logs: Admin actions and key events are logged for accountability.


7. Mobile Responsiveness

The app is fully responsive, ensuring accessibility on all devices, including smartphones, tablets, and desktops.



---

Tech Stack

1. Frontend

Framework: React.js with TypeScript for type safety.

Styling: Tailwind CSS for efficient and scalable designs.


2. Backend

Database: Supabase (PostgreSQL)

ORM: Prisma for database interactions.

Hosting: Supabase handles backend hosting and database services.


3. Deployment

The app is deployed on a scalable cloud platform (e.g., Vercel for frontend).



---

Functional Workflow

1. Voter Registration:

Admin uploads a list of valid matriculation numbers to the valid_matriculation_numbers table.

Each matriculation number is marked as available by default.



2. Login:

Voters log in using their matriculation numbers.

Upon successful login, the system verifies their eligibility.



3. Candidate Selection:

Voters review candidate profiles.

They cast votes for their preferred candidates.



4. Vote Submission:

The system validates the vote and updates the available status of the voter's matriculation number to false.



5. Results Viewing:

Admins access the results dashboard to monitor and publish election results.
