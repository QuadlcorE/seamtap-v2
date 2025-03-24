import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { SignIn, StackHandler } from "@stackframe/stack";
import Image from "next/image";
import { stackServerApp } from "@/stack";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div>
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <StackHandler
                  app={stackServerApp}
                  routeProps={props}
                  fullPage={true}
                  componentProps={{
                    SignIn: {
                      /* SignIn component props */
                    },
                    SignUp: {
                      /* SignUp component props */
                    },
                    // ... other component props
                  }}
                />
                <SignIn
                  fullPage={false}
                  automaticRedirect={true}
                  firstTab="password"
                  extraInfo={
                    <>
                      When signing in, you agree to our{" "}
                      <a href="/terms">Terms</a>
                    </>
                  }
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
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
