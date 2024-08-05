import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AccountCircleIcon from 'assets/icon/account-circle';

export interface Props {
  children?: ReactNode;
  role: 'system' | 'user';
}

export default function TextMessageBox({ children, role }: Props) {
  const icon =
    role === 'system' ? (
      <img src="/images/server.png" className="h-full object-cover" />
    ) : (
      <AccountCircleIcon className="w-[4rem] h-[4rem] -top-1 -left-1 relative rounded-full overflow-hidden" />
    );
  return (
    <motion.div
      className={
        'flex flex-row items-start text-2xl' +
        (role === 'system' ? ' text-blue-800' : ' text-yellow-900')
      }
      initial={{ opacity: 0, left: '-8px', position: 'relative' }}
      animate={{ opacity: 1, left: '0px', position: 'relative' }}
      layout
    >
      <div className="w-14 h-14 min-w-14 min-h-14 rounded-full overflow-hidden">{icon}</div>
      <span className="flex px-4 py-3 pb-0">{children}</span>
    </motion.div>
  );
}
