import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import { motion } from "framer-motion";

const About = () => (
  <Layout>
    <PageTransition>
      <section className="about-gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold mb-8"
            data-testid="about-title"
          >
            About Us
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-5 max-w-4xl text-base sm:text-[15px] leading-relaxed text-white/95"
          >
            <p>
              At Bharat Natural Jute, we are passionate about crafting sustainable, eco-friendly products from 100% natural jute. Our mission is to combine style, utility, and environmental responsibility, offering a wide range of premium jute products that suit every lifestyle and occasion.
            </p>
            <p>
              We specialize in Personalized Jute Bags, designed to meet your unique requirements, making them perfect for gifts, corporate events, or everyday use. Our collection also includes Eco-Friendly Grocery Jute Bags, Jute Beach Bags, and versatile Jute Tote Bags with Printed Quotes, providing a stylish and sustainable alternative to single-use plastics.
            </p>
            <p>
              Whether you are looking for Wedding Return Gift Bags, Hand-Painted Jute Bags, or practical options like Jute Laptop / Office Bags, Jute Messenger Bags, Jute Backpacks, and Jute Laptop Sleeves, we have something for everyone. Our Jute Cosmetic Bags, Jute Picnic Bags, Jute Crossbody Sling Bags, and Jute Yoga / Gym Bags are designed for modern lifestyles, combining durability with eco-conscious fashion.
            </p>
            <p>
              For special occasions, we offer elegant Jute Wine Bottle Bags, Jute Drawstring Pouches, Jute Gift Card Holders / Small Gift Pouches, and Jute Handmade Clutch Bags, adding a natural charm to your gifting experience. Our collection also extends to Jute Storage Bins / Home Organization solutions and Jute Baby / Kids Bags, catering to every age group and need.
            </p>
            <p>
              At Bharat Natural Jute, we believe in sustainability without compromising on style. Every product is thoughtfully crafted to promote eco-friendly living while enhancing your everyday life with the timeless beauty and strength of natural jute.
            </p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  </Layout>
);

export default About;
