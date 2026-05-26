import React, { createContext, useContext, useState, useEffect } from 'react';
import { MEMBERS_DATA, POSTS_DATA, CLUBS_DATA, events as EVENTS_DATA, gallery as GALLERY_DATA } from '../lib/mock-data';

export type UserRole = 'admin' | 'user' | 'president';

export interface Member {
  id: number;
  name: string;
  dept: string;
  clubs: string[];
  avatar: string;
  role: UserRole;
  status?: string;
}

export interface Post {
  id: number;
  club: string;
  category: string;
  title: string;
  content: string;
  author: string;
  time: string;
  likes: number;
  comments: number;
  budget: string | null;
}

export interface Club {
  name: string;
  presidentId: number;
  secretaryId: number | null;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
  attendees: number;
  team: string;
  color: string;
  isAttending?: boolean;
}

export interface Gallery {
  id: string;
  url: string;
  h: number;
  likes: number;
  by: string;
}

export interface Notification {
  id: number;
  type: string;
  toUserId: number;
  fromUserId?: number;
  fromUserName: string;
  clubName: string;
  status: string;
  time: string;
}

interface AppContextType {
  members: Member[];
  posts: Post[];
  clubs: Club[];
  currentUser: Member;
  events: Event[];
  gallery: Gallery[];
  notifications: Notification[];
  currentUserNotifications: Notification[];
  hasSeenOnboarding: boolean;
  isLoggedIn: boolean;
  toggleDarkMode: () => void;
  completeOnboarding: () => void;
  login: (userId: number) => void;
  logout: () => void;
  toggleRSVP: (eventId: string) => void;
  addPost: (post: Partial<Post>) => void;
  toggleLike: (postId: number) => void;
  switchUser: (userId: number) => void;
  requestJoinClub: (clubName: string) => void;
  approveJoinRequest: (notificationId: number) => void;
  rejectJoinRequest: (notificationId: number) => void;
  dismissNotification: (id: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const loadData = <T,>(key: string, defaultData: T): T => {
    if (typeof window === 'undefined') return defaultData;
    const saved = localStorage.getItem(key);
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        if (key === 'dbg_members' && parsed.length > 0 && !parsed[0].role) {
          return defaultData;
        }
        if (key === 'dbg_posts' && parsed.length > 0 && !parsed[0].category) {
          return defaultData;
        }
        return parsed; 
      } catch (e) { console.error(e); }
    }
    return defaultData;
  };

  const [members, setMembers] = useState<Member[]>(() => loadData('dbg_members', MEMBERS_DATA));
  const [posts, setPosts] = useState<Post[]>(() => loadData('dbg_posts', POSTS_DATA));
  const [clubs, setClubs] = useState<Club[]>(() => loadData('dbg_clubs', CLUBS_DATA));
  const [events, setEvents] = useState<Event[]>(() => loadData('dbg_events', EVENTS_DATA));
  const [gallery, setGallery] = useState<Gallery[]>(() => loadData('dbg_gallery', GALLERY_DATA));
  const [notifications, setNotifications] = useState<Notification[]>(() => loadData('dbg_notifications', []));
  const [darkMode, setDarkMode] = useState<boolean>(() => loadData('dbg_darkMode', false));
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState<boolean>(() => loadData('dbg_hasSeenOnboarding', false));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => loadData('dbg_isLoggedIn', false));
  
  const [currentUserId, setCurrentUserId] = useState<number>(() => {
    if (typeof window === 'undefined') return 1;
    const saved = localStorage.getItem('dbg_currentUserId');
    return saved ? parseInt(saved) : 1;
  });

  const currentUser = members.find(m => m.id === currentUserId) || members[0];

  useEffect(() => { localStorage.setItem('dbg_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('dbg_posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem('dbg_clubs', JSON.stringify(clubs)); }, [clubs]);
  useEffect(() => { localStorage.setItem('dbg_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('dbg_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('dbg_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { 
    localStorage.setItem('dbg_darkMode', JSON.stringify(darkMode)); 
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  useEffect(() => { localStorage.setItem('dbg_hasSeenOnboarding', JSON.stringify(hasSeenOnboarding)); }, [hasSeenOnboarding]);
  useEffect(() => { localStorage.setItem('dbg_isLoggedIn', JSON.stringify(isLoggedIn)); }, [isLoggedIn]);
  useEffect(() => { localStorage.setItem('dbg_currentUserId', currentUserId.toString()); }, [currentUserId]);

  const addPost = (newPostData: Partial<Post>) => {
    const newPost: Post = {
      id: Date.now(),
      author: currentUser.name,
      time: '방금 전',
      likes: 0,
      comments: 0,
      club: '',
      category: '',
      title: '',
      content: '',
      budget: null,
      ...newPostData
    };
    setPosts([newPost, ...posts]);
  };

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  const switchUser = (userId: number) => {
    setCurrentUserId(userId);
  };

  const requestJoinClub = (clubName: string) => {
    const club = clubs.find(c => c.name === clubName);
    if (!club || !club.presidentId) return;

    const newNotification: Notification = {
      id: Date.now(),
      type: 'join_request',
      toUserId: club.presidentId,
      fromUserId: currentUser.id,
      fromUserName: currentUser.name,
      clubName: clubName,
      status: 'pending',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setNotifications([newNotification, ...notifications]);
  };

  const approveJoinRequest = (notificationId: number) => {
    const noti = notifications.find(n => n.id === notificationId);
    if (!noti || !noti.fromUserId) return;

    setMembers(members.map(m => {
      if (m.id === noti.fromUserId && !m.clubs.includes(noti.clubName)) {
        return { ...m, clubs: [...m.clubs, noti.clubName] };
      }
      return m;
    }));

    setNotifications(prev => [
      {
        id: Date.now() + 1,
        type: 'join_result',
        toUserId: noti.fromUserId!,
        fromUserName: currentUser.name,
        clubName: noti.clubName,
        status: 'approved',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev.filter(n => n.id !== notificationId)
    ]);
  };

  const rejectJoinRequest = (notificationId: number) => {
    const noti = notifications.find(n => n.id === notificationId);
    if (!noti || !noti.fromUserId) return;

    setNotifications(prev => [
      {
        id: Date.now() + 1,
        type: 'join_result',
        toUserId: noti.fromUserId!,
        fromUserName: currentUser.name,
        clubName: noti.clubName,
        status: 'rejected',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      },
      ...prev.filter(n => n.id !== notificationId)
    ]);
  };

  const currentUserNotifications = notifications.filter(n => n.toUserId === currentUser.id);
  
  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const completeOnboarding = () => setHasSeenOnboarding(true);

  const login = (userId: number) => {
    setCurrentUserId(userId);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const toggleRSVP = (eventId: string) => {
    setEvents(events.map(e => {
      if (e.id === eventId) {
        const attending = !e.isAttending;
        return {
          ...e,
          isAttending: attending,
          attendees: e.attendees + (attending ? 1 : -1)
        };
      }
      return e;
    }));
  };

  return (
    <AppContext.Provider value={{ 
      members, posts, clubs, currentUser, 
      events, gallery,
      notifications, currentUserNotifications, 
      darkMode, hasSeenOnboarding, isLoggedIn, toggleDarkMode, completeOnboarding,
      login, logout, toggleRSVP,
      addPost, toggleLike, switchUser, 
      requestJoinClub, approveJoinRequest, rejectJoinRequest, dismissNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
