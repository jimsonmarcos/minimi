import { promises as fs } from "fs";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const file = await fs.readFile(
    process.cwd() + "/src/data/companies.json",
    "utf8"
  );

  const companies = JSON.parse(file);

  const data = [];
  for (let x = payload.first; x < payload.first + payload.rows; x++) {
    data.push(companies[x]);
  }

  return NextResponse.json(data);
}
