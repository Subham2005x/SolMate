# Solmate Group & Community System Design

**Version:** 1.0  
**Last Updated:** December 17, 2025  
**Status:** Production-Ready Architecture

---

## 🎯 SYSTEM OVERVIEW

Solmate implements a **context-aware social system** that adapts based on trip type:
- **Group Trips** → Collaborative planning with roles, chat, and polls
- **Solo Trips** → Community discovery and connection features
- **Dynamic Conversion** → Seamless transition from solo to group mode

---

## 📋 ROLE & PERMISSION SYSTEM

### Role Hierarchy

```
┌─────────────────────────────────────┐
│           TRIP CREATOR              │
│        (Auto Admin on create)       │
└─────────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    ▼                         ▼
┌─────────┐            ┌──────────┐
│  ADMIN  │            │  MEMBER  │
│ (Multi) │            │ (Default)│
└─────────┘            └──────────┘
```

### Permission Matrix

| Action | Creator | Admin | Member | Solo User |
|--------|---------|-------|--------|-----------|
| **TRIP MANAGEMENT** |
| View trip | ✅ | ✅ | ✅ | ✅ |
| Edit trip details | ✅ | ✅ | ❌ | ✅ |
| Delete trip | ✅ | ❌ | ❌ | ✅ |
| Archive trip | ✅ | ✅ | ❌ | ✅ |
| **MEMBER MANAGEMENT** |
| View members | ✅ | ✅ | ✅ | ❌ |
| Add members | ✅ | ✅ | ❌ | ✅ (converts to group) |
| Remove members | ✅ | ✅ | ❌ | ❌ |
| Promote to admin | ✅ | ✅* | ❌ | ❌ |
| Demote admin | ✅ | ✅* | ❌ | ❌ |
| Leave group | ❌ | ✅ | ✅ | ❌ |
| **CONTENT & PLANNING** |
| View itinerary | ✅ | ✅ | ✅ | ✅ |
| Edit itinerary | ✅ | ✅ | ✅** | ✅ |
| View budget | ✅ | ✅ | ✅ | ✅ |
| Add expenses | ✅ | ✅ | ✅ | ✅ |
| Edit others' expenses | ✅ | ✅ | ❌ | ✅ |
| **COMMUNICATION** |
| Send chat messages | ✅ | ✅ | ✅ | ❌ |
| Delete own messages | ✅ | ✅ | ✅ | ❌ |
| Delete any message | ✅ | ✅ | ❌ | ❌ |
| Pin messages | ✅ | ✅ | ❌ | ❌ |
| **POLLS & DECISIONS** |
| Create poll | ✅ | ✅ | ❌ | ❌ |
| Vote on poll | ✅ | ✅ | ✅ | ❌ |
| Close poll | ✅ | ✅ | ❌ | ❌ |
| Delete poll | ✅ | ✅ | ❌ | ❌ |
| **COMMUNITY** |
| Access community | ❌ | ❌ | ❌ | ✅ |
| View other travelers | ❌ | ❌ | ❌ | ✅ |
| Send connection requests | ❌ | ❌ | ❌ | ✅ |
| Block users | ❌ | ❌ | ❌ | ✅ |

*Admins can promote/demote other admins but cannot demote the Creator  
**Members can edit but changes may require admin approval based on settings

### Role Assignment Logic

```javascript
// Trip Creation
const createTrip = (userId, tripData) => {
  return {
    ...tripData,
    creatorId: userId,
    members: [{
      userId: userId,
      role: 'admin',
      isCreator: true,
      joinedAt: new Date(),
      status: 'active'
    }]
  }
}

// Adding Members
const addMember = (tripId, newUserId, invitedBy) => {
  // Check if inviter is admin
  if (!isAdmin(tripId, invitedBy)) {
    throw new Error('Only admins can add members')
  }
  
  return {
    userId: newUserId,
    role: 'member', // Always start as member
    isCreator: false,
    invitedBy: invitedBy,
    joinedAt: new Date(),
    status: 'pending' // Until they accept invite
  }
}

// Promoting to Admin
const promoteToAdmin = (tripId, targetUserId, promoterUserId) => {
  const promoter = getMember(tripId, promoterUserId)
  
  if (!promoter.role === 'admin') {
    throw new Error('Only admins can promote members')
  }
  
  updateMemberRole(tripId, targetUserId, 'admin')
}

// Demoting Admin
const demoteAdmin = (tripId, targetUserId, demoterUserId) => {
  const target = getMember(tripId, targetUserId)
  const demoter = getMember(tripId, demoterUserId)
  
  if (!demoter.role === 'admin') {
    throw new Error('Only admins can demote members')
  }
  
  if (target.isCreator) {
    throw new Error('Cannot demote trip creator')
  }
  
  updateMemberRole(tripId, targetUserId, 'member')
}
```

---

## 🏗️ GROUP SECTION ARCHITECTURE

### Section Structure

```
GROUP WORKSPACE (Group Trips Only)
├── Tab 1: Members & Roles
│   ├── Members List
│   ├── Role Management (Admin only)
│   ├── Invite Members
│   └── Member Activity Log
├── Tab 2: Group Chat
│   ├── Real-time Messages
│   ├── Message Input
│   ├── Typing Indicators
│   ├── Read Receipts
│   └── Pinned Messages
├── Tab 3: Polls & Decisions
│   ├── Active Polls
│   ├── Closed Polls
│   ├── Create Poll (Admin only)
│   └── Poll Results
└── Tab 4: Settings
    ├── Group Privacy
    ├── Member Permissions
    ├── Notification Preferences
    └── Group Photo/Details
```

### 1. Members & Roles Tab

**Layout Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  [👥 Members (4)]          [+ Invite Members] (Admin only) │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 John Doe                              [CREATOR]  │  │
│  │    john@example.com                      [ADMIN]    │  │
│  │    🟢 Active • Joined 2 days ago                    │  │
│  │    ────────────────────────────────────────────     │  │
│  │    📅 5 activities added  💬 23 messages            │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Sarah Smith                    [ADMIN] [⋮ Menu]  │  │
│  │    sarah@example.com                                │  │
│  │    🟢 Active • Joined 1 day ago                     │  │
│  │    ────────────────────────────────────────────     │  │
│  │    📅 3 activities added  💬 15 messages            │  │
│  │                                                      │  │
│  │    Admin Menu (if viewer is admin):                │  │
│  │    • Demote to Member                               │  │
│  │    • Remove from Group                              │  │
│  │    • View Profile                                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Mike Johnson                [MEMBER] [⋮ Menu]    │  │
│  │    mike@example.com                                 │  │
│  │    ⚪ Offline • Last seen 3 hours ago               │  │
│  │    ────────────────────────────────────────────     │  │
│  │    📅 1 activity added  💬 8 messages               │  │
│  │                                                      │  │
│  │    Admin Menu:                                      │  │
│  │    • Promote to Admin                               │  │
│  │    • Remove from Group                              │  │
│  │    • View Profile                                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Emma Wilson                  [PENDING INVITE]    │  │
│  │    emma@example.com                                 │  │
│  │    ⏳ Invited by John • 2 hours ago                 │  │
│  │    [Cancel Invite] (Admin only)                     │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

**Features:**
- **Member Cards**: Avatar, name, email, role badges, status indicator
- **Activity Stats**: Contributions to itinerary, chat, budget
- **Role Badges**: Color-coded (Creator: Gold, Admin: Blue, Member: Green)
- **Admin Controls**: Dropdown menu for role management
- **Invite System**: Email/username invite with pending state
- **Status Tracking**: Online/offline, last seen timestamp
- **Search & Filter**: Find members, filter by role/status

### 2. Group Chat Tab

**Layout Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  💬 Group Chat                            [📌 Pinned (2)]  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  📌 PINNED MESSAGES                                        │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 📍 Trip dates confirmed: March 15-22                │  │
│  │    by John • 2 days ago                             │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ──────────── Today ────────────                          │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Sarah Smith                              10:30 AM   │  │
│  │ Hey everyone! Just booked the hotel 🏨              │  │
│  │                                          ✓✓ Read    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │                                          10:35 AM   │  │
│  │           Great! What about the flight? ✈️  You     │  │
│  │                                          ✓✓ Read    │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Mike Johnson                             10:40 AM   │  │
│  │ I found some good deals, sharing the link:         │  │
│  │ 🔗 flights.com/tokyo-deals                          │  │
│  │                                          ✓ Sent     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  🟢 Sarah is typing...                                    │
│                                                            │
├────────────────────────────────────────────────────────────┤
│  [📎] [😊]  Type your message...            [Send ➤]     │
└────────────────────────────────────────────────────────────┘
```

**Features:**
- **Real-time Messaging**: WebSocket/Firebase integration
- **Message Types**: Text, links, images, files, location
- **Pinned Messages**: Admins can pin important info
- **Typing Indicators**: Show who's typing
- **Read Receipts**: Single check (sent), double check (read)
- **Message Actions**: Reply, react with emoji, copy, delete (own), pin (admin)
- **Date Separators**: Group messages by day
- **Link Previews**: Auto-generate preview cards for URLs
- **Attachments**: Send images, PDFs, location pins
- **Search**: Find specific messages

### 3. Polls & Decisions Tab

**Layout Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  📊 Polls & Decisions              [+ Create Poll] (Admin) │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ACTIVE POLLS (2)                                         │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 📅 Which dates work best for everyone?              │  │
│  │    by John • Ends in 2 days                         │  │
│  │                                                      │  │
│  │    ○ March 15-22                      ████████ 3    │  │
│  │    ○ March 20-27                      ████ 1        │  │
│  │    ○ April 1-8                        (not voted)   │  │
│  │                                                      │  │
│  │    👥 3 of 4 members voted                          │  │
│  │    [Vote] [View Results]              [Close Poll]  │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 💰 Budget per person?                                │  │
│  │    by Sarah • Ends in 5 days                        │  │
│  │                                                      │  │
│  │    ☑ $500-$1000                       ██████ 2      │  │
│  │    ○ $1000-$1500                      ███ 1         │  │
│  │    ○ $1500-$2000                      (not voted)   │  │
│  │    ○ $2000+                           (not voted)   │  │
│  │                                                      │  │
│  │    ✅ You voted                                      │  │
│  │    [Change Vote] [View Results]                     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  CLOSED POLLS (3)                                         │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 🎯 Top 3 activities to do?                          │  │
│  │    by John • Closed 3 days ago                      │  │
│  │                                                      │  │
│  │    ✓ Visit Tokyo Tower           ████████████ 4/4   │  │
│  │    ✓ Senso-ji Temple              ██████████ 3/4    │  │
│  │    ✓ Mt. Fuji Day Trip            ██████████ 3/4    │  │
│  │      Teamlab Borderless           ████ 1/4          │  │
│  │                                                      │  │
│  │    🏆 Winners: Tokyo Tower, Senso-ji, Mt. Fuji      │  │
│  │    [View Full Results]                              │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

**Features:**
- **Poll Types**: Single choice, multiple choice, ranked voting
- **Visual Results**: Progress bars showing vote distribution
- **Deadline System**: Auto-close polls after set time
- **Participation Tracking**: See who voted, who hasn't
- **Winner Declaration**: Automatically highlight winning options
- **Voter Privacy**: Optional anonymous voting
- **Poll Categories**: Dates, Budget, Activities, Accommodation, Transport
- **Admin Controls**: Create, edit, close, delete polls
- **Notifications**: Alert members when new polls created
- **History**: Archive of closed polls for reference

### 4. Settings Tab

**Layout Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  ⚙️ Group Settings                                         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  GROUP INFORMATION                                         │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Group Name:  [Tokyo Adventure 2025        ]        │  │
│  │ Description: [Spring break trip to Japan...]        │  │
│  │ Group Photo:  [Change Photo]                        │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  PRIVACY & PERMISSIONS (Admin Only)                       │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Member Permissions:                                  │  │
│  │  ☑ Members can edit itinerary                       │  │
│  │  ☑ Members can add expenses                         │  │
│  │  ☐ Require admin approval for edits                 │  │
│  │  ☑ Members can create polls                         │  │
│  │                                                      │  │
│  │ Group Visibility:                                    │  │
│  │  ○ Private (Invite only)                            │  │
│  │  ● Semi-private (Members can invite)                │  │
│  │  ○ Public (Anyone can request to join)              │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  NOTIFICATIONS                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  ☑ New messages                                      │  │
│  │  ☑ New polls                                         │  │
│  │  ☑ Itinerary changes                                 │  │
│  │  ☑ Budget updates                                    │  │
│  │  ☐ Member activity                                   │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  DANGER ZONE (Admin Only)                                 │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  [Leave Group]  [Delete Group]  [Archive Group]     │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## 🌍 COMMUNITY SECTION ARCHITECTURE

### Section Structure (Solo Trips Only)

```
COMMUNITY WORKSPACE (Solo Trips Only)
├── Tab 1: Discover Travelers
│   ├── Matching Algorithm
│   ├── Traveler Cards
│   ├── Filters & Search
│   └── Trust Ratings
├── Tab 2: My Connections
│   ├── Active Connections
│   ├── Pending Requests
│   ├── Blocked Users
│   └── Connection History
├── Tab 3: Overlapping Trips
│   ├── Same Destination
│   ├── Similar Dates
│   ├── Shared Interests
│   └── Quick Connect
└── Tab 4: Safety & Trust
    ├── Trust Score System
    ├── Verification Badges
    ├── Report/Block Tools
    └── Privacy Settings
```

### 1. Discover Travelers Tab

**Layout Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  🌍 Discover Solo Travelers                                │
│  [Filters: Destination ▼] [Dates ▼] [Interests ▼]         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  BEST MATCHES FOR YOU (3)                                 │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Alex Chen                              ⭐ 4.8    │  │
│  │    📍 Tokyo, Japan • March 16-23                    │  │
│  │    ✓ Verified Traveler • 12 trips completed        │  │
│  │                                                      │  │
│  │    🎯 Interests: Culture, Food, Photography         │  │
│  │    💬 Languages: English, Mandarin                  │  │
│  │                                                      │  │
│  │    📊 95% Match                                      │  │
│  │    • Same destination & overlapping dates            │  │
│  │    • 5 shared interests                             │  │
│  │    • Similar budget range                           │  │
│  │                                                      │  │
│  │    [👋 Connect] [💬 Message] [📋 View Profile]     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Maria Santos                          ⭐ 4.6     │  │
│  │    📍 Kyoto, Japan • March 18-25                    │  │
│  │    ✓ Verified Traveler • 8 trips completed         │  │
│  │                                                      │  │
│  │    🎯 Interests: Temples, Nature, Local Food        │  │
│  │    💬 Languages: English, Spanish, Japanese         │  │
│  │                                                      │  │
│  │    📊 82% Match                                      │  │
│  │    • Similar destination (nearby)                    │  │
│  │    • 3 shared interests                             │  │
│  │    • Both prefer budget travel                      │  │
│  │                                                      │  │
│  │    [👋 Connect] [💬 Message] [📋 View Profile]     │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  OTHER TRAVELERS (12)                                     │
│  [View All →]                                             │
└────────────────────────────────────────────────────────────┘
```

**Matching Algorithm:**
```javascript
const calculateMatchScore = (userA, userB) => {
  let score = 0
  let factors = []
  
  // Destination (30 points)
  if (userA.destination === userB.destination) {
    score += 30
    factors.push('Same destination')
  } else if (isNearby(userA.destination, userB.destination)) {
    score += 15
    factors.push('Nearby destinations')
  }
  
  // Date Overlap (25 points)
  const overlap = calculateDateOverlap(userA.dates, userB.dates)
  if (overlap > 0.7) {
    score += 25
    factors.push('High date overlap')
  } else if (overlap > 0.3) {
    score += 15
    factors.push('Moderate date overlap')
  }
  
  // Shared Interests (20 points)
  const sharedInterests = getSharedInterests(userA, userB)
  score += Math.min(sharedInterests.length * 4, 20)
  if (sharedInterests.length > 0) {
    factors.push(`${sharedInterests.length} shared interests`)
  }
  
  // Budget Range (10 points)
  if (budgetRangeOverlap(userA.budget, userB.budget)) {
    score += 10
    factors.push('Similar budget')
  }
  
  // Travel Style (10 points)
  if (userA.travelStyle === userB.travelStyle) {
    score += 10
    factors.push('Similar travel style')
  }
  
  // Language (5 points)
  const commonLanguages = getCommonLanguages(userA, userB)
  if (commonLanguages.length > 0) {
    score += 5
    factors.push('Common languages')
  }
  
  return {
    score: score, // 0-100
    factors: factors,
    isRecommended: score >= 70
  }
}
```

**Features:**
- **Smart Matching**: AI-based algorithm considering multiple factors
- **Trust Badges**: Verified travelers, completed trips, reviews
- **Interest Tags**: Filterable by activity preferences
- **Match Percentage**: Clear visual indicator of compatibility
- **Match Reasons**: Transparent explanation of why someone is a match
- **Language Display**: Communication compatibility
- **Quick Actions**: Connect, message, view full profile
- **Safety First**: Report/block functionality always visible

### 2. My Connections Tab

**Layout Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  🤝 My Connections                                         │
│  [Active (3)] [Pending (2)] [Blocked (0)]                 │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ACTIVE CONNECTIONS                                       │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Alex Chen                     Connected 2 days ago│  │
│  │    📍 Currently in Tokyo                             │  │
│  │    💬 Last message: "Meet at Shibuya at 3pm?"       │  │
│  │                                                      │  │
│  │    [💬 Message] [📞 Call] [🗺️ Share Location]      │  │
│  │    [⋮ More: Block, Report, Disconnect]             │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Maria Santos                 Connected 1 week ago │  │
│  │    📍 Currently in Kyoto                             │  │
│  │    💬 Planning to meet in Osaka                      │  │
│  │                                                      │  │
│  │    [💬 Message] [📞 Call] [🗺️ Share Location]      │  │
│  │    [⋮ More: Block, Report, Disconnect]             │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  PENDING REQUESTS (2)                                     │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Sam Rodriguez wants to connect                    │  │
│  │    📍 Tokyo, Japan • March 20-27                     │  │
│  │    ⭐ 4.7 • 6 trips completed                        │  │
│  │    💬 "Hey! Saw we're both visiting Tokyo..."       │  │
│  │                                                      │  │
│  │    [✓ Accept] [✗ Decline] [View Profile]           │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

### 3. Overlapping Trips Tab

**Layout Structure:**
```
┌────────────────────────────────────────────────────────────┐
│  📅 Overlapping Trips                                      │
│  People traveling at the same time & place as you          │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  SAME DATES & DESTINATION (2)                             │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 James Park                                        │  │
│  │    📍 Tokyo, Japan                                   │  │
│  │    📅 March 15-22 (7 days overlap with your trip)   │  │
│  │    ⭐ 4.9 • 15 trips                                 │  │
│  │                                                      │  │
│  │    🎯 Planning: Shibuya, Akihabara, Mt. Fuji        │  │
│  │                                                      │  │
│  │    [Connect] [View Itinerary]                       │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  NEARBY TRAVELERS (5)                                     │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ 👤 Lisa Wang                                         │  │
│  │    📍 Osaka, Japan (270km from Tokyo)               │  │
│  │    📅 March 18-25 (5 days overlap)                  │  │
│  │    ⭐ 4.5 • 9 trips                                  │  │
│  │                                                      │  │
│  │    🎯 Planning: Dotonbori, Osaka Castle             │  │
│  │    💡 Both planning to visit Kyoto on March 20      │  │
│  │                                                      │  │
│  │    [Connect] [View Itinerary]                       │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

### 4. Safety & Trust Tab

**Trust Score System:**
```
Trust Score Components:
├── Verification Status (25%)
│   ├── Email verified (+5%)
│   ├── Phone verified (+5%)
│   ├── ID verified (+10%)
│   └── Social media linked (+5%)
├── Trip History (25%)
│   ├── Completed trips (+2% per trip, max 15%)
│   ├── Check-ins (+5%)
│   └── No cancellations (+5%)
├── Community Reviews (30%)
│   ├── Average rating (1-5 stars)
│   ├── Number of reviews
│   └── Recent review trend
├── Platform Activity (10%)
│   ├── Profile completeness
│   ├── Response rate
│   └── Last active
└── Safety Record (10%)
    ├── No reports (+10%)
    └── Reports (-50% per report)
```

**Layout:**
```
┌────────────────────────────────────────────────────────────┐
│  🛡️ Safety & Trust                                         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  YOUR TRUST SCORE                                         │
│  ┌─────────────────────────────────────────────────────┐  │
│  │         ⭐ 4.8 / 5.0                                 │  │
│  │    ████████████████░░  92% Trust Score               │  │
│  │                                                      │  │
│  │    ✓ Email Verified                                  │  │
│  │    ✓ Phone Verified                                  │  │
│  │    ✓ ID Verified                                     │  │
│  │    ✓ 12 Completed Trips                              │  │
│  │    ✓ 15 Positive Reviews                             │  │
│  │                                                      │  │
│  │    [Increase Trust Score →]                         │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  SAFETY TOOLS                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  📍 Emergency Contacts                               │  │
│  │     Add trusted contacts who can track your trip     │  │
│  │     [Manage Contacts]                                │  │
│  │                                                      │  │
│  │  🚨 Report a User                                    │  │
│  │     Report suspicious or inappropriate behavior      │  │
│  │     [Report]                                         │  │
│  │                                                      │  │
│  │  🚫 Blocked Users (0)                                │  │
│  │     Manage users you've blocked                      │  │
│  │     [View List]                                      │  │
│  └─────────────────────────────────────────────────────┘  │
│                                                            │
│  PRIVACY SETTINGS                                         │
│  ┌─────────────────────────────────────────────────────┐  │
│  │  ☑ Show my trips to community                       │  │
│  │  ☑ Allow connection requests                        │  │
│  │  ☐ Share real-time location with connections       │  │
│  │  ☑ Show when I'm online                             │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

---

## 🔄 SOLO → GROUP CONVERSION LOGIC

### Conversion Flow

```
SOLO TRIP
    │
    ├─► User clicks "Add Members" or "Invite Friends"
    │
    ├─► System prompts:
    │   "Convert to group trip?"
    │   ⚠️ This will:
    │   • Remove Community access
    │   • Enable Group features (chat, polls)
    │   • Make you the Admin
    │   • Make trip collaborative
    │
    ├─► User confirms
    │
    ├─► System executes:
    │   1. Update trip.type: 'solo' → 'group'
    │   2. Set user.role: 'admin'
    │   3. Set user.isCreator: true
    │   4. Create group chat instance
    │   5. Initialize poll system
    │   6. Update permissions
    │
    ├─► User sends invites
    │
    └─► GROUP TRIP (with Admin controls)
```

### Implementation

```javascript
const convertSoloToGroup = async (tripId, userId, invitedMembers) => {
  // 1. Verify user is trip owner
  const trip = await getTrip(tripId)
  if (trip.userId !== userId) {
    throw new Error('Only trip owner can convert to group')
  }
  
  // 2. Show confirmation modal
  const confirmed = await showConversionModal({
    title: 'Convert to Group Trip?',
    message: `
      This will change your solo trip into a group trip.
      
      Changes:
      • You'll become the Admin
      • Group Chat will be enabled
      • Community features will be removed
      • All invited members can view and edit trip details
      
      This action can be reversed by removing all members.
    `,
    confirmText: 'Convert to Group',
    cancelText: 'Stay Solo'
  })
  
  if (!confirmed) return
  
  // 3. Execute conversion
  await db.transaction(async (trx) => {
    // Update trip
    await trx('trips').where({ id: tripId }).update({
      type: 'group',
      updatedAt: new Date()
    })
    
    // Set creator as admin
    await trx('trip_members').insert({
      tripId: tripId,
      userId: userId,
      role: 'admin',
      isCreator: true,
      status: 'active',
      joinedAt: new Date()
    })
    
    // Create group chat
    await trx('chats').insert({
      tripId: tripId,
      type: 'group',
      createdBy: userId,
      createdAt: new Date()
    })
    
    // Initialize group settings
    await trx('group_settings').insert({
      tripId: tripId,
      memberCanEdit: true,
      memberCanInvite: true,
      requireApproval: false,
      visibility: 'private'
    })
    
    // Send invites
    for (const member of invitedMembers) {
      await sendInvite(tripId, member, userId)
    }
  })
  
  // 4. Navigate to Group section
  navigate(`/workspace/${tripId}/group`)
  
  // 5. Show success message
  showToast('Trip converted to group! Invites sent.', 'success')
}
```

### Reverse Conversion (Group → Solo)

```javascript
const convertGroupToSolo = async (tripId, userId) => {
  const trip = await getTrip(tripId)
  const member = await getTripMember(tripId, userId)
  
  // Only creator can convert back
  if (!member.isCreator) {
    throw new Error('Only trip creator can convert back to solo')
  }
  
  // Must remove all other members first
  const memberCount = await getTripMemberCount(tripId)
  if (memberCount > 1) {
    throw new Error('Remove all other members before converting to solo')
  }
  
  // Confirm action
  const confirmed = await showModal({
    title: 'Convert Back to Solo Trip?',
    message: 'This will disable group features and restore community access.',
    confirmText: 'Convert to Solo'
  })
  
  if (!confirmed) return
  
  await db.transaction(async (trx) => {
    await trx('trips').where({ id: tripId }).update({
      type: 'solo',
      updatedAt: new Date()
    })
    
    // Archive group chat (keep history)
    await trx('chats').where({ tripId }).update({
      status: 'archived'
    })
    
    // Remove member records
    await trx('trip_members').where({ tripId }).delete()
  })
  
  navigate(`/workspace/${tripId}/community`)
  showToast('Trip converted back to solo', 'success')
}
```

---

## 🎨 UX DESIGN PRINCIPLES

### 1. Context-Aware Navigation

**Group Trip:**
```
Workspace Tabs:
[Overview] [Itinerary] [Budget] [Group] [Discover] [Safety] [Memories]
                                   ↑
                           Group features here
```

**Solo Trip:**
```
Workspace Tabs:
[Overview] [Itinerary] [Budget] [Community] [Discover] [Safety] [Memories]
                                    ↑
                           Community features here
```

### 2. Role-Based UI Visibility

```javascript
// Admin-only elements
{isAdmin && (
  <button onClick={removeMember}>Remove Member</button>
)}

// Member view
{isMember && !isAdmin && (
  <div className="limited-permissions">
    <InfoIcon />
    Only admins can modify group settings
  </div>
)}

// Creator-only
{isCreator && (
  <button onClick={deleteGroup}>Delete Group</button>
)}
```

### 3. Progressive Disclosure

- **First-time users**: Show tooltips and guided tour
- **Empty states**: Clear CTAs and explanations
- **Power users**: Shortcuts and advanced features

### 4. Trust-First Design

- **Verification badges** prominently displayed
- **Trust scores** visible on all user cards
- **Report/Block** always accessible
- **Privacy controls** easy to find
- **Emergency contacts** in Safety section

### 5. Mobile-First Responsive

```css
/* Mobile: Stack vertically */
@media (max-width: 768px) {
  .member-card {
    flex-direction: column;
  }
  
  .group-chat {
    height: calc(100vh - 120px);
  }
  
  .poll-options {
    grid-template-columns: 1fr;
  }
}

/* Tablet: 2 columns */
@media (min-width: 769px) and (max-width: 1024px) {
  .members-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: Full layout */
@media (min-width: 1025px) {
  .group-workspace {
    display: grid;
    grid-template-columns: 300px 1fr;
  }
}
```

---

## ⚠️ EDGE CASES & SOLUTIONS

### 1. Last Admin Leaves

**Problem:** Admin leaves group, no other admins exist

**Solution:**
```javascript
const handleAdminLeave = async (tripId, adminId) => {
  const admins = await getAdmins(tripId)
  
  if (admins.length === 1 && admins[0].id === adminId) {
    // Auto-promote most active member
    const nextAdmin = await getMostActiveMember(tripId)
    
    await showModal({
      title: 'Promote New Admin',
      message: `You're the last admin. ${nextAdmin.name} will be automatically promoted.`,
      confirmText: 'Proceed'
    })
    
    await promoteToAdmin(tripId, nextAdmin.id)
    await removeFromGroup(tripId, adminId)
  }
}
```

### 2. Creator Wants to Leave

**Problem:** Creator cannot leave group

**Solution:**
- Transfer creator status to another admin first
- OR delete entire group if creator insists

```javascript
const transferCreatorStatus = async (tripId, currentCreator, newCreator) => {
  await db.transaction(async (trx) => {
    await trx('trip_members')
      .where({ tripId, userId: currentCreator })
      .update({ isCreator: false })
    
    await trx('trip_members')
      .where({ tripId, userId: newCreator })
      .update({ isCreator: true, role: 'admin' })
  })
}
```

### 3. Member Removed Mid-Trip

**Problem:** Someone is removed while trip is ongoing

**Solution:**
- Immediate access revocation
- Keep their contributions visible (with "removed member" label)
- Send notification with reason (if provided)
- Allow appeal through support

### 4. Solo User Gets Too Many Connection Requests

**Problem:** Popular travelers overwhelmed with requests

**Solution:**
```javascript
const connectionRequestLimits = {
  pending: 20, // Max pending requests at once
  perDay: 10,  // Max requests per day
  autoDecline: true // Auto-decline after 7 days
}

// Implement filters
const filterRequests = {
  trustScoreMinimum: 4.0,
  verifiedOnly: true,
  sharedInterestsMin: 2
}
```

### 5. Group Member Creates Duplicate Solo Trip

**Problem:** Member wants personal copy of group trip

**Solution:**
```javascript
const duplicateToSoloTrip = async (originalTripId, userId) => {
  const originalTrip = await getTrip(originalTripId)
  
  // Create new solo trip with same details
  const soloTrip = await createTrip({
    ...originalTrip,
    type: 'solo',
    userId: userId,
    originalTripId: originalTripId, // Link for reference
    members: [{ userId, role: 'admin', isCreator: true }]
  })
  
  // Copy itinerary
  await copyItinerary(originalTripId, soloTrip.id)
  
  return soloTrip
}
```

### 6. Conflicting Poll Results

**Problem:** Tied votes or no consensus

**Solution:**
```javascript
const handleTiedPoll = (poll) => {
  if (poll.results.filter(r => r.votes === poll.results[0].votes).length > 1) {
    // Notify admins
    notifyAdmins(poll.tripId, {
      title: 'Poll Tied',
      message: 'Manual decision needed',
      action: 'Create runoff poll or decide manually'
    })
  }
}
```

### 7. Spam/Harassment in Community

**Problem:** User receives unwanted messages

**Solution:**
- Block button on every user card
- Report with categories (spam, harassment, fake profile)
- Automatic temporary ban after 3 reports
- Human review for permanent bans
- Appeals process through support

### 8. Group Chat Message Overload

**Problem:** Too many messages, hard to track

**Solution:**
- Pin important messages
- Search functionality
- @ mentions with notifications
- Thread replies (group related messages)
- Mute chat option
- Mark as read/unread

---

## 📊 DATA MODEL

### Database Schema

```sql
-- Trips
CREATE TABLE trips (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(10) CHECK (type IN ('solo', 'group')),
  destination VARCHAR(255),
  start_date DATE,
  end_date DATE,
  status VARCHAR(20),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Trip Members (Group trips)
CREATE TABLE trip_members (
  id UUID PRIMARY KEY,
  trip_id UUID REFERENCES trips(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(10) CHECK (role IN ('admin', 'member')),
  is_creator BOOLEAN DEFAULT false,
  invited_by UUID REFERENCES users(id),
  status VARCHAR(20) CHECK (status IN ('pending', 'active', 'removed')),
  joined_at TIMESTAMP,
  removed_at TIMESTAMP,
  UNIQUE(trip_id, user_id)
);

-- Group Chat Messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY,
  trip_id UUID REFERENCES trips(id),
  user_id UUID REFERENCES users(id),
  message TEXT,
  type VARCHAR(20) CHECK (type IN ('text', 'image', 'file', 'location')),
  is_pinned BOOLEAN DEFAULT false,
  replied_to UUID REFERENCES chat_messages(id),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
);

-- Message Read Status
CREATE TABLE message_read_status (
  message_id UUID REFERENCES chat_messages(id),
  user_id UUID REFERENCES users(id),
  read_at TIMESTAMP,
  PRIMARY KEY (message_id, user_id)
);

-- Polls
CREATE TABLE polls (
  id UUID PRIMARY KEY,
  trip_id UUID REFERENCES trips(id),
  created_by UUID REFERENCES users(id),
  title TEXT,
  description TEXT,
  type VARCHAR(20) CHECK (type IN ('single', 'multiple', 'ranked')),
  status VARCHAR(20) CHECK (status IN ('active', 'closed')),
  closes_at TIMESTAMP,
  created_at TIMESTAMP,
  closed_at TIMESTAMP
);

-- Poll Options
CREATE TABLE poll_options (
  id UUID PRIMARY KEY,
  poll_id UUID REFERENCES polls(id),
  option_text TEXT,
  display_order INT
);

-- Poll Votes
CREATE TABLE poll_votes (
  id UUID PRIMARY KEY,
  poll_id UUID REFERENCES polls(id),
  option_id UUID REFERENCES poll_options(id),
  user_id UUID REFERENCES users(id),
  rank INT, -- For ranked voting
  voted_at TIMESTAMP,
  UNIQUE(poll_id, user_id, option_id)
);

-- Community Connections (Solo trips)
CREATE TABLE connections (
  id UUID PRIMARY KEY,
  requester_id UUID REFERENCES users(id),
  recipient_id UUID REFERENCES users(id),
  status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
  message TEXT,
  created_at TIMESTAMP,
  responded_at TIMESTAMP,
  UNIQUE(requester_id, recipient_id)
);

-- Trust Ratings
CREATE TABLE trust_ratings (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  rated_by UUID REFERENCES users(id),
  trip_id UUID REFERENCES trips(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMP,
  UNIQUE(user_id, rated_by, trip_id)
);

-- User Verification
CREATE TABLE user_verifications (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  id_verified BOOLEAN DEFAULT false,
  verification_level INT DEFAULT 0,
  updated_at TIMESTAMP
);

-- Safety Reports
CREATE TABLE safety_reports (
  id UUID PRIMARY KEY,
  reporter_id UUID REFERENCES users(id),
  reported_user_id UUID REFERENCES users(id),
  reason VARCHAR(50),
  description TEXT,
  status VARCHAR(20) CHECK (status IN ('pending', 'reviewed', 'action_taken')),
  created_at TIMESTAMP,
  resolved_at TIMESTAMP
);
```

---

## 🚀 IMPLEMENTATION PRIORITY

### Phase 1: Core Group Features (Week 1-2)
- ✅ Members & Roles tab
- ✅ Basic permissions system
- ✅ Invite members functionality
- ✅ Role management (promote/demote)

### Phase 2: Communication (Week 3-4)
- ✅ Group Chat implementation
- ✅ Real-time messaging
- ✅ Message read status
- ✅ Pinned messages

### Phase 3: Decision Making (Week 5-6)
- ✅ Polls & Decisions tab
- ✅ Create/vote on polls
- ✅ Poll results visualization
- ✅ Auto-close polls

### Phase 4: Community (Week 7-8)
- ✅ Discover Travelers tab
- ✅ Matching algorithm
- ✅ Connection requests
- ✅ Trust score system

### Phase 5: Safety & Trust (Week 9-10)
- ✅ Verification system
- ✅ Report/block functionality
- ✅ Trust ratings
- ✅ Emergency contacts

### Phase 6: Conversion & Edge Cases (Week 11-12)
- ✅ Solo → Group conversion
- ✅ Admin transfer logic
- ✅ Edge case handling
- ✅ Polish and testing

---

## 📱 MOBILE CONSIDERATIONS

### Mobile-Specific Features

1. **Push Notifications**
   - New message
   - New poll
   - Connection request
   - Trip update
   - Member joined/left

2. **Offline Support**
   - Cache recent messages
   - Queue outgoing messages
   - Sync when back online

3. **Location Sharing**
   - Real-time location for safety
   - Geofence alerts
   - Check-in functionality

4. **Quick Actions**
   - Swipe to delete message
   - Long-press for options
   - Pull to refresh

---

## 🎯 SUCCESS METRICS

### Group Engagement
- Member invitation acceptance rate
- Average messages per day per group
- Poll participation rate
- Admin actions per trip
- Member retention rate

### Community Engagement
- Connection request acceptance rate
- Match quality score
- Message response rate
- Trust score distribution
- Report/block rate (lower is better)

### Conversion
- Solo → Group conversion rate
- Time to first member added
- Average group size
- Group trip completion rate

---

## 🔒 SECURITY & PRIVACY

### Data Protection
- End-to-end encryption for messages
- Encrypted storage for sensitive data
- GDPR compliant data handling
- Right to delete data
- Data export functionality

### Access Control
- Role-based permissions enforced at API level
- Rate limiting on invites/requests
- IP-based spam detection
- Automated content moderation

### Privacy Features
- Anonymous mode option
- Location sharing controls
- Profile visibility settings
- Block list management
- Report system with human review

---

This design document provides a production-ready, scalable system for Solmate's Group and Community features. The architecture balances user safety, engagement, and flexibility while maintaining clear separation between solo and group travel experiences.
