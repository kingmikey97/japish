// ============================================
// PERFILES DINÁMICOS - JAPISH
// URL: valhallatechbo.com/japish/mikey
// ============================================

import ProfileCard from '@/components/ProfileCard';

export default async function PerfilPage({ params }) {
  const { username } = await params;
  
  return (
    <main>
      <ProfileCard username={username} />
    </main>
  );
}