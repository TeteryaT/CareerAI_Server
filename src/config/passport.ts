import passport, { DoneCallback } from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { User } from "../models/userModel";

dotenv.config();

interface JwtPayload {
  id: number;
  [key: string]: unknown;
}

interface AuthenticateOptions {
  session?: boolean;
  scope?: string | string[];
  [key: string]: unknown;
}

class PassportConfig {
  private static instance: PassportConfig;
  private readonly jwtSecret: string;

  private constructor() {
    this.jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    this.configureJWTStrategy();
  }

  public static getInstance(): PassportConfig {
    if (!PassportConfig.instance) {
      PassportConfig.instance = new PassportConfig();
    }
    return PassportConfig.instance;
  }

  private configureJWTStrategy(): void {
    const jwtOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: this.jwtSecret,
    };

    passport.use(
      new JWTStrategy(
        jwtOptions,
        async (jwtPayload: JwtPayload, done: DoneCallback) => {
          try {
            const user = await User.findByPk(jwtPayload.id);
            if (user) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error: unknown) {
            done(error as Error, false);
          }
        }
      )
    );
  }

  public initialize() {
    return passport.initialize();
  }

  public authenticate(strategy: string, options: AuthenticateOptions) {
    return passport.authenticate(strategy, options);
  }
}

export const passportConfig = PassportConfig.getInstance();
