import { expirarReservasVencidas } from '@/lib/database-nonstop';

export async function GET(request) {
  try {
    // Verificar que la petición tenga un token de autorización
    // Esto previene que cualquiera pueda llamar este endpoint
    const authHeader = request.headers.get('authorization');
    const expectedToken = process.env.CRON_SECRET || 'mi-secreto-temporal-123';
    
    if (authHeader !== `Bearer ${expectedToken}`) {
      return Response.json(
        { error: 'No autorizado' }, 
        { status: 401 }
      );
    }
    
    // Expirar reservas vencidas
    const resultado = await expirarReservasVencidas();
    
    if (resultado.success) {
      return Response.json({ 
        success: true, 
        message: 'Reservas expiradas correctamente',
        timestamp: new Date().toISOString()
      });
    } else {
      return Response.json({ 
        success: false, 
        error: resultado.error 
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Error en cron de expiración:', error);
    return Response.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
}

// También permitir POST para testing manual
export async function POST(request) {
  return GET(request);
}
