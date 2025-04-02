//import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginScreen() {
    return (
        <main className="h-dvh flex items-center justify-center">
            <div className="px-[60px] py-[60px] border rounded-2xl shadow">
                <div>
                    <h1>Sign in to Auro</h1>
                    <p className="mt-2">We are happy to see you again!</p>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                    <Button variant={"outline"}>Continue with Google</Button>
                    <Button variant={"outline"}>Continue with Github</Button>
                </div>

                <hr className="mt-5" />

                <div className="mt-5 flex flex-col gap-2">
                    <Input type="email" id="email" placeholder="Email" />
                    <Input type="email" id="email" placeholder="Password" />
                    <div className="flex justify-between text-sm">
                        <div>Remember me</div>
                        <span>Forgot password?</span>
                    </div>
                    <Button>Continue with Email</Button>
                </div>
            </div>
        </main>
    );
}
