# AI Social Media Content Studio

> **AI-powered social media content generation platform with brand context awareness**

A comprehensive Next.js application that leverages OpenAI's GPT-4o-mini to generate platform-optimized social media content across multiple platforms, with intelligent brand context integration and character limit compliance.

## 🚀 Features

### Core Functionality
- **Multi-Platform Content Generation**: Create optimized content for 7 social media platforms
- **Brand Context Memory**: Store and utilize business information for consistent, brand-aware content
- **Character Limit Compliance**: Strict adherence to platform-specific character limits
- **Real-time Copy-to-Clipboard**: One-click copying for easy content publishing
- **AI-Powered Strategy**: Generate content strategies and engagement tactics

### Supported Platforms
| Platform | Character Limits | Content Type |
|----------|------------------|--------------|
| **Twitter/X** | 280 characters | Text posts |
| **LinkedIn** | 3,000 characters | Professional posts |
| **Instagram** | 2,200 characters | Caption content |
| **YouTube Video** | 100 chars (title), 5,000 chars (description) | Video content |
| **YouTube Shorts** | 100 chars (title), 5,000 chars (description) | Short-form video |
| **Facebook Post** | 63,206 chars (500-1000 recommended) | Text posts |
| **Facebook Reel** | 2,200 characters | Short-form video captions |

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.4 with TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: OpenAI GPT-4o-mini
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form + Zod validation
- **Database Provider**: Prisma Accelerate

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- OpenAI API key
- Git

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/opsecfreak/AiTasks-FormHW.git
cd AiTasks-FormHW
```

### 2. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/ai_social_media?schema=public"

# OpenAI Configuration
OPENAI_API_KEY="your-openai-api-key-here"

# Next.js Configuration
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` to access the application.

## 📖 API Documentation

### Brand Context Endpoints

#### `POST /api/brand-context`
Create a new brand context profile.

**Request Body:**
```json
{
  "businessName": "Mobile Tech Specialists",
  "industry": "UAV Technology & Mobile Tech Solutions",
  "targetAudience": "Drone enthusiasts, commercial UAV operators...",
  "brandVoice": "professional",
  "keyProducts": "UAV modules, drone customization...",
  "brandValues": "Innovation, reliability, affordability...",
  "uniqueSellingPoints": "Affordable UAV modules with hands-on support...",
  "website": "https://mobiletechspecialists.com",
  "additionalContext": "Additional brand information..."
}
```

**Response:**
```json
{
  "data": {
    "id": "clxy1234567890",
    "businessName": "Mobile Tech Specialists",
    "industry": "UAV Technology & Mobile Tech Solutions",
    "createdAt": "2025-08-05T02:12:18.050Z",
    "updatedAt": "2025-08-05T02:12:18.050Z"
  },
  "status": 200,
  "message": "Brand context saved successfully"
}
```

#### `GET /api/brand-context`
Retrieve all brand context profiles.

**Response:**
```json
{
  "data": [
    {
      "id": "clxy1234567890",
      "businessName": "Mobile Tech Specialists",
      "industry": "UAV Technology & Mobile Tech Solutions",
      "targetAudience": "Drone enthusiasts...",
      "createdAt": "2025-08-05T02:12:18.050Z"
    }
  ],
  "status": 200,
  "message": "Brand contexts retrieved successfully"
}
```

#### `PUT /api/brand-context`
Update an existing brand context profile.

**Request Body:**
```json
{
  "id": "clxy1234567890",
  "businessName": "Updated Business Name",
  "industry": "Updated Industry",
  // ... other fields
}
```

### Content Generation Endpoints

#### `POST /api/writer`
Generate AI-powered social media content.

**Request Body:**
```json
{
  "topic": "Launch of new UAV spotlight module",
  "tone": "professional",
  "target_audience": "Commercial drone operators",
  "key_message": "Affordable, reliable UAV lighting solutions",
  "call_to_action": "Contact us for pricing",
  "hashtags": "#UAV #DroneModules #Innovation",
  "additional_context": "Focus on commercial applications"
}
```

**Response:**
```json
{
  "content": {
    "twitter": {
      "text": "🚀 Introducing our new UAV spotlight module! Perfect for search & rescue operations. Affordable, reliable, and easy to install. #UAV #DroneModules #Innovation",
      "hashtags": ["#UAV", "#DroneModules", "#Innovation"],
      "engagement_hook": "What UAV applications would benefit from better lighting? 💡",
      "character_count": 156
    },
    "linkedin": {
      "text": "We're excited to announce the launch of our latest UAV spotlight module...",
      "hashtags": ["#Professional", "#UAV", "#Innovation"],
      "engagement_hook": "How do you see this impacting commercial drone operations?",
      "character_count": 289
    },
    // ... other platforms
  },
  "strategy": {
    "target_audience": "Commercial UAV operators and drone service providers",
    "content_pillars": ["Innovation", "Reliability", "Affordability"],
    "posting_schedule": "Optimal times: 9-10 AM, 2-3 PM, 7-8 PM",
    "engagement_tactics": ["Ask questions", "Use polls", "Share case studies"]
  }
}
```

## 🎯 Usage Guide

### Setting Up Brand Context

1. **Navigate to Brand Setup**: Click "Set Up Brand Context" on the homepage
2. **Fill Brand Information**: Complete the comprehensive brand form including:
   - Business name and industry
   - Target audience description
   - Brand voice (professional, casual, etc.)
   - Key products/services
   - Brand values and unique selling points
   - Website and social media handles
3. **Save Context**: Submit the form to store brand information in the database

### Generating Content

1. **Access Content Generator**: Use the social media form on the homepage
2. **Input Content Details**:
   - Topic/subject for the content
   - Desired tone (professional, casual, humorous, inspirational, educational)
   - Target audience (optional - uses brand context if not specified)
   - Key message to convey
   - Call-to-action
   - Relevant hashtags
   - Additional context
3. **Generate Content**: Submit to create AI-powered content for all platforms
4. **Review & Copy**: Review generated content and use copy buttons for easy publishing

### Content Features

- **Character Count Validation**: Real-time character counting with color-coded warnings
- **Platform Optimization**: Content tailored to each platform's style and audience
- **Brand Consistency**: All content reflects your stored brand context
- **Engagement Hooks**: Built-in engagement strategies for each platform
- **Copy-to-Clipboard**: One-click copying for immediate use

## 🗄️ Database Schema

### BrandContext Model
```sql
model BrandContext {
  id                  String   @id @default(cuid())
  businessName        String
  industry            String?
  targetAudience      String?
  brandVoice          String?
  keyProducts         String?
  brandValues         String?
  competitors         String?
  uniqueSellingPoints String?
  brandColors         String?
  brandKeywords       String?
  website             String?
  socialMediaHandles  String?
  additionalContext   String?  @db.Text
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  agentReplies        AgentReply[]
}
```

### AgentReply Model
```sql
model AgentReply {
  id               String        @id @default(cuid())
  agentType        String        // "task" or "writer"
  userPrompt       String
  openaiResponse   String        @db.Text
  processedOutput  String?       @db.Text
  brandContextId   String?
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
  brandContext     BrandContext? @relation(fields: [brandContextId], references: [id])
}
```

## 🔧 Configuration

### OpenAI Configuration
- **Model**: GPT-4o-mini
- **Temperature**: 0.8 (optimized for creative content)
- **Max Tokens**: Dynamic based on platform requirements

### Character Limits Enforcement
The system enforces strict character limits:
- ✅ **Green**: Within safe limits
- ⚠️ **Yellow**: Approaching limit (90%+)
- ❌ **Red**: Exceeds platform limit

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support, email support@mobiletechspecialists.com or open an issue on GitHub.

## 🚀 Deployment

### Production Environment Variables
```env
DATABASE_URL="your-production-database-url"
OPENAI_API_KEY="your-openai-api-key"
NEXTAUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://your-domain.com"
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

**Built with ❤️ by Mobile Tech Specialists**

*Empowering businesses with AI-driven social media content creation*
