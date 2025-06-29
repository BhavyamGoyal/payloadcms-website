# Marketing Website with Payload CMS & Next.js

A modern, SEO-friendly marketing website built with Payload CMS 3 and Next.js 15 (App Router), featuring live preview, dark/light theme support, and serverless deployment.

## 🚀 Features

- **CMS**: Payload CMS 3 with MongoDB and AWS S3 integration
- **Frontend**: Next.js 15 with App Router and React 19
- **Styling**: Tailwind CSS with dark/light theme support
- **Animations**: Framer Motion with scroll-based animations
- **Live Preview**: Real-time content preview with role-based authentication
- **Media Storage**: AWS S3 for scalable asset management
- **SEO Optimized**: Dynamic meta tags, Open Graph, JSON-LD, sitemap
- **Performance**: Optimized images, minimal dependencies, excellent Lighthouse scores

## 📦 Project Structure

```
├── apps/
│   ├── admin/          # Payload CMS admin panel
│   └── web/           # Next.js frontend
├── payload.config.ts  # Global CMS config
├── s3.config.ts      # AWS S3 configuration
└── package.json      # Workspace configuration
```

## 🛠 Tech Stack

- **CMS**: Payload CMS 3
- **Frontend**: Next.js 15 + React 19
- **Database**: MongoDB
- **Storage**: AWS S3
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Authentication**: Payload JWT + Role-based access
- **Deployment**: Serverless ready

## 🏗 Content Architecture

### Collections
- **Users**: Admin, Editor, Previewer roles
- **Media**: S3-hosted images with multiple sizes
- **Pages**: Dynamic pages with block-based content

### Globals
- **Navigation**: Header/footer navigation and social links
- **Settings**: Site configuration, SEO defaults, contact info

### Page Blocks
- **Hero**: Full-screen hero with CTA
- **Features**: Feature grid with icons/images
- **Call to Action**: Promotional sections
- **Testimonials**: Customer testimonials
- **Pricing**: Pricing tables with features
- **FAQ**: Collapsible FAQ sections

## 📋 Setup Instructions

### Prerequisites
- Node.js 20+
- MongoDB database
- AWS S3 bucket

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` and configure:

```env
# Database
DATABASE_URI=mongodb://localhost:27017/payload-marketing

# Payload
PAYLOAD_SECRET=your-secret-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AWS S3
S3_BUCKET=your-bucket-name
S3_REGION=us-east-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key

# Next.js
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
```

### 3. Development
```bash
# Start both apps in development
npm run dev

# Or start individually
cd apps/admin && npm run dev  # Admin panel on :3001
cd apps/web && npm run dev    # Frontend on :3000
```

### 4. Production Build
```bash
npm run build
npm run start
```

## 🎨 Design System

### Components
- **Layout**: Header, Footer with responsive navigation
- **Blocks**: Reusable content blocks for page building
- **UI**: Button, ScrollReveal, AnimatedCounter, ParallaxSection
- **Providers**: Theme and Preview providers

### Styling
- Tailwind CSS with custom design tokens
- Dark/light theme support with `next-themes`
- Responsive design with mobile-first approach
- Custom animations and transitions

## 🔐 Authentication & Roles

### User Roles
- **Admin**: Full access to all content and settings
- **Editor**: Content creation and editing
- **Previewer**: Preview access only

### Live Preview
- JWT-based authentication
- Role-based access control
- Real-time draft content preview
- Secure preview URLs with token validation

## 🚀 Deployment

### Serverless Deployment
The application is designed for serverless deployment:

- **Frontend**: Deploy to Vercel, Netlify, or similar
- **Admin Panel**: Can be deployed alongside or separately
- **Database**: MongoDB Atlas recommended
- **Storage**: AWS S3 for media files

### Environment Variables
Ensure all environment variables are properly configured in your deployment platform.

## 📈 Performance & SEO

### SEO Features
- Dynamic meta tags and Open Graph images
- Structured data with JSON-LD
- Automatic sitemap generation
- Robots.txt configuration
- Canonical URLs

### Performance Optimizations
- Next.js Image optimization
- Lazy loading and code splitting
- Minimal bundle size
- Optimized Tailwind CSS
- Efficient MongoDB queries

## 🎯 Content Management

### Admin Panel Access
- Access the admin panel at `/admin`
- Create content using the block-based editor
- Upload media to S3 automatically
- Preview content in real-time

### Block-Based Content
- Drag-and-drop content blocks
- Reusable components
- Flexible layout system
- Rich media support

## 🧪 Development Notes

### Key Dependencies
- `payload@^3.0.0` - CMS framework
- `next@^15.1.0` - React framework
- `react@^19.0.0` - UI library
- `framer-motion@^11.11.17` - Animations
- `@aws-sdk/client-s3@^3.700.0` - S3 integration

### Project Conventions
- TypeScript throughout
- ESLint configuration
- Consistent component structure
- Modular architecture

---

Built with ❤️ using Payload CMS and Next.js