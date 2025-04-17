import { motion } from 'framer-motion';

const SakuraAnimation = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute -top-2 left-1/4 w-3 h-3 bg-pink-200 rounded-full opacity-50"
        animate={{
          y: ['0%', '100%'],
          x: ['0%', '50%', '-50%', '0%'],
          rotate: [0, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute -top-2 left-2/4 w-2 h-2 bg-pink-300 rounded-full opacity-50"
        animate={{
          y: ['0%', '100%'],
          x: ['0%', '-30%', '30%', '0%'],
          rotate: [0, -360],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className="absolute -top-2 left-3/4 w-2.5 h-2.5 bg-pink-100 rounded-full opacity-50"
        animate={{
          y: ['0%', '100%'],
          x: ['0%', '20%', '-20%', '0%'],
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default SakuraAnimation; 