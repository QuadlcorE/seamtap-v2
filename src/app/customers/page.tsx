"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Search, Loader2 } from "lucide-react";
import AddCustomer from "../components/ui/addcustomer";
import { Customer, Family } from "@prisma/client";
import {
  getCustomers,
  getCustomersByFamilyID,
  getFamilies,
} from "@/lib/serverlogic";
import { toast } from "sonner";

export default function CustomersPage() {
  // States to manage customers
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [families, setFamilies] = useState<Family[]>([]);
  const [loadingFamilies, setLoadingFamilies] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] =
    useState<Customer[]>(customers);

  // Fetch customers when the component mounts
  useEffect(() => {
    const loadtable = async () => {
      setLoading(true);
      setLoadingFamilies(true);
      try {
        const familiesData = await getFamilies();
        const customerData = await getCustomers();

        if (!familiesData || !customerData) {
          toast.error("Failed to load data");
          throw new Error("Unable to fetch Data");
        }

        setFamilies(familiesData);
        setCustomers(customerData);
        setFilteredCustomers(customerData);
      } catch (error) {
        console.error("Error loading families:", error);
        toast.error("Failed to load families");
      } finally {
        setLoadingFamilies(false);
        setLoading(false);
      }
    };
    loadtable();
  }, []);

  // Fetch Customers by Family ID
  const fetchCustomersByFamily = async (family_id: string) => {
    setLoading(true);
    try {
      const customersData = await getCustomersByFamilyID(Number(family_id));

      if (!customersData) {
        toast.error("Failed to load customer data");
        throw new Error("Failed to fetch customer Data");
      }

      setCustomers(customersData);
    } catch (error) {
      console.error("Error loading Customer Data:", error);
      toast.error("Failed to load Customers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all customers
  const fetchAllCustomers = async () => {
    setLoading(true);
    try {
      const customerData = await getCustomers();
      if (!customerData) {
        toast.error("Failed to load customer data");
        throw new Error("Failed to fetch customer Data");
      }
      setCustomers(customerData);
    } catch (error) {
      console.error("Error loading Customer Data:", error);
      toast.error("Failed to load Customers");
    } finally {
      setLoading(false);
    }
  };

  // Handle Family selection
  const handleFamilyChange = (value: string) => {
    const category = value;
    setSelectedFamily(category);

    // Only fetch if a category is selected
    if (category) {
      if (category == "all") {
        fetchAllCustomers();
        return;
      }
      fetchCustomersByFamily(category);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Filter customers based on search term
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCustomers(filtered);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
        <p className="text-gray-500 mt-1">
          Manage all your customers here. Add new customers, view their details,
          and organize them into families.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <AddCustomer />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search params */}
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by name, email, or family..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="flex gap-2">
              <Select value={selectedFamily} onValueChange={handleFamilyChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Family" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                  {loadingFamilies ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <></>
                  )}
                  {families.map((family) => (
                    <SelectItem
                      key={family.family_id}
                      value={family.family_id.toString()}
                    >
                      {family.family_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Date Created" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="m-auto">
              <Loader2 className="animate-spin l" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Family</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.customer_id}>
                    <TableCell className="font-medium">
                      {customer.name}
                    </TableCell>
                    <TableCell>
                      {customer.family_id
                        ? families.find(
                            (family) => family.family_id === customer.family_id
                          )?.family_name
                        : "none"}
                    </TableCell>
                    <TableCell>
                      {customer.created_at
                        .toISOString()
                        .replace("T", " ")
                        .slice(0, 19)}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Delete Customer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
