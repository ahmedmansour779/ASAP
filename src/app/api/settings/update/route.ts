import { settingsEnPath } from "@/shared/constants";
import { unlink } from "@mongez/fs";

export function POST() {
  unlink(settingsEnPath);

  return Response.json(
    { message: "Settings file removed successfully" },
    { status: 200 }
  );
}
