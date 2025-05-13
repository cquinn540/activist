// SPDX-License-Identifier: AGPL-3.0-or-later
const LENGTH = "length";
const HAS_LOWERCASE = "has-lowercase";
const HAS_UPPERCASE = "has-uppercase";
const HAS_NUMBER = "has-number";
const HAS_SPECIAL_CHAR = "has-special-char";

export type PasswordRuleName =
  | typeof LENGTH
  | typeof HAS_LOWERCASE
  | typeof HAS_UPPERCASE
  | typeof HAS_NUMBER
  | typeof HAS_SPECIAL_CHAR;

export interface PasswordRule {
  name: PasswordRuleName;
  isValid: boolean;
}
