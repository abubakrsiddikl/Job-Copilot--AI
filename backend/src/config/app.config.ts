import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port: Number(process.env.PORT ?? 5000),
  frontendUrl: process.env.FRONTEND_URL ?? "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV ?? "development",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "15m",
  cookieDomain: process.env.COOKIE_DOMAIN,
}));
