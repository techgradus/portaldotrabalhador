import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatBot from '../chatbot/ChatBot';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.root}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
