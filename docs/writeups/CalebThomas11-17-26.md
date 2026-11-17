# Project Progress Write-Up — November 17, 2026

### Overview

Since my September 28 write-up, I have continued developing the capstone website from its initial Express/MongoDB foundation into a more complete student tool. The main focus has been implementing authentication, building the formula library, improving the user interface, preparing the application for deployment, and adding pages for paper scoring and project documentation.

### Work Completed

- Implemented user registration, login, and logout routes.
- Added password hashing with `pbkdf2-password` and updated the user schema to store password hashes and salts.
- Added JWT generation and verification, cookie-based token storage, and middleware that makes the logged-in user available to routes and templates.
- Added reusable header and footer partials, authentication views, and authentication-specific styling.
- Built formula routes for searching, creating, viewing, and filtering formulas.
- Updated the formula schema to support contributors and constants, and added a formula creation page with a live preview.
- Added pages for displaying all formulas and viewing individual formula details.
- Expanded the site styling with responsive layouts for the home page, navigation, authentication pages, formula pages, and library views.
- Added a `ProcFile` with the web start command to support deployment on a hosted web platform.
- Replaced the original home view with the new `index.ejs` home page and improved its title, description, and heading text.
- Added a new paper-score page as an early part of the site's paper analysis tools.
- Added routes and a view for displaying project write-ups, along with styling for the write-up page.
- Continued using the `dev` branch and pull requests to organize changes before merging them into `main`.
- Hosted the project on https://mcc-capstone-b5f7c7236097.herokuapp.com where future updates will be deployed for testing and demonstration.

### Development Progress

The project has moved beyond the initial setup stage. The backend now has working route organization, database schemas, authentication logic, and formula functionality. The frontend also has a consistent layout and several working views instead of only placeholder pages. The project is now better structured for adding the remaining student tools and connecting them to the existing authentication and database systems.

### Challenges and Lessons Learned

One of the main challenges was keeping the authentication data consistent between the user schema, registration route, JWT functions, cookies, and templates. Fixing the user lookup and token-generation flow helped clarify how each part of the authentication system depends on the others. I also learned that creating shared partials and a route importer makes it easier to maintain the application as more pages are added.

Building the formula features required coordinating the schema, routes, forms, and views so that formulas could be created and displayed consistently. Using a separate development branch and pull requests has made it easier to isolate feature work, review changes, and merge completed work into the main branch.


### AI Useage

Currently ai has been used to assist in documentation and code review. The AI has been used to generate summaries of the work completed, challenges faced, and next steps for the project. It has also been used to review code snippets and provide suggestions for improvements or optimizations.

At first the styling was ai but since then the styling has been done by hand. The AI has also been used to generate some of the documentation for the project, including this write-up.

### Next Steps

- Test the authentication and formula workflows more thoroughly, including invalid input and unauthorized access.
- Connect the paper-score page to its planned scoring or analysis functionality.
- Continue developing the plagiarism and AI-use checking tools described in the project goals.
- Improve validation, error handling, and responsive behavior across the remaining pages.
- Continue updating the project documentation and project board as new features are completed.