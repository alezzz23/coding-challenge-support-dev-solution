import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Función auxiliar simulada para envío de correos
async function sendEmailNotification(ticketId: string, companyId: string) {
  // BUG 3 INTENCIONAL: Esta promesa nunca se resuelve
  // El hilo se queda bloqueado esperando.
  return new Promise<void>((resolve) => {
    console.log(`Enviando notificación urgente para el ticket ${ticketId}...`)
    setTimeout(() => {
      console.log(`Notificación enviada para ${companyId} (ticket ${ticketId}).`)
      resolve()
    }, 250)
  })
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await request.json()

    const currentCompanyId = 'TechCorp'

    // Buscamos el ticket para ver su prioridad
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    })

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket no encontrado' }, { status: 404 })
    }

    if (ticket.companyId !== currentCompanyId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    if (ticket.priority === 'Urgente' && status === 'Resuelto') {
      // Bug 3: Se queda esperando infinitamente
      await sendEmailNotification(ticket.id, ticket.companyId)
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(updatedTicket)
  } catch (error) {
    console.error('Error updating ticket:', error)
    return NextResponse.json({ error: 'Error updating ticket' }, { status: 500 })
  }
}
