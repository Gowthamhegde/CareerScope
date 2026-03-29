# Google AdSense Integration Guide

## ✅ What's Been Added

1. **AdSense Script**: Added to `frontend/index.html` head section
2. **Ad Components**: Created reusable components in `frontend/src/components/AdSense.jsx`

## 📋 Next Steps in Google AdSense

### 1. Create Ad Units
Go to https://adsense.google.com/ → Ads → By ad unit

Create these ad units:
- **Display Ad** (Responsive) - for general placement
- **In-article Ad** - for within content
- **Multiplex Ad** - for related content sections

For each ad unit, Google will give you an **Ad Slot ID** (looks like: `1234567890`)

### 2. Get Your Ad Slot IDs
After creating each ad unit, copy the `data-ad-slot` value.

## 🎨 How to Use Ad Components

### Import the Components
```javascript
import { DisplayAd, InArticleAd, SidebarAd, BannerAd, MultiplexAd } from '../components/AdSense';
```

### Example Placements

#### 1. Display Ad (Responsive - Works Everywhere)
```jsx
<DisplayAd slot="YOUR_AD_SLOT_ID" />
```

#### 2. In-Article Ad (Between Content)
```jsx
<InArticleAd slot="YOUR_AD_SLOT_ID" />
```

#### 3. Sidebar Ad (Sticky)
```jsx
<SidebarAd slot="YOUR_AD_SLOT_ID" />
```

#### 4. Banner Ad (Horizontal)
```jsx
<BannerAd slot="YOUR_AD_SLOT_ID" />
```

#### 5. Multiplex Ad (Related Content)
```jsx
<MultiplexAd slot="YOUR_AD_SLOT_ID" />
```

## 📍 Recommended Ad Placements

### Home Page (`frontend/src/pages/Home.jsx`)
```jsx
import { DisplayAd, MultiplexAd } from '../components/AdSense';

// Add after hero section
<DisplayAd slot="YOUR_SLOT_ID" />

// Add at bottom before footer
<MultiplexAd slot="YOUR_SLOT_ID" />
```

### Job Explorer (`frontend/src/pages/JobExplorer.jsx`)
```jsx
import { DisplayAd, SidebarAd } from '../components/AdSense';

// Add in sidebar
<SidebarAd slot="YOUR_SLOT_ID" />

// Add between job listings (every 10 jobs)
{index % 10 === 0 && <DisplayAd slot="YOUR_SLOT_ID" />}
```

### Job Detail (`frontend/src/pages/JobDetail.jsx`)
```jsx
import { InArticleAd, DisplayAd } from '../components/AdSense';

// Add after job description
<InArticleAd slot="YOUR_SLOT_ID" />

// Add before related jobs
<DisplayAd slot="YOUR_SLOT_ID" />
```

### Salary Calculator (`frontend/src/pages/SalaryCalculator.jsx`)
```jsx
import { DisplayAd } from '../components/AdSense';

// Add after results
<DisplayAd slot="YOUR_SLOT_ID" />
```

### Dashboard (`frontend/src/pages/Dashboard.jsx`)
```jsx
import { DisplayAd, SidebarAd } from '../components/AdSense';

// Add in sidebar
<SidebarAd slot="YOUR_SLOT_ID" />

// Add between charts
<DisplayAd slot="YOUR_SLOT_ID" />
```

## 🎯 Best Practices

### 1. Ad Density
- Don't overload pages with ads (max 3-4 per page)
- Space ads naturally within content
- Use responsive ads for mobile compatibility

### 2. Strategic Placement
- **Above the fold**: One ad near top (high visibility)
- **Within content**: In-article ads between sections
- **Sidebar**: Sticky ads for desktop users
- **Bottom**: Multiplex or display ad before footer

### 3. User Experience
- Don't place ads that block content
- Ensure ads don't interfere with navigation
- Test on mobile devices

### 4. Performance
- Ads load asynchronously (won't slow down your site)
- AdSense script is already optimized
- Components handle errors gracefully

## 📊 Example: Add Ads to Home Page

```jsx
// frontend/src/pages/Home.jsx
import { DisplayAd, MultiplexAd } from '../components/AdSense';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      
      {/* Ad after hero */}
      <DisplayAd slot="1234567890" />
      
      {/* Features Section */}
      <FeaturesSection />
      
      {/* Stats Section */}
      <StatsSection />
      
      {/* Ad before footer */}
      <MultiplexAd slot="0987654321" />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
```

## 🔧 Testing Ads

### Development Mode
Ads won't show in development (localhost). To test:
1. Deploy to Vercel
2. Visit your live site
3. Ads may take 24-48 hours to appear initially

### Ad Review
Google reviews your site before showing ads:
- Ensure you have sufficient content
- Follow AdSense policies
- Wait for approval (usually 24-48 hours)

## 📱 Responsive Ads

All components are mobile-friendly:
- `DisplayAd`: Automatically adjusts size
- `InArticleAd`: Fluid layout
- `SidebarAd`: Hides on mobile if needed
- `BannerAd`: Responsive on smaller screens

## 🚫 AdSense Policies

Make sure your site complies:
- ✅ Original content
- ✅ Easy navigation
- ✅ No prohibited content
- ✅ Privacy policy page
- ✅ Clear site purpose

## 📈 Monitoring Performance

Track ad performance in AdSense dashboard:
- Impressions
- Clicks
- CTR (Click-through rate)
- Earnings

## 🔄 Deploy Changes

After adding ads to your pages:

```bash
git add .
git commit -m "Add Google AdSense integration"
git push origin main
```

Vercel will auto-deploy.

## 🎨 Styling Ads

Ads are wrapped in `.adsense-container` class. You can style it:

```css
/* frontend/src/index.css */
.adsense-container {
  margin: 2rem 0;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}
```

## ⚠️ Important Notes

1. **Ad Slot IDs**: Replace `YOUR_SLOT_ID` with actual IDs from AdSense
2. **Testing**: Ads won't show on localhost
3. **Approval**: May take 24-48 hours for ads to appear
4. **Limit**: Don't exceed 3 ads per page initially
5. **Auto Ads**: You can also enable Auto Ads in AdSense dashboard

## 🎯 Quick Start

1. ✅ AdSense script added to HTML
2. ✅ Ad components created
3. ⏳ Create ad units in AdSense dashboard
4. ⏳ Get ad slot IDs
5. ⏳ Add components to your pages
6. ⏳ Deploy to Vercel
7. ⏳ Wait for Google approval

## 📞 Need Help?

If ads don't show:
- Check AdSense account status
- Verify site is approved
- Check browser console for errors
- Wait 24-48 hours after first deployment
- Ensure ad blocker is disabled when testing

---

Your AdSense integration is ready! Just create ad units in your AdSense dashboard and add the components to your pages.
