import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, type VerifyCallback } from "passport-google-oauth20";
import { AuthService } from "./auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["email", "profile"],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    // const { displayName, emails, photos } = profile;
    // console.log("profile", profile);
    // const user = {
    //   email: emails[0].value,
    //   name: displayName,
    //   picture: photos[0].value,
    //   accessToken,
    // };

    // console.log("accessToken",accessToken);

    // console.log("this is auth service", this.authService);
    const user = await this.authService.validateOAuthUser(profile);
    done(null, user);
  }
}
