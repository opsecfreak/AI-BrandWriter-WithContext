# AI Social Media Content Studio

> **AI-powered social media content generation platform with brand context awareness**

A comprehensive Next.js application that leverages OpenAI's GPT-4o-mini to generate platform-optimized social media content across multiple platforms, with intelligent brand context integration and character limit compliance.

## 🚀 Features

### Core Functionality
- **Multi-Platform Content Generation**: Create optimized content for 7 social media platforms
- **Brand Context Memory**: Store and utilize business information for consistent, brand-aware content
- **Historical Content Management**: Access and manage all previous content generations through an organized sidebar
- **Character Limit Compliance**: Strict adherence to platform-specific character limits
- **Real-time Copy-to-Clipboard**: One-click copying for easy content publishing
- **AI-Powered Strategy**: Generate content strategies and engagement tactics
- **Content History Tracking**: Organize and reference past content generations by brand

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
> AI-powered, brand-aware multi‑platform content generation with historical insight & selective platform targeting.
- **Styling**: Tailwind CSS
This application lets you generate optimized social media content for selected platforms using stored Brand Context profiles. Every generation is persisted, organized by brand, and instantly referenceable in a fixed left history sidebar. Users must choose a brand and at least one platform— preventing unscoped, wasteful generations and reducing token usage.
- **Database Provider**: Prisma Accelerate

## 📋 Prerequisites

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


# Next.js Configuration
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup
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

## 🏢 Brand Context Management

The Brand Context system allows you to store comprehensive business information that the AI uses to generate consistent, brand-aware content across all platforms.

### Features
- **Persistent Brand Storage**: Save multiple brand profiles in the database
- **Automatic Context Integration**: AI automatically uses brand context for all content generation
- **Brand-Specific Content**: Each piece of content reflects your unique brand voice and values
- **Multiple Brand Support**: Manage multiple brands or clients from a single interface

### Brand Information Fields
- **Business Name**: Your company or brand name
- **Industry**: Business sector and specialization
- **Target Audience**: Detailed description of your ideal customers
- **Brand Voice**: Communication style (professional, casual, humorous, etc.)
- **Brand Values**: Core principles and mission
- **Unique Selling Points**: What sets you apart from competitors
- **Website & Social Media**: Online presence information
- **Additional Context**: Custom brand guidelines and specific requirements

4. **Consistency**: Every piece of content maintains your brand voice and messaging

### Key Features
- **Always Accessible**: Fixed left sidebar that's always visible for easy access
- **Detailed Content Viewing**: Click any generation to view full content in a modal
- **Real-time Updates**: Automatically refreshes when new content is generated

### Sidebar Navigation
- **Brand Headers**: Each brand displays name, industry, and generation count
- **Generation Cards**: Show topic, tone, timestamp, and quick actions
- **Generation Metadata**: Topic, tone, target audience, key message, and creation date
- **Original Prompt**: The exact input used to generate the content
### Use Cases
- **Content Reference**: Review past successful content for inspiration
- **Brand Consistency**: Ensure new content aligns with previous messaging
- **Content Repurposing**: Adapt previous content for new campaigns
- **Performance Tracking**: Identify which topics and tones work best
- **Client Management**: Maintain separate histories for multiple brands/clients


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
  "website": "https://mobiletechspecialists.com",
  "additionalContext": "Additional brand information..."
**Response:**
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

Retrieve all brand context profiles.

**Response:**
```json
{
  "data": [
    {
      "id": "clxy1234567890",
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
  // ... other fields
}
```

### Social Media History Endpoints

#### `GET /api/social-media-history`
Retrieve all social media content generations organized by brand.
**Response:**
```json
{
  "data": [
    {
      "brandName": "Mobile Tech Specialists",
      "brandId": "clxy1234567890",
      "industry": "UAV Technology & Mobile Tech Solutions",
      "generations": [
          "tone": "professional",
          "targetAudience": "Commercial drone operators",
              "linkedin": { /* full content object */ },
            },
            "strategy": { /* strategy object */ }
          }
        }
      ]
    }
  "status": 200,
  "message": "Social media history retrieved successfully"
}

#### `DELETE /api/social-media-history?id={generationId}`
Delete a specific content generation from history.
**Parameters:**
- `id` (query): The ID of the generation to delete

**Response:**
```json
{
  "status": 200,
  "message": "Generation deleted successfully"
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

1. **Navigate to Brand Setup**: Click "Setup Brand Context" on the homepage
2. **Fill Brand Information**: Complete the comprehensive brand form including:
   - Business name and industry
   - Target audience description
   - Brand voice (professional, casual, etc.)
   - Key products/services
   - Brand values and unique selling points
   - Website and social media handles
3. **Save Context**: Submit the form to store brand information in the database
4. **Verification**: See the "Using stored brand context" indicator when active

### Generating Content

1. **Access Content Generator**: Use the social media form on the main content area
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
5. **Automatic History**: Content is automatically saved to the sidebar history

### Using the Content History Sidebar

The left sidebar provides comprehensive access to all your previous content generations:

#### Navigation Features
- **Always Visible**: Fixed sidebar that's always accessible
- **Brand Organization**: Content grouped by brand with generation counts
- **Quick Preview**: See topic, tone, and creation date at a glance
- **Expand/Collapse**: Click brand headers to show/hide generations

#### Viewing Historical Content
1. **Browse Brands**: Expand brand sections to see all generations
2. **Quick Preview**: Hover over generations to see basic information
3. **Detailed View**: Click any generation to open the full content modal
4. **Copy Content**: Use copy buttons in the modal for any platform

#### Managing Content History
- **Delete Generations**: Use the trash icon to remove unwanted content
- **Refresh History**: Click "🔄 Refresh History" to update the list
- **Organize by Brand**: Content automatically groups by the brand context used

### Content Features

- **Character Count Validation**: Real-time character counting with color-coded warnings
- **Platform Optimization**: Content tailored to each platform's style and audience
- **Brand Consistency**: All content reflects your stored brand context
- **Engagement Hooks**: Built-in engagement strategies for each platform
- **Copy-to-Clipboard**: One-click copying for immediate use
- **Historical Reference**: Easy access to all previous generations for inspiration

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
  
  // Social Media Specific Fields
  topic            String?       // Content topic
  tone             String?       // Content tone (professional, casual, etc.)
  targetAudience   String?       // Target audience description
  keyMessage       String?       // Main message to convey
  callToAction     String?       // Call-to-action text
  hashtags         String?       // Relevant hashtags
  additionalContext String?      // Additional context provided
  
  createdAt        DateTime      @default(now())
  updatedAt        DateTime      @updatedAt
  brandContext     BrandContext? @relation(fields: [brandContextId], references: [id])
}
```

### Key Schema Features
- **Brand Context Relationship**: Each content generation links to a brand context
- **Social Media Metadata**: Stores all input parameters for content generation
- **Flexible Content Storage**: Supports both structured and raw content formats
- **Timestamp Tracking**: Automatic creation and update timestamps
- **Optional Fields**: Most social media fields are optional for flexibility

## 🔧 Configuration

### Application Architecture

The AI Social Media Studio follows a comprehensive workflow that integrates brand context, content generation, and history management:

#### Content Generation Workflow
1. **Brand Setup**: Store comprehensive brand information in PostgreSQL
2. **Content Input**: User provides topic, tone, and additional context
3. **AI Processing**: OpenAI GPT-4o-mini generates platform-optimized content using brand context
4. **Content Display**: Generated content shown with character counts and copy buttons
5. **History Storage**: All generations automatically saved with metadata
6. **Sidebar Organization**: Content organized by brand in the left sidebar

#### Data Flow
```
User Input → Brand Context Integration → AI Generation → Database Storage → Sidebar Display
```

#### Key Components
- **Brand Context System**: Persistent storage and automatic integration
- **Content Generator**: AI-powered multi-platform content creation
- **History Manager**: Organized storage and retrieval of past generations
- **Sidebar Navigation**: Always-accessible content history browser
- **Modal Viewer**: Detailed examination of historical content

### OpenAI Configuration
- **Model**: GPT-4o-mini
- **Temperature**: 0.8 (optimized for creative content)
- **Max Tokens**: Dynamic based on platform requirements
- **Context Integration**: Automatic brand context inclusion in prompts

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
