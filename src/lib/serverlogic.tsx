"use server";

import { stackServerApp } from "@/stack";
import prisma from "./prisma";
import { Family } from "@prisma/client";

// Get requests

export async function getCustomers() {
  const user = await stackServerApp.getUser();
  if (!user) {
    return null;
  }
  const customers = await prisma.customer.findMany({
    where: { user_id: user.id },
    include: { measurements: true },
  });
  return customers;
}

export async function getCustomersNoMeasurement() {
  const user = await stackServerApp.getUser();
  if (!user) {
    return null;
  }
  const customers = await prisma.customer.findMany({
    where: {
      user_id: user.id,
      measurements: { none: {} },
    },
  });
  return customers;
}

export async function getFamilies() {
  const user = await stackServerApp.getUser();
  if (!user) {
    return null;
  }
  const families = await prisma.family.findMany({
    where: { user_id: user.id },
    include: { customers: true },
  });
  return families as Family[];
}
