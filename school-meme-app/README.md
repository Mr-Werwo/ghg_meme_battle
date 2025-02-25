# School Meme App

## Overview
The School Meme App is a web application that allows students to anonymously upload memes for a weekly competition. The platform includes features for moderation, commenting, and a coin-based betting system, providing an engaging and interactive experience for users.

## Features
- **Anonymous Meme Uploads**: Students can upload memes without revealing their identities.
- **Moderation**: Memes are moderated to ensure they meet community guidelines.
- **Commenting System**: Users can comment on memes, fostering discussion and interaction.
- **Coin-Based Betting**: Users can place bets on their favorite memes using a virtual coin system.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript (or TypeScript)
- **Backend**: Node.js with Express
- **Database**: MariaDB/MySQL
- **Authentication**: JWT (JSON Web Tokens)

## Project Structure
```
school-meme-app
├── src
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── services
│   ├── middlewares
│   ├── utils
│   ├── app.ts
│   └── types
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions
1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd school-meme-app
   ```

2. **Install Dependencies**:
   ```
   npm install
   ```

3. **Set Up Database**:
   - Create a MariaDB/MySQL database and configure the connection in `src/utils/db.ts`.

4. **Run the Application**:
   ```
   npm start
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

## Contribution
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License.