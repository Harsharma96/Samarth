import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useReveal } from "@/lib/shop-store";

import { Ticker } from "@/components/site/Ticker";
import { Navbar } from "@/components/site/Navbar";
import { HeroSection } from "@/components/site/HeroSection";
import { OfferBanner } from "@/components/site/OfferBanner";
import { CategorySection } from "@/components/site/CategorySection";
import { FeaturedCollections } from "@/components/site/FeaturedCollections";
import { ShopSection } from "@/components/site/ShopSection";
import { WholesaleSection } from "@/components/site/WholesaleSection";
import { PriceListTable } from "@/components/site/PriceListTable";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { AboutSection } from "@/components/site/AboutSection";
import { ReviewsSection } from "@/components/site/ReviewsSection";
import { ReelsGallery } from "@/components/site/ReelsGallery";
import { FaqSection } from "@/components/site/FaqSection";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { WishlistDrawer } from "@/components/site/WishlistDrawer";
import { QuickViewModal } from "@/components/site/QuickViewModal";
import { FloatingActions } from "@/components/site/FloatingActions";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  useReveal();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlistOpen, setWishlistOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-gold selection:text-gold-foreground">
      {/* Top Announcement Marquee Ticker */}
      <Ticker />

      {/* Main Sticky Navbar */}
      <Navbar onOpenWishlist={() => setWishlistOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        {/* 1. Hero Carousel with Trust Bar */}
        <HeroSection />

        {/* 2. Countdown Special Offer Banner (MASALA15) */}
        <OfferBanner />

        {/* 3. Categories Visual Grid */}
        <CategorySection
          activeCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 4. Featured Collections (Best Sellers, Masale, Premixes) */}
        <FeaturedCollections />

        {/* 5. Full Shop Catalog with Filters & Search */}
        <ShopSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 6. Wholesale & Bulk Rates with Delivery Info */}
        <WholesaleSection />

        {/* 7. Official 2026 Price List Table */}
        <PriceListTable />

        {/* 8. Why Choose Samarth Masale */}
        <WhyChooseUs />

        {/* 9. Heritage & Story Section */}
        <AboutSection />

        {/* 10. Reviews & 4.8 Rating Breakdown */}
        <ReviewsSection />

        {/* 11. Instagram Recipes Video Reels */}
        <ReelsGallery />

        {/* 12. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Drawers & Overlays */}
      <CartDrawer />
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
      />
      <QuickViewModal />
      <FloatingActions />
    </div>
  );
}
