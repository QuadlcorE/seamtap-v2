import CustomerDetailsPage from "@/app/components/ui/customers/customersdetails";
import { getCustomerByID } from "@/lib/serverlogic";
import { notFound } from "next/navigation";

// Define the props type explicitly
interface PageProps {
  params: Promise<{ id: string }>; // Wrap params in a Promise
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params; // Await the Promise
  const customerId = parseInt(resolvedParams.id);

  // Validate ID and proceed with your logic
  if (isNaN(customerId)) {
    return notFound();
  }

  const customer = await getCustomerByID(customerId);
  if (!customer) {
    return notFound();
  }

  // Format the measurements to match the component's expected structure
  const formattedMeasurements = customer.measurements
    .map(
      (measurement: {
        measurement_id: number;
        chest: number | null;
        notes?: string | null;
        created_at: Date;
        waist: number | null;
        hips: number | null;
        inseam: number | null;
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
            id: measurement.measurement_id + 1000,
            type: "Waist",
            value: measurement.waist ? measurement.waist.toString() : "-",
            notes: measurement.notes || "-",
            createdAt: measurement.created_at.toISOString().split("T")[0],
          },
          {
            id: measurement.measurement_id + 2000,
            type: "Hips",
            value: measurement.hips ? measurement.hips.toString() : "-",
            notes: measurement.notes || "-",
            createdAt: measurement.created_at.toISOString().split("T")[0],
          },
          {
            id: measurement.measurement_id + 3000,
            type: "Inseam",
            value: measurement.inseam ? measurement.inseam.toString() : "-",
            notes: measurement.notes || "-",
            createdAt: measurement.created_at.toISOString().split("T")[0],
          },
        ].filter((item) => item.value !== "-");
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
    family: customer.family_id ? "Family" : "Individual",
    accountType: customer.family_id ? "Family" : "Individual",
    createdAt: customer.created_at.toISOString().split("T")[0],
    measurements: formattedFirstMeasurement,
  };

  return <CustomerDetailsPage customer={formattedCustomer} />;
}
