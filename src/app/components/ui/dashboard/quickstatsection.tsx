import React from 'react'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Users, Home, Gauge} from 'lucide-react'

type Props = {stats: {customers: number, families: number, measurements: number}}

export default function Quickstats({stats}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{stats.customers}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Families
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Home className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">{stats.families}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Measurements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Gauge className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">{stats.measurements}</span>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}