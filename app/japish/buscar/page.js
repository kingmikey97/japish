'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Search, User, Building, Briefcase, ArrowRight, Loader2 } from 'lucide-react';

export default function BuscarPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const ITEMS_PER_PAGE = 10;
  
  // ============================================
  // FUNCIÓN DE BÚSQUEDA
  // ============================================
  async function searchProfiles(searchTerm, pageNum = 1, append = false) {
    if (!searchTerm || searchTerm.length < 3) {
      setResults([]);
      return;
    }
    
    setLoading(true);
    
    try {
      // ============================================
      // QUERY A SUPABASE
      // ============================================
      // ilike = case-insensitive LIKE
      // %término% = busca en cualquier parte del texto
      
      const { data, error } = await supabase
  .from('profiles')
  .select('username, name, title, company, especialization, image, template_id')
  .or(`username.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%,title.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%,especialization.ilike.%${searchTerm}%`)
  .range((pageNum - 1) * ITEMS_PER_PAGE, pageNum * ITEMS_PER_PAGE - 1);
      
      if (error) {
        console.error('Error en búsqueda:', error);
        setLoading(false);
        return;
      }
      
      // ============================================
      // ORDENAMIENTO JUSTO
      // ============================================
      // 1. Username exacto primero
      // 2. Resto aleatorio (shuffle)
      
      const exactMatch = data.filter(p => 
        p.username.toLowerCase() === searchTerm.toLowerCase()
      );
      
      const otherResults = data.filter(p => 
        p.username.toLowerCase() !== searchTerm.toLowerCase()
      );
      
      // Shuffle aleatorio (Fisher-Yates)
      for (let i = otherResults.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [otherResults[i], otherResults[j]] = [otherResults[j], otherResults[i]];
      }
      
      const orderedResults = [...exactMatch, ...otherResults];
      
      // ============================================
      // ACTUALIZAR ESTADO
      // ============================================
      if (append) {
        setResults(prev => [...prev, ...orderedResults]);
      } else {
        setResults(orderedResults);
      }
      
      setHasMore(orderedResults.length === ITEMS_PER_PAGE);
      setLoading(false);
      
    } catch (err) {
      console.error('Error inesperado:', err);
      setLoading(false);
    }
  }
  
  // ============================================
  // EFECTO: Buscar cuando cambia query en URL
  // ============================================
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      searchProfiles(query);
    }
  }, [query]);
  
  // ============================================
  // HANDLERS
  // ============================================
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim().length >= 3) {
      router.push(`/japish/buscar?q=${encodeURIComponent(searchQuery)}`);
      setPage(1);
    }
  };
  
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    searchProfiles(query, nextPage, true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-4 py-12">
      
      <div className="max-w-4xl mx-auto">
        
        {/* ============================================ */}
        {/* HEADER + BUSCADOR */}
        {/* ============================================ */}
        <div className="mb-12">
          
          {/* Título */}
          <h1 className="text-4xl font-bold text-white mb-2 text-center">
            Buscar Perfiles
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Encuentra profesionales por nombre, empresa o profesión
          </p>
          
          {/* Buscador */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre, empresa, profesión..."
              className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl px-6 py-5 pl-14 text-white placeholder-gray-400 text-lg focus:outline-none focus:border-cyan-500 transition-all"
            />
            
            <Search 
              size={24} 
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            
            <button
              type="submit"
              disabled={searchQuery.length < 3}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buscar
            </button>
          </form>
          
          {/* Helpers */}
          {searchQuery.length > 0 && searchQuery.length < 3 && (
            <p className="text-center text-yellow-400 text-sm mt-3">
              Escribe al menos 3 caracteres para buscar
            </p>
          )}
          
        </div>
        
        {/* ============================================ */}
        {/* RESULTADOS */}
        {/* ============================================ */}
        {query && (
          <div>
            
            {/* Header de resultados */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">
                {loading && page === 1 ? (
                  'Buscando...'
                ) : (
                  <>
                    {results.length} resultado{results.length !== 1 ? 's' : ''} 
                    {results.length > 0 && (
                      <span className="text-gray-400"> para "{query}"</span>
                    )}
                  </>
                )}
              </h2>
            </div>
            
            {/* Loading inicial */}
            {loading && page === 1 && (
              <div className="flex justify-center py-12">
                <Loader2 size={40} className="text-cyan-400 animate-spin" />
              </div>
            )}
            
            {/* Lista de resultados */}
            {!loading || page > 1 ? (
              <div className="space-y-4">
                {results.length === 0 && !loading ? (
                  // Sin resultados
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      No se encontraron resultados
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Intenta con otros términos de búsqueda
                    </p>
                    <a
                      href="/japish"
                      className="inline-flex items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition-all"
                    >
                      Ver demos
                      <ArrowRight size={18} />
                    </a>
                  </div>
                ) : (
                  // Grid de resultados
                  results.map((profile) => (   
                    <a                 
                      key={profile.username}
                      href={`/japish/${profile.username}`}
                      className="block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <img
                            src={profile.image}
                            alt={profile.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-cyan-500/30 group-hover:border-cyan-500 transition-all"
                          />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-cyan-400 transition-colors">
                            {profile.name}
                          </h3>
                          
                          <div className="flex flex-wrap gap-3 text-sm">
                            <div className="flex items-center gap-1 text-gray-400">
                              <Briefcase size={14} />
                              <span className="truncate">{profile.title}</span>
                            </div>
                            
                            {profile.company && (
                              <div className="flex items-center gap-1 text-gray-400">
                                <Building size={14} />
                                <span className="truncate">{profile.company}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1 text-gray-500">
                              <User size={14} />
                              <span>@{profile.username}</span>
                            </div>
                          </div>
                          
                          {profile.specialization && (
                            <p className="text-xs text-gray-500 mt-2 truncate">
                              {profile.specialization}
                            </p>
                          )}
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex-shrink-0">
                          <ArrowRight 
                            size={24} 
                            className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all"
                          />
                        </div>
                        
                      </div>
                    </a>
                  ))
                )}
              </div>
            ) : null}
            
            {/* ============================================ */}
            {/* PAGINACIÓN - Botón "Cargar más" */}
            {/* ============================================ */}
            {hasMore && results.length > 0 && !loading && (
              <div className="mt-8 text-center">
                <button
                  onClick={loadMore}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all inline-flex items-center gap-2"
                >
                  Cargar más resultados
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
            
            {/* Loading más resultados */}
            {loading && page > 1 && (
              <div className="flex justify-center py-8">
                <Loader2 size={32} className="text-cyan-400 animate-spin" />
              </div>
            )}
            
            {/* Fin de resultados */}
            {!hasMore && results.length > 0 && (
              <p className="text-center text-gray-500 mt-8 pb-8">
                No hay más resultados
              </p>
            )}
            
          </div>
        )}
        
      </div>
    </div>
  );
}
