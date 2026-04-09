Glimpse 📸
A Full-Stack Media Sharing & Social Ecosystem
[link](https://glimpse-pearl.vercel.app/)

Glimpse is a sophisticated social platform built to facilitate seamless visual storytelling. By moving away from managed backend services to a custom-built REST API, this project demonstrates high-level control over data architecture, secure authentication, and real-time social dynamics.

🚀 Core Features
Visual Storytelling: A dedicated "Stories" engine with ephemeral content delivery and smooth CSS scroll-snapping.

Dynamic Social Feed: A responsive, paginated feed supporting high-resolution image posts, likes, and threaded comments.

Relational Social Logic: A complex follow/unfollow system managing bi-directional user relationships and personalized content streams.

Secure Authentication: Custom JWT-based auth flow with HTTP-only cookies and SameSite/Secure flag configurations for cross-origin security.

Mobile-First Design: A fully responsive, component-driven UI optimized for everything from desktop monitors to mobile touchscreens.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, Lucide Icons

Backend: Node.js, Express.js

Database: MongoDB, Mongoose (ODM)

Authentication: JSON Web Tokens (JWT), Bcrypt.js

Deployment: Vercel (Frontend), Render/Railway (Backend)

🏗️ Architecture & Engineering
1. Custom MERN Integration
Replaced third-party BaaS providers with a custom Express/Node.js server to gain granular control over API performance and database indexing. This allowed for more complex query handling, such as populating user data across posts and comments.

2. State & Media Management
Utilized React’s functional components and hooks to manage local state for interactive elements (like/unlike toggles) to ensure the UI remains optimistic and fast, even during background API calls.

3. Data Integrity
Designed a scalable MongoDB schema that efficiently handles relational-style data—mapping followers, following, and post engagement—ensuring low-latency responses as the database grows.