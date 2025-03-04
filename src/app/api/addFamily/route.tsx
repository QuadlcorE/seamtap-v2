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
        const { name } = body;

        // Validate inputs
        if (!name) {
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }

        // Create family in database
        const family = await prisma.family.create({
            data: {
                family_name: name,
                user_id: user.id,
            },
        });

        // Return success response
        return NextResponse.json({
            success: true,
            family,
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating family:", error);
        return NextResponse.json(
            { error: "Failed to create family" },
            { status: 500 }
        );
    }
}