// Bismillahirahmanirahim 
// ElHAMDULİLLAHİRABBULALEMİN
// Es-selatu ve Es-selamu ala Resulina Muhammedin
// Allah u Ekber, Allah u Ekber, Allah u Ekber, 
// La ilahe illallah
// SubhanAllah, Elhamdulillah, Allahu Ekber
// Hasbunallahu ve ni'mel vekil
// La havle ve la kuvvete illa billahil aliyyil azim

// =======================================
//  Global Types for User / Post / Comment
//  With RBAC (ADMIN / USER)
// =======================================
// =======================================
//  types.ts — Prisma Enum ve RBAC
// =======================================
import { Prisma } from "@prisma/client";

// ================================
// ROLE ENUM
// ================================
export type Role = "USER" | "ADMIN" | "MODERATOR";

// ================================
// USER SELECT
// ================================
export function getUserDataSelect(loggedInUserId: string) {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

// UserData + role enum tipi
export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}> & { role: Role };

// ================================
// POST INCLUDE
// ================================
export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: { select: getUserDataSelect(loggedInUserId) },
    attachments: true,
    likes: {
      where: { userId: loggedInUserId },
      select: { userId: true },
    },
    bookmarks: {
      where: { userId: loggedInUserId },
      select: { userId: true },
    },
    _count: {
      select: { likes: true, comments: true },
    },
  } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

// ================================
// COMMENT INCLUDE
// ================================
export function getCommentDataInclude(loggedInUserId: string) {
  return {
    user: { select: getUserDataSelect(loggedInUserId) },
  } satisfies Prisma.CommentInclude;
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}

// ================================
// NOTIFICATION INCLUDE
// ================================
export const notificationsInclude = {
  issuer: { select: { username: true, displayName: true, avatarUrl: true } },
  post: { select: { content: true } },
} satisfies Prisma.NotificationInclude;

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationsInclude;
}>;

export interface NotificationsPage {
  notifications: NotificationData[];
  nextCursor: string | null;
}

// ================================
// INFO TYPES
// ================================
export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export interface NotificationCountInfo {
  unreadCount: number;
}

export interface MessageCountInfo {
  unreadCount: number;
}

// ================================
// RBAC HELPER
// ================================
export function isAdmin(user: UserData) {
  return user.role === "ADMIN";
}

export function isModerator(user: UserData) {
  return user.role === "MODERATOR";
}


// Subhanallah, Elhamdulillah, Allahu Ekber, La ilahe illallah
// Estağfirulllah El-Azim
// Elhmadulillah Elhamdulillah Elhamdulillah
// Elhamdulillahirabbulalemin