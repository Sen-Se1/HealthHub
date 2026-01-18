import crypto from "crypto"
import { prisma } from "./db"

export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex")
    crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt + ":" + derivedKey.toString("hex"))
    })
  })
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const parts = hash.split(":")
    const salt = parts[0]
    const derivedKey = parts[1]
    crypto.pbkdf2(password, salt, 100000, 64, "sha512", (err, computed) => {
      if (err) reject(err)
      resolve(computed.toString("hex") === derivedKey)
    })
  })
}

export async function createSession(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days

  await prisma.session.create({
    data: {
      user_id: userId,
      token,
      expires_at: expiresAt,
    },
  })

  return token
}

export async function getSessionUser(token: string) {
  const session = await prisma.session.findUnique({
    where: { token },
    include: {
      user: {
        include: {
          patient: true,
          doctor: true,
        },
      },
    },
  })

  if (!session || session.expires_at < new Date()) {
    return null
  }

  return session.user
}

export async function invalidateSession(token: string) {
  try {
    await prisma.session.delete({
      where: { token },
    })
  } catch (err) {
    // Session might not exist
  }
}

export async function createPasswordResetToken(userId: number): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  await prisma.passwordResetToken.create({
    data: {
      user_id: userId,
      token,
      expires_at: expiresAt,
    },
  })

  return token
}

export async function verifyPasswordResetToken(token: string) {
  const result = await prisma.passwordResetToken.findUnique({
    where: { token },
  })

  if (result && result.expires_at > new Date()) {
    return result
  }

  return null
}
