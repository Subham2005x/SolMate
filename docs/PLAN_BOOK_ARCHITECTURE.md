# Plan & Book Section - Product Architecture Document

## 🎯 Core Concept

**Solmate is NOT a booking company.**  
It is a **centralized planning and coordination hub** for trips.

The "Plan & Book" section uses the existing trip plan (destination, dates, budget, group size) to organize all booking-related decisions in one place, then redirects users to external booking partners for final transactions.

---

## 📍 Location in Product

- Lives inside each **Trip Workspace**
- Contextual to the specific trip
- Accessible via sidebar navigation: **🎫 Plan & Book**
- Route: `/workspace/:tripId/planbook`

---

## ✨ Features Implemented

### 1. **Hotels & Stays** 🏨
- Shows relevant accommodations based on trip destination
- **Filters:**
  - Budget range (Budget-Friendly, Mid-Range, Luxury)
  - Type (Hotels, Hostels, Apartments)
- **For each stay:**
  - Name, location, distance from center
  - Price per night
  - Star rating and availability status
  - Amenities (WiFi, Breakfast, Pool, etc.)
  - Cancellation policy
  - Partner (Booking.com, Airbnb, Hostelworld)
- **Actions:**
  - 🔖 Save to trip
  - View on partner site (opens booking modal)

### 2. **Flights** ✈️
- Compare flight options for trip dates
- **Display info:**
  - Airline, route (from → to)
  - Departure/arrival times
  - Flight duration
  - Stops (non-stop, 1 stop, etc.)
  - Baggage allowance
  - Class (Economy, Business)
  - Price per person
  - Partner (Skyscanner, Kayak, Google Flights)
- **Actions:**
  - 🔖 Save to trip
  - View on partner site

### 3. **Ground Transport** 🚌
- Trains, buses between cities/airports
- **Display info:**
  - Operator name
  - Route (Airport → City Center)
  - Duration
  - Frequency (Every 30 mins, etc.)
  - Price per person
  - Partner (JR Pass, Klook, Rome2Rio)
- **Actions:**
  - 🔖 Save to trip
  - Book on partner site

### 4. **Local Mobility** 🚗
- Rentals, passes, local services
- **Examples:**
  - Pocket WiFi rentals
  - City metro passes (72h Tokyo Metro Pass)
  - Bike/scooter rentals
  - Airport transfers
- **Display:**
  - Service name, provider
  - Price per day/unit
  - Partner (Klook, GetYourGuide)
- **Actions:**
  - 🔖 Save to trip
  - Get on partner site

### 5. **Permits & Passes** 📋
- Identifies required permits for destination
- **Shows:**
  - Permit name (Japan Tourist Visa, JR Pass)
  - Required vs Optional badge
  - Description and purpose
  - Cost (USD)
  - Processing time (5-7 days, Instant)
  - Documents needed (Passport, Photo, Itinerary)
  - Application URL
- **Status tracking:**
  - ⚪ Not Started
  - ⏳ Pending
  - ✅ Approved
- **Actions:**
  - Apply Now (opens external site)
  - Track Status (saves to trip)

---

## 👥 Group Trip Behavior

When `tripData.type === 'group'`:

### Admin Controls
- **Trip admin** (role: 'admin') has final authority on bookings
- Admin approval required before group booking links are shared

### Member Features
- Members can:
  - Browse all options
  - Save suggestions to trip
  - Vote on preferred options (future phase)
- Cannot directly initiate bookings without admin

### Booking Flow
1. Member saves an option → Marked as "Suggested by [Name]"
2. Admin reviews saved items
3. Admin clicks "Book" → Booking link shared in group chat
4. All members can see booking status
5. Redirect happens for admin only

### Visual Indicators
- "💡 As trip admin, this booking link will be shared with your group chat" shown in modal
- Saved items show who suggested them
- Status visible to all members in real-time

---

## 🧘 Solo Trip Behavior

When `tripData.type === 'solo'`:

### Personalized Experience
- Recommendations based on:
  - Trip budget (auto-filters budget ranges)
  - Solo traveler preferences
  - Past booking history (future)

### Budget-Aware Suggestions
- Calculates per-night budget: `tripData.budget / tripData.duration`
- Auto-highlights "Best Value" options
- Shows cumulative cost tracking

### Simple Save-and-Book Flow
1. Browse options
2. Save favorites (builds personal shortlist)
3. Click "Book" anytime → Opens modal → Redirects
4. No approval needed, instant booking access

---

## 🎨 Design Requirements

### App-Like UI ✅
- Card-based layouts (not table rows)
- Smooth animations (Framer Motion)
- Touch-friendly buttons (min 44px height)
- Optimized for mobile and desktop

### Clear Hierarchy ✅
- **Header:** Trip context card (destination, dates, budget, travelers)
- **Tabs:** Hotels → Flights → Transport → Local → Permits
- **Content:** Grid for stays/local, List for flights/transport
- **Modals:** Booking confirmation with partner details

### Calm, Trustworthy Feel ✅
- Green gradient accents (#0F3D2E → #0a5d43)
- Soft shadows (no harsh borders)
- Generous whitespace
- Clear typography hierarchy
- Status badges with calm colors

### No Clutter ✅
- Filters collapse when not needed
- Progressive disclosure (show more details on click)
- Only essential info visible upfront
- Saved items in dedicated panel

### Dark Mode Support ✅
- All components support light/dark themes
- Adaptive gradient backgrounds
- High contrast text colors
- Smooth theme transitions

---

## 🚫 Important Constraints

### What Solmate Does NOT Do:
- ❌ Accept payments
- ❌ Issue tickets or confirmations
- ❌ Handle cancellations or refunds
- ❌ Provide customer support for bookings
- ❌ Store payment information

### Redirect-Based Booking Only:
- All transactions happen on **partner websites**
- Users are clearly informed before redirect
- **Booking Modal** shows:
  - Partner name and logo
  - Security disclaimer
  - What happens next
  - "Continue to [Partner] →" button

### Partner Responsibilities:
- Payment processing
- Ticket issuance
- Customer support
- Cancellation policies
- Refund handling

---

## 📈 Phase-Wise Rollout Strategy

### **Phase 1** (Current Implementation) ✅
- Hotels & Stays
- Flights
- Ground Transport
- Permits & Passes
- Basic save/book flow
- Partner redirects
- Group admin controls

### **Phase 2** (Next 3-6 months)
- **Local Mobility expansion:**
  - Car rentals
  - Bike sharing
  - Airport transfers
- **Voting system for groups:**
  - Members vote on options
  - Admin sees vote counts
  - "Most Popular" badge
- **Price alerts:**
  - Track saved items
  - Notify when prices drop
- **Itinerary integration:**
  - Booked items auto-add to itinerary
  - Time-aware suggestions

### **Phase 3** (6-12 months)
- **Activities & Tours:**
  - Local experiences (GetYourGuide, Viator)
  - Guided tours
  - Skip-the-line tickets
- **Travel Insurance:**
  - Compare insurance plans
  - Link to providers (World Nomads, SafetyWing)
- **Multi-city support:**
  - Complex itineraries
  - Route optimization
- **ML-based recommendations:**
  - Personalized suggestions based on user history
  - Similar traveler patterns

### **Phase 4** (Future)**
- **Group payment splitting:**
  - Track who paid what
  - Settlement suggestions
  - Integration with Splitwise
- **Loyalty program aggregation:**
  - Link airline miles
  - Hotel reward points
  - Show best redemption options

---

## 💰 Monetization Strategy

### Affiliate-Based Model:
1. **Tracking Links:**
   - Each partner redirect includes Solmate affiliate ID
   - Example: `https://booking.com?affiliate=solmate&trip={tripId}`

2. **Revenue Share:**
   - **Hotels/Stays:** 4-7% commission (Booking.com, Airbnb)
   - **Flights:** $2-5 per booking (Skyscanner, Kayak)
   - **Activities:** 8-12% commission (GetYourGuide, Viator)
   - **Transport:** 5-8% commission (Klook, Rome2Rio)

3. **Premium Features (Future):**
   - Advanced price alerts: $2.99/month
   - Priority customer support: $4.99/month
   - Unlimited saved items: Free users limited to 20

4. **B2B Model (Future):**
   - Travel agencies use Solmate for group planning
   - Charge per trip: $15-30
   - White-label option: $199/month

### Revenue Projections (Year 1):
- 10,000 active trips/month
- 30% booking conversion rate
- Average commission: $8 per booking
- **Estimated Monthly Revenue:** $24,000
- **Annual:** ~$288,000

---

## 🛠️ Technical Implementation

### Component Structure:
```
WorkspacePlanBook.jsx
├── State Management (useState)
│   ├── activeTab (stays, flights, transport, local, permits)
│   ├── savedItems (user's shortlist)
│   ├── filterBudget, filterType
│   └── bookingDetails (for modal)
├── Mock Data (Replace with API calls)
│   ├── mockStays (Booking.com API)
│   ├── mockFlights (Skyscanner API)
│   ├── mockTransport (Klook API)
│   └── mockPermits (Static data + user status)
├── Functions
│   ├── handleSaveItem() - Adds to savedItems
│   ├── handleBookNow() - Opens booking modal
│   └── handleConfirmBooking() - Redirects to partner
└── UI Components
    ├── TripContextCard (destination, dates, budget)
    ├── TabsNavigation
    ├── FiltersBar
    ├── ItemsGrid/ItemsList
    └── BookingModal
```

### API Integration Points:
1. **Booking Partners:**
   - Booking.com API
   - Skyscanner Flight Search API
   - Klook Affiliate API
   - Rome2Rio Route API

2. **User Data:**
   - `GET /api/trips/:tripId` → Trip details
   - `POST /api/trips/:tripId/saved-items` → Save booking option
   - `POST /api/affiliate/track` → Log affiliate click

3. **Real-Time Updates (Future):**
   - WebSocket for price changes
   - Group member activity feed

---

## 📊 Success Metrics

### Key Performance Indicators:
1. **Engagement:**
   - % of trips that use Plan & Book
   - Average items saved per trip
   - Time spent in section

2. **Conversion:**
   - Click-through rate to partners
   - Booking completion rate
   - Revenue per trip

3. **User Satisfaction:**
   - NPS score for feature
   - Support tickets related to bookings
   - Feature usage retention

### Target Goals (6 months):
- 60% of trips use Plan & Book
- 25% booking conversion rate
- $15 average commission per trip
- 4.5+ star feature rating

---

## 🚀 Next Steps

### Immediate (Week 1-2):
1. Replace mock data with real API calls
2. Add affiliate tracking to all partner links
3. Implement saved items persistence (localStorage → DB)
4. Add loading states and error handling

### Short-term (Month 1-3):
1. A/B test different layouts (grid vs list)
2. Add price comparison charts
3. Implement group voting UI
4. Build admin dashboard for booking analytics

### Medium-term (Month 3-6):
1. Launch Phase 2 features (local mobility, voting)
2. Partner with 3-5 new booking platforms
3. Build mobile app version
4. Add multi-language support

---

## 📚 Documentation for Developers

### Adding a New Partner:
1. Add partner to mock data:
```javascript
{
  id: 'unique-id',
  partner: 'Partner Name',
  partnerUrl: 'https://partner.com?affiliate=solmate',
  // ... other fields
}
```

2. Update booking modal to handle new partner
3. Add affiliate tracking in `handleConfirmBooking()`

### Customizing Filters:
- Edit `filterBudget` and `filterType` states
- Modify `getFilteredStays` useMemo hook
- Update filters-bar UI in render

### Extending to New Categories:
1. Add tab to `tabs` array
2. Create mock data array
3. Add AnimatePresence case in render
4. Design card layout for new category

---

## ✅ Implementation Checklist

- [x] Core component structure
- [x] Hotels & Stays tab with filters
- [x] Flights tab with comparison
- [x] Ground Transport tab
- [x] Local Mobility tab
- [x] Permits & Passes tab with status tracking
- [x] Save to trip functionality
- [x] Booking modal with partner redirect
- [x] Group vs Solo logic
- [x] Dark mode support
- [x] Responsive design
- [x] CSS styling (calm aesthetic)
- [x] Integration with Trip Workspace
- [ ] Real API integration
- [ ] Affiliate link tracking
- [ ] Database persistence for saved items
- [ ] Error handling and loading states
- [ ] Analytics tracking
- [ ] Group voting system
- [ ] Price alerts

---

**Status:** ✅ Phase 1 Complete - Ready for API integration and user testing
**Owner:** Product Team
**Last Updated:** December 17, 2025
