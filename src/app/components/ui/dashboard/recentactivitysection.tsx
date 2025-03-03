import React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {ChevronRight} from 'lucide-react'

type Props = {recentActivity: {type: string, name: string, date: string}[]}

export default function RecentActivity({recentActivity}: Props) {
  return (
    <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest actions in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Badge
                        variant={
                          activity.type === "customer"
                            ? "default"
                            : activity.type === "family"
                            ? "secondary"
                            : "outline"
                        }
                        className="mr-2"
                      >
                        {activity.type === "customer"
                          ? "Customer"
                          : activity.type === "family"
                          ? "Family"
                          : "Measurement"}
                      </Badge>
                      <span>
                        {activity.type === "measurement"
                          ? `Updated ${activity.name}'s measurements`
                          : `Added ${activity.name}`}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.date}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-sm" size="sm">
                View All Activity
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
  )
}