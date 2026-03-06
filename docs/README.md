# 🌿 Prodajen Uje | Olive Oil Marketplace Web Application 

# 📁 Project Overview

This is a Next.js-based marketplace web application designed for buying and selling olive oil directly between local producers and customers. The application allows producers to create listings for their olive oil products while buyers can browse the marketplace, view product details, and add products to their shopping cart. The project provides a fully responsive and interactive marketplace experience for buying and selling olive oil. This report outlines the development process and the main features of the web application, which was created as part of a multi-stage assignment. The project included designing low and high-fidelity prototypes, implementing a responsive interface, and developing dynamic functionality such as user authentication, product creation, and a shopping cart system. The development of the application was carried out through several structured stages.

# 📂 Assignment Overview

## 1. Idea Pitch
- 🔗 Link to Assignment 1: [**Idea Pitch**](/assignments/idea-pitch/)

- Define the topic of the web application
- Clearly describe the problem it aims to solve
- Define who the targeted users are and how they would benefit from using this application

## 2. User personas and information architecture
- 🔗 Link to Assignment 2: [**User Personas**](/assignments/user-personas/)

- Three well-defined user personas representing different types of users and target groups
- Detailed descriptions of each persona’s objectives, motivations, and challenges when using the platform
- Information architecture structured around the needs of these personas, including key sections and content organization
- A sitemap illustrating the platform’s page hierarchy and overall navigation structure

## 3. Next.js – Application Deployment
- 🔗 Link to Assignment 3: [**Next.js - Deploying Application**](https://prodajen-uje.vercel.app/)

- Initialize a new Next.js project as the foundation of the web application
- Create template pages based on the categories defined in the project's sitemap
- Implement application routes that correspond to the planned page structure
- Ensure proper navigation between pages using the Next.js Link component
- Deploy the initial version of the application to Vercel or Netlify
- Verify that the deployed version is publicly accessible and that navigation functions correctly

## 4. Low/High-fidelity prototype
- 🔗 Link to Assignment 4: [**Low/High-fidelity prototype**](/assignments/low-high-fidelity-prototype)

- High-fidelity desktop homepage prototype demonstrating the visual style, layout, and content hierarchy
- High-fidelity mobile homepage prototype adapted for smaller screens and touch interaction
- Visual foundation for implementing the Next.js interface, ensuring consistency between design and the built application

## 5. Next.js - Dynamic routes, data fetching
- 🔗 Link to Assignment 5: [**Next.js - Dynamic routes, data fetching**](https://prodajen-uje.vercel.app/)

- Dynamic routing implementation
- Data fetching and state management
- Implementing API routes for backend functionality

 # 🚀 Technologies And Features

 **Frontend**

- HTML: Structure and semantic layout of pages
- CSS: Basic styling and layout adjustments
- JavaScript (ES6+): Client-side logic and interactivity
- React (Next.js App Router): Component-based frontend architecture
- Next.js 16: Full-stack React framework used for routing, SSR/CSR, and API integration
- Tailwind CSS: Utility-first styling framework used for responsive design and UI consistency
- Next/Image: Optimized image handling for product images
- Lucide React Icons: Icon library used for UI elements (cart, navigation icons)
- React Hooks: useState, useEffect, and custom hooks for state and lifecycle management
- React Context API: Used for global cart state management (CartProvider)
- useReducer: State management for cart logic
- React Hot Toast: Notification system for success, loading, and error messages
- Next.js Link component: Client-side navigation between pages
- Next.js Router (next/navigation): Programmatic navigation and dynamic routing
- Dynamic Routes: Used for product pages (/product/[id]) and order pages (/order/[id])

**Backend**

- Supabase Client (@supabase/supabase-js): Communication with Supabase backend services
- Next.js Server/Client architecture: Separation of server and client components
- Custom Middleware Layer: Separate service files (product.ts, order.ts, auth.ts) used for API interaction and business logic
- Async/Await pattern: Used for asynchronous operations (API calls, database requests)

**Authentication**

- Supabase Auth: Email/password authentication system
- JWT Authentication: Secure session handling through Supabase
- Session Management: Authentication state handling using Supabase session API
- User Registration & Login: Custom signup/login forms integrated with Supabase
- Protected UI Actions: Restricting product creation, ordering, and deletion to authenticated users

**Database**

- Supabase PostgreSQL Database: Primary relational database

**Tables**

- products – product listings
- profiles – user profile data
- orders – purchase orders
- Row Level Security (RLS): Database security policies controlling access to data
- Triggers (handle_new_user): Automatic profile creation when a new user registers
- SQL Constraints: Unique constraints for usernames and other data integrity rules

**Storage**

- Supabase Storage: Used for uploading and serving product images
- Public Storage Bucket (product-images): Stores product photos and fallback images
- File Upload Handling: Image upload with preview functionality before publishing a product

## Features Implemented

- User authentication (signup/login/logout)
- Product listing and marketplace browsing
- Product detail pages
- Product creation (sell page)
- Image upload for products
- Shopping cart system
- Quantity selection and cart state management
- Order creation from cart
- Order detail page
- User profile dashboard
- Seller order management
- Toast notifications for user feedback
- Custom error handling and validation
- Responsive design for mobile and desktop
- Dark mode support
- Development Tools
- Node.js: Runtime environment for the project.
- npm: Dependency and package management.
- Git: Version control system.
- GitHub: Repository hosting and project collaboration.
- Vercel: Deployment and hosting platform for the application.
- TypeScript: Static typing for safer and more maintainable code.

 # 📝 Basic Design Principles
 
 The interface follows several core design principles:

- Consistent typography and color scheme
- Clear emphasis on important elements such as product cards and buttons
- Strong contrast between text and background
- Structured layout
- Grouping related information together

These principles help make the marketplace easy to navigate.


# 🔍 Norman's 7 Strategies

The project applies Norman's strategies to make key actions discoverable, understandable, and predictable for both new and returning users.

1. ***Discoverability*** - Main navigation, event filters, and CTAs are always visible and clearly named.
2. ***Feedback*** - Buttons, filters, and cart actions respond with hover states.
3. ***Conceptual Model*** - Events are shown as a familiar list with filters and details similar to other ticket sites.
4. ***Affordances*** - Interactive elements look clickable through consistent shapes, borders, and hover effects.
5. ***Signifiers*** - Labels, icons, and placeholders guide users.
6. ***Mappings*** - Logical ordering aligns with users' expectations.
7. ***Constraints*** - Required fields prevent errors and guide users towards successful input.


# ⚡ Analyze the application's performance

The full performance report can be viewed [here](https://pagespeed.web.dev/analysis/https-prodajen-uje-vercel-app/g7b54c7elj?form_factor=desktop).

# 📝 Future improvements

- Online Payment Integration
- Multi-Language Support
- Push Notifications & Emails
- Personalized recommendations

# ✅ App available [here](https://prodajen-uje.vercel.app/)
