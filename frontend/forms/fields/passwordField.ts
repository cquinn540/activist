import { string } from "zod";

import {
  LENGTH,
  HAS_LOWERCASE,
  HAS_UPPERCASE,
  HAS_NUMBER,
  HAS_SPECIAL_CHAR,
  type PasswordRule,
  type PasswordRuleName,
} from "~/types/password-rules";

export const passwordField = string()
  .min(12, LENGTH)
  .regex(/[a-z]/, HAS_LOWERCASE)
  .regex(/[A-Z]/, HAS_UPPERCASE)
  .regex(/[0-9]/, HAS_NUMBER)
  .regex(/[^a-zA-Z0-9]/, HAS_SPECIAL_CHAR)
  .default("");

export const createRulesList = (
  brokenRules: PasswordRuleName[]
): PasswordRule[] => {
  const passwordRules: Record<PasswordRuleName, PasswordRule> = {
    [LENGTH]: {
      name: LENGTH,
      isValid: true,
    },
    [HAS_LOWERCASE]: {
      name: HAS_LOWERCASE,
      isValid: true,
    },
    [HAS_UPPERCASE]: {
      name: HAS_UPPERCASE,
      isValid: true,
    },
    [HAS_NUMBER]: {
      name: HAS_NUMBER,
      isValid: true,
    },
    [HAS_SPECIAL_CHAR]: {
      name: HAS_SPECIAL_CHAR,
      isValid: true,
    },
  };

  for (const rule of brokenRules) {
    passwordRules[rule].isValid = false;
  }

  return Object.values(passwordRules);
};
