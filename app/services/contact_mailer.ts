import nodemailer from 'nodemailer'
import env from '#start/env'

type ContactPayload = {
  name: string
  email: string
  subject?: string | null
  message: string
}

export async function sendContactNotification(payload: ContactPayload) {
  const mailHost = env.get('MAIL_HOST')
  const mailPort = env.get('MAIL_PORT')
  const mailUser = env.get('MAIL_USER')
  const mailPass = env.get('MAIL_PASS')
  const mailSecure = env.get('MAIL_SECURE')
  const mailFrom = env.get('MAIL_FROM') || mailUser
  const mailTo = env.get('MAIL_TO') || mailUser

  if (!mailHost || !mailPort || !mailUser || !mailPass || !mailFrom || !mailTo) {
    return {
      sent: false,
      skipped: true,
      reason: 'SMTP no configurado completamente',
    }
  }

  const transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: mailSecure ?? false,
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  })

  const subject = payload.subject?.trim()
    ? `[Contacto Web] ${payload.subject.trim()}`
    : '[Contacto Web] Nuevo mensaje'

  const plainText = [
    'Nuevo mensaje desde el formulario de contacto.',
    '',
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Asunto: ${payload.subject || 'Sin asunto'}`,
    '',
    'Mensaje:',
    payload.message,
  ].join('\n')

  const html = `
    <h2>Nuevo mensaje desde el formulario de contacto</h2>
    <p><strong>Nombre:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Asunto:</strong> ${payload.subject || 'Sin asunto'}</p>
    <hr />
    <p style="white-space: pre-line;">${payload.message}</p>
  `

  await transporter.sendMail({
    from: mailFrom,
    to: mailTo,
    replyTo: payload.email,
    subject,
    text: plainText,
    html,
  })

  return { sent: true, skipped: false }
}
