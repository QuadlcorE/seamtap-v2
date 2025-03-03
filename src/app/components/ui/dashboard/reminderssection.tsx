import React from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Bell, Calendar, ChevronRight} from 'lucide-react'
import {Button} from '@/components/ui/button'

type Props = {reminders: {customer: string, lastUpdate: string}[]}

export default function Reminders({reminders}: Props) {
  return (
    <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Reminders</CardTitle>
              <Bell className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reminders.map((reminder, index) => (
                  <div key={index} className="flex flex-col space-y-1">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-red-500 mr-2" />
                      <span className="font-medium">{reminder.customer}</span>
                    </div>
                    <p className="text-sm text-gray-500 ml-6">
                      Last measurement: {reminder.lastUpdate} (outdated)
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-sm" size="sm">
                View All Reminders
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
  )
}