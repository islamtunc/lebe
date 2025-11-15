// Bismillahirrahmanirrahim 
// Elhamdulillahi Rabbil Alamin
// Essalatu vesselamu ala Resulina Muhammedin
// Allah U Ekber, Allah U Ekber, Allah U Ekber, La ilahe illallah
// Subhanallah, Elhamdulillah, Allahu Ekber
// La ilahe illallah, Muhammedur Resulullah
// La havle vela kuvvete illa billah
// Astagfirullah al azim
// La ilahe illallah, wahdahu la sharika lahu, lahul mulku wa lahul hamdu yuhyi wa yumit wa huwa ala kulli shay'in qadir
// Seyyidena ve nebiyyena Muhammedun abduhu ve rasuluhu
// Subhanallahi wa bihamdihi, subhanallahil azim
// ELHAMDULILLAHI RABBIL 'ALAMIN
// Allah U Ekber ve lillahi'l-hamd



import { validateRequest } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Bookmark, Home } from "lucide-react";
import Link from "next/link";
import NotificationsButton from "./NotificationsButton";

interface MenuBarProps {
  className?: string;
}

export default async function MenuBar({ className }: MenuBarProps) {
  const { user } = await validateRequest();

  if (!user) return null;

  const [unreadNotificationsCount, unreadMessagesCount] = await Promise.all([
    prisma.notification.count({
      where: {
        recipientId: user.id,
        read: false,
      },
    }),
  ]);

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home />
          <span className="hidden lg:inline">Mâl</span>
        </Link>
      </Button>
    
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bêrika We"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bêrika We</span>
        </Link>
      </Button>
    </div>
  );
}
