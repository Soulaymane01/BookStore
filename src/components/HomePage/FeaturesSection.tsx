import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BookOpenIcon, GraduationCapIcon, LayersIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: BookOpenIcon,
      title: t('multipleCategories'),
      desc: t('multipleCategoriesDesc'),
      color: 'bg-red-50 text-red-600',
    },
    {
      icon: GraduationCapIcon,
      title: t('variousLevels'),
      desc: t('variousLevelsDesc'),
      color: 'bg-amber-50 text-amber-600',
    },
    {
      icon: LayersIcon,
      title: t('organizedContent'),
      desc: t('organizedContentDesc'),
      color: 'bg-indigo-50 text-indigo-600',
    }
  ];

  return (
    <section className="bg-white py-32 border-t border-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-10 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-red-900/5 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;