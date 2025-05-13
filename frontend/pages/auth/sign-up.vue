<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<template>
  <div class="px-4 sm:px-6 md:px-8 xl:px-24 2xl:px-36">
    <form @submit.prevent="signUp" @enter="signUp" class="space-y-4">
      <div class="col">
        <FormTextInput
          v-model="userName"
          id="sign-up-username"
          :label="$t('i18n.pages.auth._global.enter_a_user_name')"
          :data-testid="$t('i18n.pages.auth._global.enter_a_user_name')"
          v-bind="userNameAttrs"
        />
      </div>
      <div>
        <FormPasswordInput
          v-model="password"
          @blur="isPasswordFocused = false"
          @focus="isPasswordFocused = true"
          id="sign-up-password"
          :label="$t('i18n._global.enter_password')"
          :hasError="showPasswordError.border"
          v-bind="passwordAttrs"
        />
      </div>
      <IndicatorPasswordStrength :password-value="password" />
      <TooltipPasswordRequirements
        v-if="showPasswordError.tooltipErrors"
        :rules="showPasswordError.tooltipErrors"
      />
      <div>
        <FormPasswordInput
          v-model="confirmPassword"
          id="sign-up-confirm-password"
          :label="$t('i18n._global.repeat_password')"
          v-bind="confirmPasswordAttrs"
        >
          <template #icons>
            <span>
              <Icon
                :name="errors.confirmPassword ? IconMap.X_LG : IconMap.CHECK"
                size="1.2em"
                :color="errors.confirmPassword ? '#BA3D3B' : '#3BA55C'"
                aria-hidden="false"
                aria-labelledby="sign-up-confirm-password-match"
              />
              <title id="sign-up-confirm-password-match" class="sr-only">
                {{
                  errors.confirmPassword
                    ? $t("i18n.pages.auth._global.passwords_do_not_match")
                    : $t("i18n.pages.auth._global.passwords_match")
                }}
              </title>
            </span>
          </template>
        </FormPasswordInput>
      </div>
      <div class="flex flex-col space-y-3">
        <FriendlyCaptcha />
        <div class="flex flex-row items-center">
          <FormCheckbox v-model="hasReadTerms" value="yes" />
          <p class="flex flex-wrap pl-2">
            {{ $t("i18n.pages._global.terms_of_service_pt_1") }}
            <NuxtLink
              :to="localePath('/legal/privacy-policy')"
              target="_blank"
              class="link-text ml-1 sm:block"
            >
              {{ $t("i18n.pages._global.terms_of_service_pt_2") }}
            </NuxtLink>
          </p>
        </div>
        <BtnAction
          class="flex max-h-[48px] w-[116px] items-center justify-center truncate md:max-h-[40px] md:w-[96px]"
          label="i18n._global.sign_up"
          :cta="true"
          fontSize="lg"
          ariaLabel="i18n._global.sign_up_aria_label"
        />
      </div>
      <div class="flex justify-center pt-4 md:pt-6 lg:pt-8">
        <h6>{{ $t("i18n.pages.auth.sign_up.have_account") }}</h6>
        <NuxtLink
          :to="localePath('/auth/sign-in')"
          class="link-text ml-2 font-extrabold"
        >
          {{ $t("i18n._global.sign_in") }}
        </NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { object, string } from "zod";

import type { PasswordRule, PasswordRuleName } from "~/types/password-rules";

import { createRulesList, passwordField } from "~/forms/fields/passwordField";
import { IconMap } from "~/types/icon-map";

const localePath = useLocalePath();

const { defineField, errorBag, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      userName: string().nonempty().default(""),
      password: passwordField,
      confirmPassword: string().default(""),
    }).refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
    })
  ),
});

const [userName, userNameAttrs] = defineField("userName");
const [password, passwordAttrs] = defineField("password");
const [confirmPassword, confirmPasswordAttrs] = defineField("confirmPassword");

const hasReadTerms = ref(false);
const isPasswordFocused = ref(false);

const showPasswordError = computed<{
  border: boolean;
  tooltipErrors: PasswordRule[];
}>(() => {
  const error = password.value!.length > 0 && !!errorBag.value.password;

  return {
    border: !isPasswordFocused.value && error,
    tooltipErrors:
      isPasswordFocused.value && error
        ? createRulesList(errorBag.value.password as PasswordRuleName[])
        : [],
  };
});

const signUp = () => {};
</script>
