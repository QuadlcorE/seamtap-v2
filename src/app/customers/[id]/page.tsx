import CustomerDetailsPage from "@/app/components/ui/customers/customersdetails";
import { getCustomerByID } from "@/lib/serverlogic";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const resolvedParams = await params;
  const customerId = parseInt(resolvedParams.id);

  // Validate that the ID is a number
  if (isNaN(customerId)) {
    return notFound();
  }

  // Fetch customer data using the provided function
  const customer = await getCustomerByID(customerId);

  // Check if customer exists
  if (!customer) {
    return notFound();
  }

  // Format the measurements to match the component's expected structure
  const formattedMeasurements = customer.measurements
    .map(
      (measurement: {
        measurement_id: number;
        chest: number | null; // Changed to allow null
        notes?: string | null; // Changed to allow null
        created_at: Date;
        waist: number | null; // Changed to allow null
        hips: number | null; // Changed to allow null
        inseam: number | null; // Changed to allow null
      }) => {
        return [
          {
            id: measurement.measurement_id,
            type: "Chest",
            value: measurement.chest ? measurement.chest.toString() : "-",
            notes: measurement.notes || "-",
            createdAt: measurement.created_at.toISOString().split("T")[0],
          },
          {
            id: measurement.measurement_id + 1000, // Using offset to create unique IDs
            type: "Waist",
            value: measurement.waist ? measurement.waist.toString() : "-",
            notes: measurement.notes || "-",
            createdAt: measurement.created_at.toISOString().split("T")[0],
          },
          {
            id: measurement.measurement_id + 2000, // Using offset to create unique IDs
            type: "Hips",
            value: measurement.hips ? measurement.hips.toString() : "-",
            notes: measurement.notes || "-",
            createdAt: measurement.created_at.toISOString().split("T")[0],
          },
          {
            id: measurement.measurement_id + 3000, // Using offset to create unique IDs
            type: "Inseam",
            value: measurement.inseam ? measurement.inseam.toString() : "-",
            notes: measurement.notes || "-",
            createdAt: measurement.created_at.toISOString().split("T")[0],
          },
        ].filter((item) => item.value !== "-"); // Filter out measurements that don't have values
      }
    )
    .flat();

  // If we need just the first measurement set as requested
  const firstMeasurement = formattedMeasurements[0];
  const formattedFirstMeasurement = firstMeasurement
    ? [
        {
          id: firstMeasurement.id,
          type: "Chest",
          value: firstMeasurement.value,
          notes: firstMeasurement.notes || "-",
          createdAt: firstMeasurement.createdAt,
        },
        {
          id: firstMeasurement.id + 1000,
          type: "Waist",
          value: firstMeasurement.value,
          notes: firstMeasurement.notes || "-",
          createdAt: firstMeasurement.createdAt,
        },
        {
          id: firstMeasurement.id + 2000,
          type: "Hips",
          value: firstMeasurement.value,
          notes: firstMeasurement.notes || "-",
          createdAt: firstMeasurement.createdAt,
        },
        {
          id: firstMeasurement.id + 3000,
          type: "Inseam",
          value: firstMeasurement.value,
          notes: firstMeasurement.notes || "-",
          createdAt: firstMeasurement.createdAt,
        },
      ].filter((item) => item.value !== "-")
    : [];

  // Format the customer data to match the component's expected structure
  const formattedCustomer = {
    id: customer.customer_id,
    name: customer.name,
    email: "", // Not in the schema but required by the component
    family: customer.family_id ? "Family" : "Individual", // Updated to use family_id for checking
    accountType: customer.family_id ? "Family" : "Individual", // Updated to use family_id for checking
    createdAt: customer.created_at.toISOString().split("T")[0],
    measurements: formattedFirstMeasurement, // Using only the first measurement as requested
  };

  return <CustomerDetailsPage customer={formattedCustomer} />;
}
