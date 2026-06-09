import React, { createContext, useContext, useState, useEffect } from 'react';
import { MEMBERS_DATA, POSTS_DATA, CLUBS_DATA } from '../lib/mock-data';
import { supabase } from '../lib/supabase';

export type UserRole = 'admin' | 'user' | 'president';

export interface Member {
  id: string | number;
  name: string;
  dept: string;
  clubs: string[];
  avatar: string;
  role: UserRole;
  status?: string;
}

export interface Post {
  id: string | number;
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
  presidentId: string | number;
  secretaryId: string | number | null;
}

export interface Notification {
  id: string | number;
  type: string;
  toUserId: string | number;
  fromUserId?: string | number;
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
  notifications: Notification[];
  currentUserNotifications: Notification[];
  darkMode: boolean;
  toggleDarkMode: () => void;
  addPost: (post: Partial<Post>) => void;
  toggleLike: (postId: number) => void;
  switchUser: (userId: string | number) => void;
  requestJoinClub: (clubName: string) => void;
  approveJoinRequest: (notificationId: string | number) => void;
  rejectJoinRequest: (notificationId: string | number) => void;
  dismissNotification: (id: string | number) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
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
  const [notifications, setNotifications] = useState<Notification[]>(() => loadData('dbg_notifications', []));
  const [darkMode, setDarkMode] = useState<boolean>(() => loadData('dbg_darkMode', false));
  
  const [currentUserId, setCurrentUserId] = useState<string | number>(() => {
    if (typeof window === 'undefined') return 1;
    const saved = localStorage.getItem('dbg_currentUserId');
    // If it's a UUID, parse won't work correctly, so handle string or number
    if (saved && saved.includes('-')) return saved;
    return saved ? parseInt(saved) : 1;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('dbg_isLoggedIn') === 'true';
  });

  // Fetch real users from Supabase and merge with mock data
  useEffect(() => {
    const fetchSupabaseMembers = async () => {
      try {
        const { data: profiles, error: profileError } = await supabase.from('profiles').select('*');
        const { data: clubMembers, error: clubError } = await supabase.from('club_members').select('*');
        const { data: supabaseClubs, error: supabaseClubsError } = await supabase.from('clubs').select('*');
        
        if (profiles && profiles.length > 0) {
          const supabaseMembers: Member[] = profiles.map(p => {
            const userClubs = clubMembers 
              ? clubMembers.filter(cm => cm.profile_id === p.id).map(cm => cm.club_name)
              : [];
            
            return {
              id: p.id,
              name: p.full_name || p.employee_id,
              dept: p.department || '소속 없음',
              clubs: userClubs,
              avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${p.employee_id}`,
              role: 'user',
              status: 'online'
            };
          });

          // Combine with mock data or replace. For now, let's prepend them to mock data
          setMembers(prev => {
            // Filter out any prev members that have the same ID to avoid duplicates
            const existingIds = new Set(supabaseMembers.map(sm => sm.id));
            const filteredMock = prev.filter(m => !existingIds.has(m.id) && typeof m.id === 'number');
            return [...supabaseMembers, ...filteredMock];
          });
        }

        if (supabaseClubs && supabaseClubs.length > 0) {
          const mappedClubs: Club[] = supabaseClubs.map(c => ({
            name: c.name,
            presidentId: c.president_id || 1, // Fallback or null string if preferred
            secretaryId: c.secretary_id || null
          }));
          
          setClubs(prev => {
            const existingNames = new Set(mappedClubs.map(mc => mc.name));
            const filteredMock = prev.filter(c => !existingNames.has(c.name));
            return [...mappedClubs, ...filteredMock];
          });
        }
      } catch (err) {
        console.error("Failed to fetch from Supabase:", err);
      }
    };
    
    fetchSupabaseMembers();
  }, []);

  const currentUser = members.find(m => m.id === currentUserId) || members[0];

  useEffect(() => { localStorage.setItem('dbg_members', JSON.stringify(members)); }, [members]);
  useEffect(() => { localStorage.setItem('dbg_posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem('dbg_clubs', JSON.stringify(clubs)); }, [clubs]);
  useEffect(() => { localStorage.setItem('dbg_notifications', JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { 
    localStorage.setItem('dbg_darkMode', JSON.stringify(darkMode)); 
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);
  useEffect(() => { localStorage.setItem('dbg_currentUserId', currentUserId.toString()); }, [currentUserId]);
  useEffect(() => { localStorage.setItem('dbg_isLoggedIn', isLoggedIn.toString()); }, [isLoggedIn]);

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

  const switchUser = (userId: number | string) => {
    setCurrentUserId(userId);
    setIsLoggedIn(true);
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

  return (
    <AppContext.Provider value={{ 
      members, posts, clubs, currentUser, 
      notifications, currentUserNotifications, 
      darkMode, toggleDarkMode,
      addPost, toggleLike, switchUser, 
      requestJoinClub, approveJoinRequest, rejectJoinRequest, dismissNotification,
      isLoggedIn, setIsLoggedIn
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
