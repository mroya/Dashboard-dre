import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

let clientInstance = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  try {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  } catch (err) {
    console.warn('⚠️ Erro ao inicializar cliente Supabase:', err.message);
  }
} else {
  console.warn('⚠️ Supabase URL ou Anon Key não configuradas no ambiente. O sistema funcionará com cache e persistência local.');
}

// Proxy de segurança para evitar que chamadas a supabase quebrem a aplicação caso não configurado
const createSafeProxy = () => {
  const dummyChain = {
    select: () => dummyChain,
    insert: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
    upsert: () => dummyChain,
    delete: () => dummyChain,
    eq: () => dummyChain,
    order: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
    single: () => Promise.resolve({ data: null, error: new Error('Supabase não configurado') }),
    then: (resolve) => resolve({ data: null, error: new Error('Supabase não configurado') }),
  };

  return {
    from: () => dummyChain,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
  };
};

export const supabase = clientInstance || createSafeProxy();
export const isSupabaseConfigured = Boolean(clientInstance);
