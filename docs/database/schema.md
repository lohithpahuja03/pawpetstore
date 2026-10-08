# Database Architecture & Schema Specification

## 1. Engine
PostgreSQL with Prisma ORM.

## 2. Core Entities
1. **User**: Authentication, customer profile, role-based authorization (CUSTOMER, ADMIN, VET, STAFF).
2. **Address**: Customer delivery and billing addresses.
3. **AnimalCategory**: High-level animal taxonomies (Dogs, Cats, Birds, Hamsters).
4. **Breed**: Animal breed profiles with care notes, temperaments, and origins.
5. **Pet**: Individual animals available for inquiry, reservation, or adoption.
6. **ProductCategory**: E-commerce hierarchy (Food, Toys, Accessories, Cages, Healthcare).
7. **Product**: Physical items with pricing, inventory tracking, ratings, and variants.
8. **ProductVariant**: Specific SKU configurations (size, flavor, color).
9. **Cart & CartItem**: Persistent and session-based shopping cart.
10. **Order & OrderItem**: Processed purchases with financial totals and delivery states.
11. **Payment**: Payment transaction records (Razorpay / Stripe abstraction).
12. **Coupon**: Promotional discounts with usage limits and date windows.
13. **Review**: Customer product reviews and ratings.
14. **WishlistItem**: Saved items and pets.
15. **Clinic**: Veterinary partner facilities.
16. **VaccinationService**: Clinical care and immunizations.
17. **Appointment**: Scheduled clinic bookings with status tracking.
18. **ContactMessage**: Customer support inquiries.
19. **PetInquiry**: Dedicated pet adoption/purchase inquiries.
