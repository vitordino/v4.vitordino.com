import { homepage } from '../../package.json'

const hostname: string = process.env.PUBLIC_URL || process.env.PUBLIC_VERCEL_URL || homepage

export const siteUrl = `https://${hostname}`
