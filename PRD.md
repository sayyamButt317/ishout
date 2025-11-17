# Product Requirements Document (PRD)

## iShout - AI-Powered Influencer Marketing Platform

**Version:** 1.0  
**Date:** 2024  
**Status:** Active Development

---

## 1. Executive Summary

### 1.1 Product Overview

iShout is an AI-powered influencer marketing platform that enables brands to create, manage, and scale influencer campaigns at scale. The platform facilitates the entire campaign lifecycle from briefing to reporting, allowing brands to activate thousands of collaborations through one unified platform.

### 1.2 Product Vision

"Activate at Scale, 1,000 collaborations - One AI-powered platform. Where brands build influence with data, speed, and precision."

### 1.3 Target Users

- **Primary Users:** Companies/Brands seeking influencer marketing partnerships
- **Secondary Users:** Platform Administrators managing campaigns and influencer matching

---

## 2. Product Goals & Objectives

### 2.1 Business Goals

- Enable brands to create and manage influencer campaigns efficiently
- Automate influencer matching using AI algorithms
- Scale influencer collaborations to thousands per campaign
- Provide comprehensive campaign analytics and reporting

### 2.2 User Goals

- **Companies:** Create targeted campaigns, find relevant influencers, manage partnerships, track performance
- **Admins:** Review campaigns, generate influencer matches, approve/reject campaigns, monitor platform activity

---

## 3. User Personas

### 3.1 Company User (Brand/Client)

- **Role:** Marketing Manager, Brand Manager, Campaign Manager
- **Needs:**
  - Quick campaign setup
  - Targeted influencer discovery
  - Campaign performance tracking
  - Easy approval workflows
- **Pain Points:** Manual influencer research, time-consuming campaign setup, lack of data-driven insights

### 3.2 Admin User

- **Role:** Platform Administrator
- **Needs:**
  - Review and approve campaigns
  - Generate AI-powered influencer matches
  - Monitor campaign status
  - Manage platform operations
- **Pain Points:** Manual campaign review, inefficient matching processes

---

## 4. Core Features & Functionality

### 4.1 Authentication & Authorization

#### 4.1.1 User Registration

- **Description:** Companies can register with company email
- **Requirements:**
  - Email validation
  - Password requirements
  - Company information collection
  - Role assignment (company)
- **User Flow:** Landing Page → Register → Email Verification → Login

#### 4.1.2 User Login

- **Description:** Secure authentication for companies and admins
- **Requirements:**
  - Email/password authentication
  - Role-based access control (company/admin)
  - Session management via cookies (access_token, role)
  - Password visibility toggle
  - "Forgot password" functionality
- **User Flow:** Landing Page → Login → Dashboard (role-based redirect)

#### 4.1.3 Role-Based Access Control

- **Admin Role:**
  - Access to `/admin/*` routes
  - Campaign management
  - Influencer generation
  - Status updates
- **Company Role:**
  - Access to `/client/*` routes
  - Campaign creation
  - Campaign tracking
  - Influencer approval

### 4.2 Campaign Creation

#### 4.2.1 Campaign Type Selection

- **Description:** Users choose between two campaign creation methods
- **Options:**
  1. **Ready-made Templates**
     - Quick setup with presets
     - Pre-configured for categories (skin, fashion, fitness, health)
     - Fast follower range, country, and budget selection
  2. **Guided Questions**
     - Detailed questionnaire flow
     - Comprehensive campaign configuration
     - Customized influencer matching

#### 4.2.2 Ready-Made Campaign Flow

- **Steps:**
  1. **Platform Selection**
     - Multi-select platform options (Instagram, TikTok, YouTube, Pinterest, etc.)
  2. **Campaign Category**
     - Select from predefined categories (Fashion, Beauty, Skin Care, Food, Travel, Lifestyle, Technology, Sports, Music, Gaming, Education, Health, Finance, Real Estate, Automotive, Pets, Fitness, Art, Photography, Movies, Parenting, Environment, Politics, Science, History)
  3. **Influencer Follower Range**
     - Select desired follower count range
  4. **Country Selection**
     - Target geographic regions
  5. **Number of Influencers**
     - Specify quantity needed
  6. **Summary & Submission**
     - Review campaign details
     - Submit for admin review

#### 4.2.3 Guided Questions Campaign Flow

- **Question Categories:**
  1. **Campaign Goals**
     - Primary objective selection (brand awareness, conversions, engagement, etc.)
  2. **Industry**
     - Industry classification
  3. **Target Market**
     - Geographic targeting
  4. **Target Demographics**
     - Audience characteristics
  5. **Platforms**
     - Multi-platform selection
  6. **Campaign Dates**
     - Start and end date selection
  7. **Budget Range**
     - Budget allocation
  8. **Influencer Requirements**
     - Number of influencers
     - Influencer tier (micro, macro, mega)
     - Follower range
  9. **Content Requirements**
     - Content type (posts, stories, reels, videos)
     - Number of content pieces
     - Key messaging
     - Hashtags
  10. **Brand Guidelines**
      - Brand messaging
      - Restrictions
      - Usage rights
  11. **Competitor Analysis**
      - Competitor information
  12. **Nationalities**
      - Influencer nationality preferences

### 4.3 Admin Dashboard

#### 4.3.1 Pending Campaigns

- **Description:** View and manage campaigns awaiting review
- **Features:**
  - Campaign listing table
  - Campaign details (ID, name, platform, requested count, status, created date)
  - Status management (dropdown for status updates)
  - Generate influencers button
  - Pagination support
- **Actions:**
  - View campaign details
  - Generate AI-matched influencers
  - Update campaign status
  - Export campaign data

#### 4.3.2 Campaign Details View

- **Description:** Detailed view of individual campaign
- **Features:**
  - Full campaign information
  - Generated influencers list
  - Approval/rejection actions
  - Influencer filtering and search

#### 4.3.3 All Campaigns

- **Description:** Comprehensive view of all campaigns
- **Features:**
  - Filter by status (pending, approved, rejected, active, completed)
  - Search functionality
  - Export capabilities
  - Campaign analytics

#### 4.3.4 Approved Campaigns

- **Description:** View approved and active campaigns
- **Features:**
  - Campaign monitoring
  - Performance tracking
  - Status updates

#### 4.3.5 Messages

- **Description:** Communication hub for campaign-related messages
- **Features:**
  - Message threads
  - Notifications
  - Campaign-specific conversations

### 4.4 Client Dashboard

#### 4.4.1 Campaign Management

- **Description:** Company users manage their campaigns
- **Features:**
  - Create new campaigns
  - View campaign status
  - Track campaign progress
  - View matched influencers

#### 4.4.2 Approved Campaigns

- **Description:** View approved campaigns and matched influencers
- **Features:**
  - Influencer cards with details
  - Approval/rejection of influencers
  - Campaign performance metrics

#### 4.4.3 Dashboard Home

- **Description:** Overview of campaign activity
- **Features:**
  - Campaign statistics
  - Recent activity
  - Quick actions

### 4.5 AI-Powered Influencer Matching

#### 4.5.1 Matching Algorithm

- **Description:** AI algorithm matches influencers based on campaign criteria
- **Input Parameters:**
  - Campaign category/industry
  - Platform preferences
  - Follower range
  - Geographic location
  - Content type
  - Budget constraints
  - Demographics
- **Output:**
  - Ranked list of matched influencers
  - Match score/relevance
  - Influencer profile details

#### 4.5.2 Influencer Generation

- **Description:** Admin-triggered influencer matching process
- **Workflow:**
  1. Admin reviews campaign
  2. Clicks "Generate" button
  3. System processes campaign criteria
  4. AI algorithm matches influencers
  5. Results displayed in campaign details
  6. Admin/Client reviews and approves

### 4.6 Influencer Management

#### 4.6.1 Influencer Cards

- **Description:** Visual representation of matched influencers
- **Information Displayed:**
  - Profile image
  - Username/handle
  - Platform badges
  - Follower count
  - Engagement metrics
  - Content samples
  - Match score

#### 4.6.2 Influencer Approval Workflow

- **Description:** Multi-step approval process
- **Steps:**
  1. AI generates influencer matches
  2. Admin reviews and approves campaign
  3. Influencers sent to client for review
  4. Client approves/rejects individual influencers
  5. Approved influencers added to campaign
  6. Campaign status updated

### 4.7 Campaign Workflow

#### 4.7.1 Campaign Lifecycle

1. **Briefing** - Define campaign goals, audience, and deliverables
2. **AI Matching** - Algorithm identifies relevant influencers
3. **Approval** - Review and confirm partnerships
4. **Campaign Launch** - Manage workflows, track deliverables, monitor performance
5. **Reporting** - Comprehensive analytics and insights

#### 4.7.2 Campaign Statuses

- **Pending** - Awaiting admin review
- **Approved** - Admin approved, influencers generated
- **Rejected** - Campaign rejected
- **Active** - Campaign in progress
- **Completed** - Campaign finished

### 4.8 Reporting & Analytics

#### 4.8.1 Campaign Performance

- **Metrics:**
  - Reach and impressions
  - Engagement rates
  - Content performance
  - Influencer performance
  - ROI metrics

#### 4.8.2 Export Functionality

- **Description:** Export campaign data and reports
- **Formats:**
  - Excel/CSV export
  - PDF reports
  - Data visualization

---

## 5. Technical Requirements

### 5.1 Technology Stack

- **Frontend Framework:** Next.js 15.3.2 (React 19)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.14
- **UI Components:** Radix UI, shadcn/ui
- **State Management:** Zustand, React Query (TanStack Query)
- **Form Handling:** React Hook Form, Zod validation
- **HTTP Client:** Axios
- **Icons:** Lucide React, Tabler Icons, React Icons

### 5.2 Architecture

- **App Router:** Next.js App Router architecture
- **Route Groups:** Organized by user type (Admin, Client, Campaign)
- **Middleware:** Authentication and authorization middleware
- **API Routes:** Proxy to backend API via rewrites

### 5.3 Key Technical Features

- Server-side rendering (SSR)
- Client-side rendering for interactive components
- Dynamic imports for code splitting
- Image optimization
- Cookie-based authentication
- Role-based route protection

### 5.4 Data Flow

1. Client creates campaign → Frontend validation → API call
2. Admin reviews → Status update → Influencer generation trigger
3. AI matching → Results stored → Displayed to admin/client
4. Approval workflow → Status updates → Campaign activation

---

## 6. User Experience Requirements

### 6.1 Design Principles

- Modern, clean interface
- Responsive design (mobile, tablet, desktop)
- Intuitive navigation
- Fast load times
- Clear visual feedback
- Accessible components

### 6.2 Key User Flows

#### 6.2.1 Company User Flow

1. Landing page → Register/Login
2. Dashboard → Create Campaign
3. Choose campaign type (Ready-made/Guided)
4. Fill campaign details
5. Submit for review
6. View matched influencers
7. Approve/reject influencers
8. Monitor campaign performance
9. View reports

#### 6.2.2 Admin User Flow

1. Login → Admin Dashboard
2. View pending campaigns
3. Review campaign details
4. Generate influencers
5. Approve/reject campaign
6. Monitor all campaigns
7. Manage messages

### 6.3 Responsive Design

- **Mobile:** Optimized for mobile devices
- **Tablet:** Tablet-friendly layouts
- **Desktop:** Full-featured desktop experience

---

## 7. Non-Functional Requirements

### 7.1 Performance

- Page load time < 3 seconds
- Smooth interactions and animations
- Efficient data fetching and caching
- Optimized image loading

### 7.2 Security

- Secure authentication
- Role-based access control
- Input validation and sanitization
- HTTPS enforcement
- Secure cookie handling

### 7.3 Scalability

- Support for thousands of campaigns
- Efficient influencer matching algorithm
- Optimized database queries
- Caching strategies

### 7.4 Usability

- Intuitive user interface
- Clear error messages
- Loading states and feedback
- Helpful tooltips and guidance

---

## 8. Integration Requirements

### 8.1 Backend API

- RESTful API integration
- Environment-based API URL configuration
- Error handling and retry logic
- Authentication token management

### 8.2 External Services

- Social media platform APIs (for influencer data)
- Image hosting and optimization
- Analytics services

---

## 9. Success Metrics

### 9.1 User Engagement

- Number of campaigns created
- Campaign completion rate
- User retention rate
- Time to create campaign

### 9.2 Platform Performance

- Influencer match accuracy
- Campaign approval rate
- Average time to match influencers
- System uptime

### 9.3 Business Metrics

- Number of active campaigns
- Influencer collaboration count
- Platform revenue (if applicable)
- User satisfaction score

---

## 10. Future Enhancements

### 10.1 Planned Features

- Advanced analytics dashboard
- Influencer relationship management (CRM)
- Automated campaign optimization
- Multi-language support
- Mobile applications
- Real-time notifications
- Advanced filtering and search
- Campaign templates marketplace
- Influencer performance scoring
- Automated reporting generation

### 10.2 Potential Integrations

- Social media management tools
- Marketing automation platforms
- Analytics platforms
- Payment processing
- Email marketing tools

---

## 11. Assumptions & Constraints

### 11.1 Assumptions

- Users have basic understanding of influencer marketing
- Backend API is available and functional
- AI matching algorithm is implemented and optimized
- Influencer data is available and up-to-date

### 11.2 Constraints

- Dependent on backend API availability
- Limited by social media platform API restrictions
- Performance depends on data volume
- Browser compatibility requirements

---

## 12. Glossary

- **Campaign:** A marketing initiative involving influencer collaborations
- **Influencer:** Social media content creator with engaged audience
- **Match Score:** AI-calculated relevance score for influencer-campaign fit
- **Platform:** Social media platform (Instagram, TikTok, YouTube, etc.)
- **Follower Range:** Categorization of influencers by follower count
- **Content Type:** Type of content required (post, story, reel, video)
- **Campaign Status:** Current state of campaign (pending, approved, active, completed)

---

## 13. Appendix

### 13.1 File Structure

src/
├── app/                    # Next.js app router pages
│   ├── Admin/             # Admin dashboard routes
│   ├── client/            # Client dashboard routes
│   ├── (campaign)/        # Campaign creation routes
│   ├── auth/              # Authentication routes
│   └── component/         # Reusable components
├── routes/                # API route handlers
├── store/                 # State management (Zustand)
├── types/                 # TypeScript type definitions
├── validators/            # Form validation schemas
└── constant/              # Constants and static data

### 13.2 Key Components

- Campaign creation forms
- Influencer cards
- Data tables
- Status badges
- Platform badges
- Export functionality
- Authentication forms

---

**Document Owner:** Product Team  
**Last Updated:** 2024  
**Next Review:** Quarterly
