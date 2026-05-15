import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import PageTransition from "../components/common/PageTransition";
import { blogApi } from "../services/api";
import { motion } from "framer-motion";

export const Blog = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => { blogApi.list().then((d) => setPosts(d.items)); }, []);

  return (
    <Layout>
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl sm:text-5xl font-display font-semibold text-[#2D5A2A] text-center mb-3" data-testid="blog-title">The Jute Journal</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Stories of sustainability, craftsmanship and timeless natural design.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                data-testid={`blog-card-${p.slug}`}
              >
                <Link to={`/blog/${p.slug}`}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{p.title}</h2>
                    <p className="text-sm text-gray-600">{p.excerpt}</p>
                    <div className="mt-4 text-xs text-[#007D7B] font-semibold">Read article →</div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => { blogApi.get(slug).then(setPost); window.scrollTo({top:0}); }, [slug]);
  if (!post) return <Layout><div className="py-32 text-center">Loading…</div></Layout>;

  return (
    <Layout>
      <PageTransition>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <div className="aspect-[16/8] overflow-hidden rounded-2xl mb-8">
            <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#2D5A2A] mb-2" data-testid="blog-detail-title">{post.title}</h1>
          <div className="text-xs text-gray-500 mb-8">By {post.author}</div>
          <div className="prose max-w-none text-gray-700 leading-relaxed [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#2D5A2A] [&_h2]:mt-8 [&_h2]:mb-3 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mb-2"
            dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </PageTransition>
    </Layout>
  );
};
