-- AlterTable
ALTER TABLE "ImpactLog" ADD COLUMN     "communityRequestId" INTEGER,
ADD COLUMN     "teamEventId" INTEGER,
ADD COLUMN     "volunteerEventId" INTEGER;

-- AddForeignKey
ALTER TABLE "ImpactLog" ADD CONSTRAINT "ImpactLog_volunteerEventId_fkey" FOREIGN KEY ("volunteerEventId") REFERENCES "VolunteerEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImpactLog" ADD CONSTRAINT "ImpactLog_communityRequestId_fkey" FOREIGN KEY ("communityRequestId") REFERENCES "CommunityRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImpactLog" ADD CONSTRAINT "ImpactLog_teamEventId_fkey" FOREIGN KEY ("teamEventId") REFERENCES "VolunteerEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
