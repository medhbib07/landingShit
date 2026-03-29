/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/forgetPassword.service.ts

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import i18n from "@/i18n";
import { identityFetch } from "./apiClient";

interface ForgotPasswordRequest {
  email: string;
}

interface ForgotPasswordResponse {
  message: string;
}

export const useForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) =>
      identityFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: ForgotPasswordResponse) => {
      toast.success(t("auth.forgot.success") || data.message);
      const lang = i18n.language || "en";
      navigate(`/${lang}/verification-code`);
    },
    onError: (err: Error) => {
      toast.error(
        err.message || t("auth.forgot.error") || "Failed to send reset code",
      );
    },
    retry: false,
  });
};

interface VerifyResetCodeRequest {
  email: string;
  code: string;
}

interface VerifyResetCodeResponse {
  message: string;
  valid: boolean;
}

export const useVerifyResetCode = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: VerifyResetCodeRequest) =>
      identityFetch("/auth/verify-reset-code", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: VerifyResetCodeResponse, variables) => {
      localStorage.setItem("reset_code", variables.code);
      toast.success(t("auth.verification.success") || data.message);
      const lang = i18n.language || "en";
      navigate(`/${lang}/reset-password`);
    },
    onError: (err: Error) => {
      toast.error(
        err.message ||
          t("auth.verification.error") ||
          "Invalid or expired code.",
      );
      console.error("[useVerifyResetCode] Error:", err);
    },
    retry: false,
  });
};

interface ResetPasswordRequest {
  email: string;
  code: string;
  password: string;
}

interface ResetPasswordResponse {
  message: string;
}

export const useResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) =>
      identityFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    onSuccess: (data: ResetPasswordResponse) => {
      toast.success(t("auth.reset.success") || data.message);
      localStorage.removeItem("reset_email");
      localStorage.removeItem("reset_code");
      const lang = i18n.language || "en";
      navigate(`/${lang}/login`);
    },
    onError: (err: Error) => {
      toast.error(
        err.message || t("auth.reset.error") || "Failed to reset password",
      );
    },
    retry: false,
  });
};
