<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <TooltipBase
    class="z-20 min-w-[200px] pb-4 pt-2 transition delay-150 ease-in-out md:min-w-[450px]"
  >
    <span class="mb-2 px-2">{{
      $t("i18n.components.tooltip_password_requirements.password_rules_message")
    }}</span>
    <div
      v-for="rule in rules"
      :key="rule.name"
      :data-testid="rule.name"
      class="flex items-center space-x-2 px-2"
    >
      <Icon
        aria-hidden="false"
        :aria-labelledby="rule.name"
        :name="rule.isValid ? IconMap.CIRCLE_CHECK_FILL : IconMap.CIRCLE_X_FILL"
        size="0.9em"
        :style="{ color: rule.isValid ? '#198754' : '#BA3D3B' }"
      />
      <title :id="rule.name" class="sr-only">
        {{
          rule.isValid
            ? $t(
                "i18n.components.tooltip_password_requirements.password_passed_rule"
              )
            : $t(
                "i18n.components.tooltip_password_requirements.password_failed_rule"
              )
        }}
      </title>
      <span class="truncate text-sm">{{ $t(translationKeys[rule.name]) }}</span>
    </div>
  </TooltipBase>
</template>

<script setup lang="ts">
import { IconMap } from "~/types/icon-map";
import {
  LENGTH,
  HAS_LOWERCASE,
  HAS_UPPERCASE,
  HAS_NUMBER,
  HAS_SPECIAL_CHAR,
  type PasswordRule,
} from "~/types/password-rules";

defineProps<{
  rules: PasswordRule[];
}>();

const translationKeys = {
  [LENGTH]: "i18n.components.tooltip_password_requirements.number_of_chars",
  [HAS_LOWERCASE]:
    "i18n.components.tooltip_password_requirements.lower_case_letters",
  [HAS_UPPERCASE]:
    "i18n.components.tooltip_password_requirements.capital_letters",
  [HAS_NUMBER]:
    "i18n.components.tooltip_password_requirements.contains_numbers",
  [HAS_SPECIAL_CHAR]:
    "i18n.components.tooltip_password_requirements.contains_special_chars",
};
</script>
