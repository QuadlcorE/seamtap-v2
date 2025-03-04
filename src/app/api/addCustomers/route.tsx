import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack";

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { name, family_id } = body;

    // Validate inputs
    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Create customer in database
    const customer = await prisma.customer.create({
      data: {
        name,
        user_id: user.id,
        family_id: family_id ? parseInt(family_id) : null,
      },
    });

    // Return success response
    return NextResponse.json({ 
      success: true, 
      customer 
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}