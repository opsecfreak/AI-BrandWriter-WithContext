# AI Tasks

This project is a Next.js application that takes a user-provided task and automatically generates subtasks using OpenAI agents. It uses Prisma as the ORM and Neon as the PostgreSQL database provider.

## Features

- Accepts user tasks via a simple interface
- Utilizes OpenAI SDK and agents to break tasks into actionable subtasks
- Outputs structured subtasks for easier task management
- Built with Next.js 15 framework with Turbopack for fast development
- Uses Prisma ORM for database operations
- PostgreSQL database hosted on Neon
- Form handling with React Hook Form and Zod validation
- Responsive UI with Tailwind CSS v4
- Type-safe development with TypeScript

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/ai-tasks.git
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up your environment variables in `.env`:

    ```env
    OPENAI_API_KEY=your-openai-api-key
    DATABASE_URL=your-neon-postgres-connection-string
    ```

4. Set up the database with Prisma:

    ```bash
    npx prisma generate
    npx prisma db push
    ```

5. Run the application:

    ```bash
    npm run dev
    ```

## Usage

1. Enter a task in the input field.
2. The system generates subtasks using OpenAI agents.
3. Review and manage the generated subtasks.

## Technologies

- **Next.js 15.4.4** - React framework for production (with Turbopack for fast development)
- **React 19.1.0** - UI library
- **Prisma** - Modern database toolkit and ORM
- **OpenAI SDK** - For AI-powered task generation
- **@openai/agents** - OpenAI Agents framework
- **PostgreSQL** - Database (hosted on Neon)
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation
- **Moment.js** - Date manipulation library

## License

MIT
