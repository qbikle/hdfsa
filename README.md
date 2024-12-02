# Notes App

A **Note-Taking App** built with modern web technologies that allows users to manage their notes securely. The application supports signup/login using email and OTP, JWT-based authentication, and CRUD operations on user-specific notes.

---

## **Tech Stack**

### **Frontend**
- **Next.js 15**: A React framework for building fast and scalable web applications.
- **TypeScript**: Enhances the codebase with type safety and better developer tooling.
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **shadcn/ui**: Pre-configured Tailwind-based components for faster UI implementation.

### **Backend**
- **Bun**: A modern JavaScript runtime that is faster and provides integrated tooling.
- **Prisma ORM**: Used for database schema management, migrations, and type-safe data operations.
- **PostgreSQL**: A relational database deployed using **Vercel Postgres**.

---

## **Features**
1. **User Authentication**:
   - Signup/Login using email and OTP.
   - JWT-based authentication for secured routes.
2. **Notes Management**:
   - Create, Read, and Delete notes.
   - Each user has access to their own notes only.
3. **Mobile-Friendly**:
   - Responsive design using TailwindCSS.
4. **Deployment**:
   - Hosted on **Vercel** with Vercel Postgres as the database.

---

## **Prerequisites**
- [Node.js](https://nodejs.org/) or [Bun](https://bun.sh/) installed.
- PostgreSQL database or Vercel Postgres.
- [Prisma CLI](https://www.prisma.io/) installed globally (`npm install -g prisma`).

---

## **Environment Variables**
Create a `.env` file in the root directory and configure the following:

```env
# PostgreSQL Database URLs
POSTGRES_PRISMA_URL=postgresql://<username>:<password>@<host>:<port>/<database>?schema=public
POSTGRES_URL_NON_POOLING=postgresql://<username>:<password>@<host>:<port>/<database>

# JWT Secret
JWT_SECRET=your_jwt_secret

# Bun-specific environment variables (optional)
# Email-specific environment variables (required)

# For reference look for .env.example file in root directory of this repository.
```

For Vercel Postgres, get the connection details from your Vercel dashboard.

---

## **Installation and Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/qbikle/hdfsa
cd notes-app
```

### **2. Install Dependencies**
Using **Bun**:
```bash
bun install
```

Using **NPM**:
```bash
npm install
```

### **3. Set Up Prisma**
Generate the Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### **4. Run the Development Server**
Using **Bun**:
```bash
bun dev
```

Using **NPM**:
```bash
npm run dev
```

---

## **Build and Deployment**

### **1. Build Command**
For deployment, the project includes a preconfigured build command that generates the Prisma client and builds the Next.js application:

```bash
"build": "prisma generate && next build"
```

Run the build:
```bash
bun build
# OR
npm run build
```

### **2. Deployment on Vercel**
- Add the `.env` variables in your Vercel project settings.
- Ensure that the `POSTGRES_PRISMA_URL` and `POSTGRES_URL_NON_POOLING` point to your Vercel Postgres instance.
- Vercel automatically runs the `build` command during deployment.

---

## **Run on Another Machine**

1. Clone the repository:
   ```bash
   git clone https://github.com/qbikle/hdfsa
   cd notes-app
   ```

2. Install dependencies:
   ```bash
   bun install
   # OR
   npm install
   ```

3. Set up `.env` with database credentials and JWT secret.

4. Apply migrations:
   ```bash
   npx prisma generate
   npx prisma migrate deploy
   ```

5. Start the server:
   ```bash
   bun dev
   # OR
   npm run dev
   ```

---

## **API Endpoints**

### **Authentication**
- **POST /api/send-otp**: Send OTP to email.
- **POST /api/verify-otp**: Verify OTP andenticate user.
- **POST /api/verify-signin**: Verify OTP and authenticate user for Sign In using email.

### **Notes**
- **GET /api/notes/create**: Create a new note (requires JWT).
- **POST /api/notes.edit**: Edit a new note (requires JWT).
- **POST /api/notes/delete**: Delete a note by ID (requires JWT).

---

## **Testing**
- Use tools like **Postman** or **Thunder Client** for API testing.
- Ensure all API requests include the `Authorization` header with `Bearer <JWT>` for protected routes.

---

## **Contributing**
1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a Pull Request.
