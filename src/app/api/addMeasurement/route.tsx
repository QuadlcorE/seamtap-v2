import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack";

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    const { customer_id, chest, waist, hips, inseam, notes } = body;
    console.log(customer_id)

    // Validate inputs
    if (!customer_id) {
      return NextResponse.json(
        { error: "Customer is required" },
        { status: 400 }
      );
    }

    // Create measurement in database
    const measurement = await prisma.measurement.create({
      data: {
        customer_id,
        chest,
        waist,
        hips,
        inseam,
        notes,
      },
    });

    // Return success response
    return NextResponse.json(
      {
        success: true,
        measurement,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating Measurement:", error);
    return NextResponse.json(
      { error: "Failed to create measurement." },
      { status: 500 }
    );
  }
}
