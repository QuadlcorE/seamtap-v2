import React from 'react'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'

type Props = {}

export default function QuickActions({}: Props) {
  return (
    <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you can perform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" size="sm">
                Add New Customer
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                size="sm"
              >
                Add New Family
              </Button>
              <Button
                className="w-full justify-start"
                variant="secondary"
                size="sm"
              >
                Record Measurement
              </Button>
            </CardContent>
          </Card>
  )
}