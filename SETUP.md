# Quick Setup Guide - AI Social Media Studio

## Overview
The Social Media Content Generation feature is **already fully implemented**. This guide helps you get it running locally.

## Prerequisites
- Node.js 18+ installed
- OpenAI API key (for content generation)
- Database (PostgreSQL for production, SQLite for local testing)

## Setup Steps

### 1. Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

Required environment variables:
```bash
DATABASE_URL="your-database-url"
OPENAI_API_KEY="sk-your-openai-api-key"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Database Setup

For **PostgreSQL** (Production):
```bash
# Update schema for PostgreSQL
# In prisma/schema.prisma, change:
# provider = "sqlite" to provider = "postgresql"

# Set DATABASE_URL to your PostgreSQL connection string
# DATABASE_URL="postgresql://username:password@localhost:5432/ai_social_media"
```

For **SQLite** (Local Development):
```bash
# Already configured - just run migrations
npm run db:generate
npm run db:migrate
```

### 3. Install Dependencies & Start
```bash
# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

## Application Usage

### Step 1: Create Brand Context
1. Click "🏢 Setup Brand Context" 
2. Fill in your business information:
   - Business name and industry
   - Target audience description
   - Brand voice and values
   - Key products/services
   - Unique selling points

### Step 2: Generate Content
1. Select target platforms (Twitter, LinkedIn, Instagram, etc.)
2. Enter content topic and tone
3. Add key message and call-to-action
4. Click "Generate Content"

### Step 3: Use Generated Content
1. Review platform-optimized content
2. Check character counts and engagement hooks
3. Copy content to clipboard for publishing
4. View content strategy recommendations

## Features Included ✅

- **Multi-Platform Generation**: 7 social media platforms supported
- **Brand Context Awareness**: Personalized content based on business info
- **Content History**: Organized sidebar with all previous generations
- **Character Limit Validation**: Real-time checking with visual indicators
- **Copy-to-Clipboard**: One-click copying for all platforms
- **Strategy Recommendations**: AI-generated content strategy and posting tips
- **Platform Selection**: Choose specific platforms to reduce costs

## Troubleshooting

### Database Connection Issues
- Ensure DATABASE_URL is correctly formatted
- For PostgreSQL: Check server is running and credentials are correct
- For SQLite: File permissions should allow read/write

### OpenAI API Issues
- Verify OPENAI_API_KEY is valid and has credits
- Check API key has proper permissions
- Ensure network connectivity to OpenAI services

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear Next.js cache: `rm -rf .next`
- Regenerate Prisma client: `npm run db:generate`

## Additional Commands

```bash
# Database management
npm run db:studio          # Open Prisma Studio (database GUI)
npm run db:reset           # Reset database (removes all data)

# Development
npm run lint               # Check code quality
npm run build              # Build for production
npm start                  # Start production server
```

## Support

The application is fully functional and production-ready. All social media content generation features are implemented and working correctly.

For issues:
1. Check environment variables are set correctly
2. Ensure database connection is working
3. Verify OpenAI API key is valid
4. Check console logs for specific error messages

**The Social Media Content Generation feature is 100% complete and ready to use!** 🚀