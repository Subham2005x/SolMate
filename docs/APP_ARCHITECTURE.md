# Solmate - Website to App Transition Architecture

## 🏗️ System Architecture Overview

### Domain Structure (Recommended)

```
Production URLs:
├── solmate.app/                    → Public website (marketing)
├── solmate.app/login              → Auth pages (public)
├── solmate.app/signup             → Auth pages (public)
└── app.solmate.app/               → Product application (authenticated)
    ├── /dashboard
    ├── /trips
    ├── /trips/:id
    └── /settings
```

**Alternative (Single Domain):**
```
solmate.app/                        → Public website
solmate.app/login                   → Auth
solmate.app/signup                  → Auth
solmate.app/app/                    → Product (authenticated)
    ├── /app/dashboard
    ├── /app/trips
    └── /app/settings
```

---

## 🚪 Entry Points: Website → App

### 1. Primary CTAs (High Intent)

**Location:** Every page  
**Button:** "Join Waitlist" (Pre-launch) → "Get Started" (Post-launch)

```jsx
// Pre-launch
<Link to="/waitlist">Join Waitlist</Link>

// Post-launch
<Link to="/signup">Get Started</Link>
```

---

### 2. Navigation Header

**Desktop:**
```
[Logo] Features | How It Works | About | [Login] [Get Started]
```

**Mobile:**
```
[Logo] [Menu]
  ├── Features
  ├── How It Works
  ├── About
  ├── Login
  └── Get Started
```

---

### 3. Hero CTAs

**Home Page:**
- Primary: "Get Started" → `/signup`
- Secondary: "See How It Works" → `/how-it-works`

**Features Page:**
- Primary: "Try Solmate" → `/signup`
- Secondary: "View Pricing" → `/pricing` (future)

**How It Works Page:**
- Primary: "Create Your First Trip" → `/signup`

**About Page:**
- Primary: "Join Solmate" → `/signup`

**Waitlist Success:**
- Primary: "Login" → `/login` (for returning users)

---

### 4. Deep Links (Post-Auth)

**Trip Invitations:**
```
solmate.app/join/abc123xyz  → Redirects to app after auth
```

**Email Links:**
```
solmate.app/verify-email?token=...
solmate.app/reset-password?token=...
```

---

## 🔐 Authentication Flow

### User States

```
1. Anonymous (first visit)
   └─> Can browse website, see features
   
2. Unauthenticated (visited before, no session)
   └─> Can login or signup
   
3. Authenticated (active session)
   └─> Redirected to app automatically
   
4. Invited (has trip invitation link)
   └─> Prompted to signup/login, then joins trip
```

---

### Signup Flow

**Step 1: Choose Method**
```
┌─────────────────────────────┐
│   Create Your Account       │
├─────────────────────────────┤
│                             │
│  [Continue with Google]     │
│  [Continue with Email]      │
│                             │
│  Already have an account?   │
│  [Login]                    │
└─────────────────────────────┘
```

**Step 2: Email Signup (if chosen)**
```
┌─────────────────────────────┐
│   Sign Up with Email        │
├─────────────────────────────┤
│  Name: [_____________]      │
│  Email: [_____________]     │
│  Password: [_____________]  │
│                             │
│  [Create Account]           │
│                             │
│  By signing up, you agree   │
│  to our Terms & Privacy     │
└─────────────────────────────┘
```

**Step 3: Email Verification**
```
┌─────────────────────────────┐
│   Verify Your Email         │
├─────────────────────────────┤
│  We sent a link to:         │
│  user@example.com           │
│                             │
│  Click the link to verify   │
│  your account               │
│                             │
│  [Resend Email]             │
└─────────────────────────────┘
```

**Step 4: Onboarding (In App)**
```
┌─────────────────────────────┐
│   Welcome to Solmate!       │
├─────────────────────────────┤
│  Let's set up your profile  │
│                             │
│  [Add Profile Photo]        │
│  About: [_____________]     │
│  Location: [_____________]  │
│                             │
│  [Skip]        [Continue]   │
└─────────────────────────────┘
```

---

### Login Flow

**Step 1: Login Method**
```
┌─────────────────────────────┐
│   Welcome Back              │
├─────────────────────────────┤
│                             │
│  [Continue with Google]     │
│  [Continue with Email]      │
│                             │
│  Don't have an account?     │
│  [Sign Up]                  │
└─────────────────────────────┘
```

**Step 2: Email Login (if chosen)**
```
┌─────────────────────────────┐
│   Login to Solmate          │
├─────────────────────────────┤
│  Email: [_____________]     │
│  Password: [_____________]  │
│                             │
│  [Remember me]              │
│                             │
│  [Login]                    │
│                             │
│  [Forgot Password?]         │
└─────────────────────────────┘
```

**Step 3: Redirect to App**
```
Authenticated → app.solmate.app/dashboard
or
solmate.app/app/dashboard
```

---

### Password Reset Flow

**Step 1: Request Reset**
```
/forgot-password

┌─────────────────────────────┐
│   Reset Your Password       │
├─────────────────────────────┤
│  Enter your email address   │
│                             │
│  Email: [_____________]     │
│                             │
│  [Send Reset Link]          │
│                             │
│  [Back to Login]            │
└─────────────────────────────┘
```

**Step 2: Check Email**
```
┌─────────────────────────────┐
│   Check Your Email          │
├─────────────────────────────┐
│  We sent a reset link to:   │
│  user@example.com           │
│                             │
│  Click the link to reset    │
│  your password              │
└─────────────────────────────┘
```

**Step 3: Reset Password**
```
/reset-password?token=xyz

┌─────────────────────────────┐
│   Create New Password       │
├─────────────────────────────┤
│  New Password:              │
│  [_____________]            │
│                             │
│  Confirm Password:          │
│  [_____________]            │
│                             │
│  [Reset Password]           │
└─────────────────────────────┘
```

---

## 📂 Project Structure

### Folder Organization

```
src/
├── main.jsx                    # App entry point
├── App.jsx                     # Root routing
│
├── pages/                      # PUBLIC WEBSITE PAGES
│   ├── Home.jsx
│   ├── Features.jsx
│   ├── HowItWorks.jsx
│   ├── About.jsx
│   └── Waitlist.jsx
│
├── auth/                       # AUTHENTICATION PAGES
│   ├── Login.jsx               # /login
│   ├── Signup.jsx              # /signup
│   ├── ForgotPassword.jsx      # /forgot-password
│   ├── ResetPassword.jsx       # /reset-password
│   ├── VerifyEmail.jsx         # /verify-email
│   └── components/
│       ├── AuthLayout.jsx      # Auth page wrapper
│       ├── SocialAuth.jsx      # Google OAuth buttons
│       └── AuthForm.jsx        # Reusable form fields
│
├── app/                        # PRODUCT APPLICATION
│   ├── AppRoot.jsx             # App routing wrapper
│   ├── Dashboard.jsx           # /app/dashboard
│   ├── Trips/
│   │   ├── TripsList.jsx       # /app/trips
│   │   ├── TripDetail.jsx      # /app/trips/:id
│   │   ├── CreateTrip.jsx      # /app/trips/new
│   │   └── TripSettings.jsx    # /app/trips/:id/settings
│   ├── Profile/
│   │   ├── ProfileView.jsx     # /app/profile
│   │   └── ProfileEdit.jsx     # /app/profile/edit
│   ├── Settings/
│   │   ├── Settings.jsx        # /app/settings
│   │   ├── Account.jsx         # /app/settings/account
│   │   └── Preferences.jsx     # /app/settings/preferences
│   └── components/
│       ├── AppLayout.jsx       # App chrome (nav, sidebar)
│       ├── AppHeader.jsx       # App header
│       ├── Sidebar.jsx         # App sidebar
│       └── ProtectedRoute.jsx  # Auth guard
│
├── components/                 # SHARED COMPONENTS
│   ├── Layout.jsx              # Website layout
│   ├── Header.jsx              # Website header
│   ├── Footer.jsx              # Website footer
│   └── SEO.jsx                 # SEO helper
│
├── hooks/                      # CUSTOM HOOKS
│   ├── useAuth.js              # Auth state & methods
│   ├── useUser.js              # User data
│   └── useTrips.js             # Trips data
│
├── context/                    # REACT CONTEXT
│   ├── AuthContext.jsx         # Global auth state
│   └── AppContext.jsx          # Global app state
│
├── services/                   # API SERVICES
│   ├── api.js                  # Base API client
│   ├── authService.js          # Auth API calls
│   ├── tripService.js          # Trip API calls
│   └── userService.js          # User API calls
│
├── utils/                      # UTILITIES
│   ├── storage.js              # LocalStorage helpers
│   ├── validation.js           # Form validation
│   └── constants.js            # Constants
│
└── styles/                     # STYLES
    ├── index.css               # Global styles
    └── app.css                 # App-specific styles
```

---

## 🛣️ Routing Strategy

### Root Router (App.jsx)

```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Public Website
import WebsiteLayout from './components/Layout'
import Home from './pages/Home'
import Features from './pages/Features'
import HowItWorks from './pages/HowItWorks'
import About from './pages/About'
import Waitlist from './pages/Waitlist'

// Auth Pages
import Login from './auth/Login'
import Signup from './auth/Signup'
import ForgotPassword from './auth/ForgotPassword'
import ResetPassword from './auth/ResetPassword'
import VerifyEmail from './auth/VerifyEmail'

// Product App
import AppRoot from './app/AppRoot'
import ProtectedRoute from './app/components/ProtectedRoute'

function App() {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <Routes>
      {/* Public Website Routes */}
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/waitlist" element={<Waitlist />} />
      </Route>

      {/* Auth Routes (No layout) */}
      <Route path="/login" element={
        isAuthenticated ? <Navigate to="/app/dashboard" /> : <Login />
      } />
      <Route path="/signup" element={
        isAuthenticated ? <Navigate to="/app/dashboard" /> : <Signup />
      } />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* Protected App Routes */}
      <Route path="/app/*" element={
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      } />

      {/* Public Trip Invitations */}
      <Route path="/join/:inviteCode" element={<JoinTrip />} />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
```

---

### App Router (app/AppRoot.jsx)

```jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/AppLayout'

// Dashboard
import Dashboard from './Dashboard'

// Trips
import TripsList from './Trips/TripsList'
import TripDetail from './Trips/TripDetail'
import CreateTrip from './Trips/CreateTrip'
import TripSettings from './Trips/TripSettings'

// Profile
import ProfileView from './Profile/ProfileView'
import ProfileEdit from './Profile/ProfileEdit'

// Settings
import Settings from './Settings/Settings'
import Account from './Settings/Account'
import Preferences from './Settings/Preferences'

function AppRoot() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/app/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Trips */}
        <Route path="/trips" element={<TripsList />} />
        <Route path="/trips/new" element={<CreateTrip />} />
        <Route path="/trips/:id" element={<TripDetail />} />
        <Route path="/trips/:id/settings" element={<TripSettings />} />
        
        {/* Profile */}
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        
        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/account" element={<Account />} />
        <Route path="/settings/preferences" element={<Preferences />} />
        
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/app/dashboard" />} />
      </Routes>
    </AppLayout>
  )
}
```

---

## 🔒 Protected Route Component

```jsx
// app/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    // Redirect to login, save intended destination
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
```

---

## 🎯 URL Structure (SEO-Safe)

### Public Website (Indexable)

```
✅ solmate.app/                     → Home
✅ solmate.app/features             → Features
✅ solmate.app/how-it-works         → How It Works
✅ solmate.app/about                → About
✅ solmate.app/waitlist             → Waitlist
✅ solmate.app/pricing              → Pricing (future)
✅ solmate.app/blog                 → Blog (future)
✅ solmate.app/blog/post-slug       → Blog post
```

### Auth Pages (No-index)

```
❌ solmate.app/login                → Login
❌ solmate.app/signup               → Signup
❌ solmate.app/forgot-password      → Password reset
❌ solmate.app/reset-password       → Set new password
❌ solmate.app/verify-email         → Email verification
```

**robots.txt:**
```
User-agent: *
Disallow: /login
Disallow: /signup
Disallow: /forgot-password
Disallow: /reset-password
Disallow: /verify-email
Disallow: /app/
```

---

### App Pages (No-index, Authenticated)

```
❌ solmate.app/app/dashboard        → Dashboard
❌ solmate.app/app/trips            → All trips
❌ solmate.app/app/trips/abc123     → Trip detail
❌ solmate.app/app/trips/new        → Create trip
❌ solmate.app/app/profile          → User profile
❌ solmate.app/app/settings         → Settings
```

---

### Public Shareable Links (Indexable with auth)

```
✅ solmate.app/join/xyz123          → Trip invitation (public)
```

These redirect to `/login` or `/signup` if not authenticated, then to the trip.

---

## 🎨 Visual Differentiation

### Website Header (Public)

```
┌─────────────────────────────────────────────────────────┐
│ [Solmate]    Features  How It Works  About  [Login] [Get Started] │
└─────────────────────────────────────────────────────────┘
```

- Transparent or white background
- Marketing-focused navigation
- Clear CTAs (Login, Get Started)

---

### App Header (Authenticated)

```
┌─────────────────────────────────────────────────────────┐
│ [☰] Solmate    [Search...]         [🔔] [👤 John Doe ▾] │
└─────────────────────────────────────────────────────────┘
```

- Hamburger menu (mobile)
- Search bar
- Notifications
- User dropdown (Profile, Settings, Logout)

---

### App Sidebar (Desktop)

```
┌──────────────────┐
│ Dashboard        │
│ My Trips         │
│ Notifications    │
│ Profile          │
│ Settings         │
│ ───────────────  │
│ Help & Support   │
│ Logout           │
└──────────────────┘
```

---

## 🔄 Auth Flow Diagrams

### First-Time User Journey

```
1. Lands on homepage
   └─> Sees "Get Started" CTA

2. Clicks "Get Started"
   └─> Redirected to /signup

3. Chooses signup method
   ├─> Google OAuth → Instant signup → /app/dashboard
   └─> Email signup → Fill form → Verify email → /app/dashboard

4. Completes onboarding
   └─> Creates first trip or explores dashboard
```

---

### Returning User Journey

```
1. Visits solmate.app
   └─> Checks for existing session

2a. Has valid session
   └─> Auto-redirected to /app/dashboard

2b. No session
   └─> Stays on homepage
   └─> Clicks "Login"
   └─> Enters credentials
   └─> Redirected to /app/dashboard
```

---

### Invited User Journey

```
1. Receives email: "Join Sarah's Trip"
   └─> Clicks link: solmate.app/join/abc123

2. Lands on invitation page
   └─> Shows trip preview

3. Prompted to signup/login
   ├─> New user → /signup → Verify → Auto-joins trip
   └─> Existing user → /login → Auto-joins trip

4. Redirected to trip page
   └─> /app/trips/abc123
```

---

## 🛡️ Security Considerations

### Authentication

```
✅ JWT tokens (HttpOnly cookies)
✅ Refresh token rotation
✅ CSRF protection
✅ Rate limiting on auth endpoints
✅ Email verification required
✅ Strong password requirements
✅ OAuth 2.0 for social login
```

---

### Session Management

```javascript
// localStorage or secure cookie
{
  accessToken: "jwt...",      // Short-lived (15 min)
  refreshToken: "jwt...",     // Long-lived (7 days)
  user: {
    id: "user_123",
    name: "John Doe",
    email: "john@example.com",
    avatar: "url..."
  }
}
```

---

### Route Protection

```
1. Check authentication status
2. Verify token validity
3. Refresh if expired (using refresh token)
4. Redirect to /login if invalid
5. Save intended destination (returnTo)
```

---

## 📱 Mobile Considerations

### Responsive Navigation

**Website (Mobile):**
```
[☰] Solmate [Get Started]

Hamburger Menu:
├── Home
├── Features
├── How It Works
├── About
├── ───────────
├── Login
└── Get Started
```

**App (Mobile):**
```
[☰] Solmate [🔔] [👤]

Hamburger Menu:
├── Dashboard
├── My Trips
├── Notifications
├── Profile
├── Settings
├── ───────────
├── Help
└── Logout
```

---

## 🎯 Call-to-Action Strategy

### CTA Placement

**Homepage:**
- Hero: "Get Started" (primary)
- After benefits: "Create Your First Trip"
- Footer: "Join Solmate"

**Features:**
- After each feature: "Try It Now"
- End of page: "Get Started"

**How It Works:**
- After step 4: "Start Planning"

**About:**
- End of page: "Join Our Community"

---

### CTA Copy Evolution

**Pre-Launch:**
- "Join Waitlist"
- "Get Early Access"
- "Be the First to Know"

**Post-Launch:**
- "Get Started"
- "Try Solmate Free"
- "Create Your First Trip"
- "Start Planning"

---

## 🔄 State Management

### Auth Context

```jsx
// context/AuthContext.jsx
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = getToken()
      if (token) {
        const user = await verifyToken(token)
        setUser(user)
        setIsAuthenticated(true)
      }
    } catch (error) {
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email, password) => {
    const { token, user } = await authService.login(email, password)
    setToken(token)
    setUser(user)
    setIsAuthenticated(true)
  }

  const signup = async (name, email, password) => {
    const { token, user } = await authService.signup(name, email, password)
    setToken(token)
    setUser(user)
    setIsAuthenticated(true)
  }

  const logout = () => {
    clearToken()
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      login, 
      signup, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

---

## 📊 Analytics & Tracking

### Key Events to Track

**Website:**
```
- Page views (all pages)
- CTA clicks (Get Started, Login)
- Feature exploration (scrolling, clicks)
- Time on page
- Bounce rate
```

**Auth Flow:**
```
- Signup started
- Signup method chosen (Google/Email)
- Signup completed
- Email verification sent
- Email verified
- Login attempts
- Login success
- Password reset requested
```

**App:**
```
- First login
- Trip created
- Trip member invited
- Trip viewed
- Expense added
- Settings changed
```

---

## 🚀 Launch Strategy

### Phase 1: Pre-Launch (Waitlist)
```
Website: Full marketing site
Auth: Only /waitlist page
App: Not accessible
```

### Phase 2: Beta Launch (Invite-Only)
```
Website: Add /login and /signup
Auth: Email verification required
App: Limited features, invite codes
```

### Phase 3: Public Launch
```
Website: Full site + pricing page
Auth: Open signup (Google + Email)
App: All features available
```

---

## 📋 Implementation Checklist

### Setup
- [ ] Install React Router v6
- [ ] Set up Auth Context
- [ ] Create folder structure (pages, auth, app)
- [ ] Configure environment variables

### Auth Pages
- [ ] Build Login page
- [ ] Build Signup page
- [ ] Build ForgotPassword page
- [ ] Build ResetPassword page
- [ ] Build VerifyEmail page
- [ ] Add social OAuth buttons

### App Structure
- [ ] Create AppLayout component
- [ ] Build AppHeader with user menu
- [ ] Build Sidebar navigation
- [ ] Create ProtectedRoute wrapper
- [ ] Set up app routing

### Backend Integration
- [ ] Connect to auth API
- [ ] Implement token storage
- [ ] Add token refresh logic
- [ ] Set up API interceptors
- [ ] Handle auth errors

### Testing
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Test password reset
- [ ] Test protected routes
- [ ] Test session persistence
- [ ] Test logout

### SEO & Performance
- [ ] Add noindex to auth pages
- [ ] Add noindex to app pages
- [ ] Update robots.txt
- [ ] Test page load speeds
- [ ] Verify proper redirects

---

**Last Updated:** December 14, 2025  
**Status:** Architecture Complete, Ready for Implementation
