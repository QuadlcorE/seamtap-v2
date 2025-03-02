import { StackHandler } from "@stackframe/stack";
import { stackServerApp } from "../../../stack";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Handler(props: unknown) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div>
                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
                    {/* <StackHandler
                      app={stackServerApp}
                      routeProps={props}
                      fullPage={true}
                      componentProps={{
                        SignIn: {
                          
                        },
                        SignUp: {
                          
                        },
                        
                      }}
                    /> */}
                    <StackHandler
                      fullPage={false}
                      app={stackServerApp}
                      routeProps={props}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white relative hidden md:flex items-center justify-center w-full h-full">
                <Image
                  width={500}
                  height={500}
                  src="/landing.jpeg"
                  alt="landing image"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
