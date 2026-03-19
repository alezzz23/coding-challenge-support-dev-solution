import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const currentCompanyId = 'TechCorp'

    // BUG 4 INTENCIONAL: Fuga de datos
    // El usuario (simulado) pertenece a 'TechCorp', pero aquí traemos todos los tickets
    // de la base de datos sin filtrar.
    const tickets = await prisma.ticket.findMany({
      where: { companyId: currentCompanyId },
      orderBy: { createdAt: 'desc' },
      // Falta: where: { companyId: 'TechCorp' } o usando el usuario de la sesión
    })

    return NextResponse.json(tickets)
  } catch (error) {
    console.error('Error fetching tickets:', error)
    return NextResponse.json({ error: 'Error fetching tickets' }, { status: 500 })
  }
}
