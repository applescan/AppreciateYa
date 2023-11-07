-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
