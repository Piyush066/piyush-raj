import { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,
  signIn: async () => ({ error: null }),
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Safety timeout – never stay stuck on loading spinner
    const timeout = setTimeout(() => {
      setLoading(false);
      console.warn("[Auth] Safety timeout reached – forcing loading=false");
    }, 5000);

    // 1. Set up listener FIRST (before getSession)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("[Auth] onAuthStateChange:", _event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          // Fire-and-forget – never await inside onAuthStateChange
          supabase.rpc("has_role", { _user_id: session.user.id, _role: "admin" })
            .then(({ data, error }) => {
              if (error) console.error("[Auth] has_role error:", error);
              setIsAdmin(!!data);
              setLoading(false);
              clearTimeout(timeout);
            });
        } else {
          setIsAdmin(false);
          setLoading(false);
          clearTimeout(timeout);
        }
      }
    );

    // 2. Restore existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("[Auth] getSession error:", error);
        setLoading(false);
        clearTimeout(timeout);
        return;
      }
      // If no session and listener hasn't fired yet, stop loading
      if (!session) {
        setLoading(false);
        clearTimeout(timeout);
      }
      // If session exists, the onAuthStateChange listener will handle it
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("[Auth] signIn error:", error.message);
      return { error: error.message };
    }
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
