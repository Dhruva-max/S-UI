"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { getStarCount } from "~/app/_actions/github";
import { PrivateReposDialog } from "./private-repos-dialog";
import { ApiKeyDialog } from "./api-key-dialog";

export function Header() {
  const [isPrivateReposDialogOpen, setIsPrivateReposDialogOpen] =
    useState(false);
  const [isApiKeyDialogOpen, setIsApiKeyDialogOpen] = useState(false);
  const [starCount, setStarCount] = useState<number | null>(null);

  useEffect(() => {
    void getStarCount().then(setStarCount);
  }, []);

  const formatStarCount = (count: number | null) => {
    if (!count) return "10.0k";
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const handlePrivateReposSubmit = (pat: string) => {
    // Store the PAT in localStorage
    localStorage.setItem("github_pat", pat);
    setIsPrivateReposDialogOpen(false);
  };

  const handleApiKeySubmit = (apiKey: string) => {
    localStorage.setItem("openai_key", apiKey);
    setIsApiKeyDialogOpen(false);
  };

  return (
    <header className="border-b-[3px] border-black">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🇮🇳</span>
          <span className="text-lg font-bold sm:text-xl">
            <span className="text-black transition-colors duration-200 hover:text-gray-600">
              Intern
            </span>
            <span className="text-purple-600 transition-colors duration-200 hover:text-purple-500">
              Setu
            </span>
          </span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          {/* Language Toggle */}
          <div className="hidden items-center gap-1 text-xs font-medium text-black sm:flex">
            <span className="cursor-pointer hover:text-purple-600">EN</span>
            <span className="text-gray-400">|</span>
            <span className="cursor-pointer hover:text-purple-600">हिंदी</span>
            <span className="text-gray-400">|</span>
            <span className="cursor-pointer hover:text-purple-600">தமிழ்</span>
          </div>
          
          <Link
            href="/intern-setu/explore"
            className="text-sm font-medium text-black transition-transform hover:translate-y-[-2px] hover:text-purple-600"
          >
            <span className="sm:hidden">Students</span>
            <span className="hidden sm:inline">For Students</span>
          </Link>
          <Link
            href="/intern-setu/organizations"
            className="text-sm font-medium text-black transition-transform hover:translate-y-[-2px] hover:text-purple-600"
          >
            <span className="sm:hidden">Orgs</span>
            <span className="hidden sm:inline">For Organizations</span>
          </Link>
          <Link
            href="/intern-setu/success-stories"
            className="text-sm font-medium text-black transition-transform hover:translate-y-[-2px] hover:text-purple-600"
          >
            <span className="sm:hidden">Stories</span>
            <span className="hidden sm:inline">Success Stories</span>
          </Link>
          <Link
            href="/intern-setu/help"
            className="flex items-center gap-1 text-sm font-medium text-black transition-transform hover:translate-y-[-2px] hover:text-purple-600"
          >
            <span>Help</span>
          </Link>
          
          {/* Help Desk Info */}
          <div className="hidden items-center gap-1 text-xs font-medium text-black lg:flex">
            <span className="text-green-600">●</span>
            <span>1800-XXX-XXXX</span>
          </div>
        </nav>

        <PrivateReposDialog
          isOpen={isPrivateReposDialogOpen}
          onClose={() => setIsPrivateReposDialogOpen(false)}
          onSubmit={handlePrivateReposSubmit}
        />
        <ApiKeyDialog
          isOpen={isApiKeyDialogOpen}
          onClose={() => setIsApiKeyDialogOpen(false)}
          onSubmit={handleApiKeySubmit}
        />
      </div>
    </header>
  );
}
