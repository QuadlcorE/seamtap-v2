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

export async function getCustomerByID(customer_id: number) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return null;
  }
  const customers = await prisma.customer.findUnique({
    where: { user_id: user.id, customer_id: customer_id },
    include: { measurements: true },
  });
  return customers;
}

export async function getCustomersByFamilyID(family_id: number) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return null;
  }
  const customers = await prisma.customer.findMany({
    where: { user_id: user.id, family_id: family_id },
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

export async function getFamilyNameByID(family_id: number) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return null;
  }
  const family = await prisma.family.findUnique({
    where: {
      family_id: family_id,
    },
    select: {
      family_name: true, // Only select the name
    },
  });
  return family;
}

export async function deleteCustomer(customer_id: number) {
  const user = await stackServerApp.getUser();
  if (!user) {
    return null;
  }
  const measurements = await prisma.measurement.deleteMany({
    where: { customer_id: customer_id },
  });
  const customer = await prisma.customer.delete({
    where: { customer_id: customer_id },
  });

  return [measurements, customer];
}
