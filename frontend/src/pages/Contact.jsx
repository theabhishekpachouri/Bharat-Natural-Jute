import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import { contactApi } from "../services/api";
import { toast } from "sonner";
import { MapPin, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [form, setForm] = useState({ first_name: "", last_name: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await contactApi.submit(form);
      toast.success(res.message);
      setForm({ first_name: "", last_name: "", phone: "", email: "", message: "" });
    } catch { toast.error("Submit failed"); } finally { setLoading(false); }
  };

  return (
    <Layout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-4xl sm:text-5xl font-display font-semibold text-[#2D5A2A] mb-3" data-testid="contact-title">Get In Touch!</motion.h1>
          <p className="text-gray-600 mb-12 max-w-2xl">Have a question or bulk-order inquiry? We'd love to hear from you.</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.form initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} onSubmit={onSubmit} className="space-y-4" data-testid="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="First Name" value={form.first_name} onChange={(v)=>setForm({...form, first_name:v})} testId="contact-first-name" required />
                <Field label="Last Name" value={form.last_name} onChange={(v)=>setForm({...form, last_name:v})} testId="contact-last-name" required />
              </div>
              <Field label="Phone Number" value={form.phone} onChange={(v)=>setForm({...form, phone:v})} testId="contact-phone" required />
              <Field label="Email Address" type="email" value={form.email} onChange={(v)=>setForm({...form, email:v})} testId="contact-email" required />
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  required value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})}
                  rows={5}
                  className="w-full bg-gray-100 focus:bg-white focus:border-[#007D7B] border border-transparent rounded-md px-4 py-3 text-sm outline-none"
                  data-testid="contact-message"
                />
              </div>
              <button type="submit" disabled={loading}
                className="bg-[#D63031] hover:bg-[#b3262a] text-white px-8 py-3 rounded-md font-semibold btn-press disabled:opacity-60"
                data-testid="contact-submit">
                {loading ? "Sending..." : "Submit"}
              </button>
            </motion.form>

            <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} className="space-y-6">
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22427.45!2d-80.27!3d25.72!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b6d5c8e6e6e7!2sCoral%20Gables%2C%20FL!5e0!3m2!1sen!2sus!4v1700000000"
                  width="100%" height="300" style={{ border: 0 }} loading="lazy" />
              </div>
              <div className="space-y-4">
                <Info icon={MapPin} title="Our Headquarters" text="400 University Drive Suite 200, Coral Gables, FL 33134 USA" />
                <Info icon={Mail} title="Email Us" text="hello@bharatnaturaljute.com" />
                <Info icon={Phone} title="Call Us" text="+1 (305) 555 0123" />
              </div>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

const Field = ({ label, value, onChange, type = "text", required, testId }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <input type={type} required={required} value={value} onChange={(e)=>onChange(e.target.value)}
      className="w-full bg-gray-100 focus:bg-white focus:border-[#007D7B] border border-transparent rounded-md px-4 py-3 text-sm outline-none"
      data-testid={testId} />
  </div>
);

const Info = ({ icon: Icon, title, text }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-full bg-[#F5EFE6] flex items-center justify-center shrink-0">
      <Icon className="w-5 h-5 text-[#007D7B]" />
    </div>
    <div>
      <div className="font-semibold text-gray-900">{title}</div>
      <div className="text-sm text-gray-600">{text}</div>
    </div>
  </div>
);

export default Contact;
