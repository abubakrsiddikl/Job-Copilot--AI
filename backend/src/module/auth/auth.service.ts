import { Inject, Injectable } from "@nestjs/common";
import { db } from "../../prisma/db";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(@Inject(JwtService) private jwtService: JwtService) {}

  async validateOAuthUser(profile: any) {
    const { id: providerId, displayName, emails, photos } = profile;

    // console.log("this is email",profile.emails?.[0].value)
    const email = emails?.[0]?.value;

    console.log("email", email);
    if (!email) {
      throw new Error("Google account email is required");
    }

    const picture = photos?.[0]?.value ?? null;
    const provider = "google";

    // 1. Check existing OAuth account
    const authAccount = await db.orm.public.UserAuth.where({
      provider,
      providerId,
    })
      .include("user")
      .first();

    if (authAccount) {
      return authAccount.user;
    }

    // 2. Create/update User + UserAuth atomically
    const result = db.transaction(async (tx) => {
      const user = await tx.orm.public.User.upsert({
        create: {
          email,
          name: displayName ?? null,
          picture,
        },

        update: {
          name: displayName ?? null,
          picture,
        },

        conflictOn: {
          email,
        },
      });

      await tx.orm.public.UserAuth.create({
        provider,
        providerId,
        userId: user.id,
      });

      return user;
    });

  }

  async generateJwtToken(user: any) {
    const payload = {
      sub: user.id, // User ID
      email: user.email,
      role: user.role, // User Role (ADMIN / USER)
    };

    console.log("jwt payload", payload);

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
