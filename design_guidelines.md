# Design Guidelines: Real-Time Voting Application

## Design Approach
**System-Based Approach**: Material Design-inspired with Linear's clean aesthetics
- **Rationale**: Utility-focused productivity app requiring clear feedback, real-time updates, and straightforward interaction patterns
- **Key Principles**: Clarity over decoration, immediate visual feedback, scannable information hierarchy

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 239 84% 67% (vibrant blue for CTAs and active states)
- Background: 0 0% 100% (pure white)
- Surface: 220 13% 97% (light gray for cards)
- Border: 220 13% 91%
- Text Primary: 222 47% 11%
- Text Secondary: 215 16% 47%
- Success: 142 71% 45% (for submitted votes)
- Accent: 280 61% 50% (purple for vote counts)

**Dark Mode:**
- Primary: 239 84% 67%
- Background: 222 47% 11%
- Surface: 217 33% 17%
- Border: 217 33% 23%
- Text Primary: 210 40% 98%
- Text Secondary: 215 20% 65%
- Success: 142 71% 45%
- Accent: 280 61% 60%

### B. Typography
- **Font Families**: Inter (primary), SF Pro Display (fallback)
- **Headings**: 
  - H1: 32px/40px, font-semibold (poll titles)
  - H2: 24px/32px, font-semibold (section headers)
  - H3: 18px/28px, font-medium (choice labels)
- **Body**: 16px/24px, font-normal
- **Small/Meta**: 14px/20px (vote counts, user status)

### C. Layout System
- **Spacing Units**: Consistently use 2, 4, 6, 8, 12, 16, 20, 24 (e.g., p-4, gap-6, mt-8)
- **Container**: max-w-3xl mx-auto for main content
- **Grid**: Single column focus for voting clarity

### D. Component Library

**Poll Creation Interface:**
- Input field with subtle border, focus ring on active state
- "Add Choice" button (secondary style)
- Choice list with individual delete buttons (icon only, hover reveals)
- "Start Poll" primary button (full width on mobile)
- Character counter for choice inputs (max 80 chars)

**Voting Interface:**
- Large, tappable choice cards (min-h-16, full width)
- Radio button indicators (custom styled circles)
- Visual hover states with subtle background color shift
- "Submit Vote" button (disabled until selection made)
- Vote confirmation with success icon animation

**Results Display:**
- Horizontal progress bars for each choice
- Percentage display aligned right
- Absolute vote count in small text
- Live update animation (smooth width transition)
- Winner highlight with subtle glow effect

**User Tracking Panel:**
- Compact user list showing voting status
- Green checkmark for voted users
- Gray indicator for pending votes
- Current user highlighted
- "5/5 votes" counter prominently displayed

**Status Indicators:**
- "Creating Poll" state with empty state illustration
- "Voting Open" with countdown or live indicator
- "Poll Closed" with final results lock
- Error states with inline messages (red border, icon)

### E. Interactive States

**Buttons:**
- Primary: Solid fill, white text, hover darkens 5%
- Secondary: Outline, hover fills background
- Disabled: 50% opacity, no interactions

**Choice Cards:**
- Default: Subtle border, white/dark background
- Hover: Border color intensifies, slight scale (1.01)
- Selected: Primary border, filled background tint
- Voted: Success border with checkmark overlay

**Real-time Feedback:**
- Vote submission: Button shows loading spinner
- Results update: Smooth 300ms bar width transition
- New vote arrives: Gentle pulse animation on affected bar
- Poll completion: Confetti or celebration micro-interaction

### F. Layout Specifications

**Poll Creation Page:**
- Centered card (max-w-2xl)
- Poll title input at top
- Scrollable choice list (max-h-96)
- Fixed action buttons at bottom

**Voting Page:**
- Full-width choice grid
- Sticky header with poll title
- Fixed submit button (bottom on mobile, inline on desktop)
- Side panel for user status (desktop only, drawer on mobile)

**Results Page:**
- Choice bars stacked vertically
- Largest percentage highlighted
- Share/restart buttons at bottom
- User participation summary card

### G. Responsive Behavior
- Mobile (<768px): Single column, stacked layout, bottom sheet for user status
- Tablet (768-1024px): Retain single column, increase spacing
- Desktop (>1024px): Side-by-side layout for voting + user panel

### H. Accessibility
- WCAG AA contrast ratios maintained
- Focus visible indicators on all interactive elements
- Screen reader labels for vote counts and status
- Keyboard navigation support (tab order, enter to submit)
- Dark mode properly implemented across all input fields

**No Custom Icons:** Use Heroicons via CDN for all iconography (check-circle, x-circle, users, chart-bar)

**No Hero Image:** Utility app - focus on functional interface, no marketing elements needed