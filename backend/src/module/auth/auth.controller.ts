import { Controller, Get, Inject, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { type Request, type Response } from "express";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  // 1. Google login redirect route
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req: Request) {
    // AuthGuard automatically redirects to Google
  }

  // 2. Google callback route
  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req?.user;
    const token = await this.authService.generateJwtToken(user);
    console.log("token", token.accessToken);
    res.cookie("accessToken", token.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.redirect("http://localhost:3000");

    // return req.user; // Authenticated user info
  }
}
